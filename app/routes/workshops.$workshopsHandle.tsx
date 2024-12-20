import {ActionFunction, LoaderFunctionArgs, MetaFunction} from "@remix-run/node";
import {HeroSection} from "~/components/HeroSection";
import {Form, Link, useActionData, useLoaderData, useNavigation} from "@remix-run/react";
import {jwtCookie, roleCookie} from "~/lib/cookies";
import clsx from "clsx";
import {refreshToken} from "~/lib/utils";

export const meta: MetaFunction = () => {
    return [
        { title: "جامعة وارث الانبياء" },
        { name: "الوصف", content: "اهلا بكم في جامعة وارث الانبياء في كربلاء المقدسة" },
    ];
};
export const action: ActionFunction = async (args: LoaderFunctionArgs) => {
    await new Promise((res) => setTimeout(res, 1000));
    const {workshopsHandle} = args.params;
    const token = await jwtCookie.parse(args.request.headers.get("Cookie"));

    const res = await fetch(`${import.meta.env.VITE_API_ENDPOINT}/enrollments`, {
        method: "post",
        body: JSON.stringify({ courseId:workshopsHandle }),
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            Authorization: `Bearer ${token}`,
        },
    });
    if (res.status === 401) {
        const refreshResult = await refreshToken(args.request);
        const newToken = await jwtCookie.parse(refreshResult.headers["Set-Cookie"]);

        const retryResponse = await fetch(`${import.meta.env.VITE_API_ENDPOINT}/enrollments`, {
            method: "post",
            body: JSON.stringify({ courseId:workshopsHandle }),
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                Authorization: `Bearer ${newToken}`,
            },
        });
        if (!retryResponse.ok) {
            return 'Error';
        }
    }

    return res.json();

};
export async function loader(args: LoaderFunctionArgs) {
    const {workshopsHandle} = args.params;
    const token = await jwtCookie.parse(args.request.headers.get("Cookie"));
    const role = await roleCookie.parse(args.request.headers.get("Cookie"));
    const workshop = await fetch(`${import.meta.env.VITE_API_ENDPOINT}/courses/${workshopsHandle}`);
    const enrollments = await fetch(`${import.meta.env.VITE_API_ENDPOINT}/enrollments/check-enrollment/?courseId=${workshopsHandle}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    if (enrollments.status === 401 && role === 'Student') {
        const refreshResult = await refreshToken(args.request);
        const newToken = await jwtCookie.parse(refreshResult.headers["Set-Cookie"]);

        const retryResponse = await fetch(`${import.meta.env.VITE_API_ENDPOINT}/enrollments/check-enrollment/?courseId=${workshopsHandle}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${newToken}`,
            },
        });
        if (!retryResponse.ok) {
            return 'Error';
        }
        return {
            workshop: await workshop.json(),
            enrollments: await retryResponse.json(),
            role
        };
    }
    return {
        workshop: await workshop.json(),
        enrollments: await enrollments.json(),
        role
    };
}

export default function Workshops() {
    const {workshop, enrollments, role} = useLoaderData<typeof loader>()
    const isEnrolled = enrollments.length > 0
    const actionData = useActionData();
    const navigation = useNavigation();

    const state: "idle" | "success" | "error" | "submitting" = navigation.state === "submitting"
        ? "submitting"
        : actionData?.name === 'Error'
            ? "error"
            : actionData?.status === 'Unread'
                ? "success"
                : "idle";
    return (
        <>
            <section className='relative isolate overflow-hidden'>
                <HeroSection variant='complex' title={workshop.title} date={workshop.startDate} heading={'ورشات'} time={'يبدأ في'}/>
            </section>
            <section className='my-8 max-w-7xl mx-auto text-right'>
                <div className='flex flex-col-reverse items-center justify-between gap-16 xl:flex-row-reverse p-4 mx-8 xl:mx-28'>
                    <div className='flex flex-col items-end justify-start gap-8 max-w-xl mb-auto'>
                        <p className='text-2xl font-bold'>عن الورشة التدريبية</p>
                        <p>{workshop.description}</p>
                        <div className='flex flex-col items-end justify-start max-w-2xl'>
                            <p className='text-lg font-bold'>ماذا ستتعلم في هذه الورشة؟</p>
                            <ul dir='rtl' className='font-light text-right list-disc mr-4'>
                                {workshop.lectures.map((lecture:string, i: number) =>
                                    <li key={i}>{lecture}</li>
                                )}
                            </ul>
                        </div>
                    </div>
                    <Form method='POST' replace className='flex flex-col items-end justify-center gap-3'>
                        <div className='text-rose-500 text-center mx-auto' id="error-message">
                            {state === "error" ? <div>
                                <p>تعذر التسجيل</p>
                                <p>يرجى اعادة المحاولة لاحقا</p>
                            </div> : ''}
                        </div>
                        {role === null && (
                            <Link to={'/sign-in'} className='w-full'>
                                <button
                                    className='inline-block rounded-sm font-semibold text-center py-3 px-6 ease-in-out transform transition duration-500 select-none w-full bg-brand text-white hover:bg-brand/90'>
                                    قم بتسجيل الدخول
                                </button>
                            </Link>
                        )}
                        {role === 'Student' && (
                            <button
                                type='submit'
                                disabled={isEnrolled}
                                className={clsx('inline-block rounded-sm font-semibold text-center py-3 px-6 ease-in-out transform transition duration-500 select-none w-full', isEnrolled ? 'bg-white text-black' : 'bg-brand text-white hover:bg-brand/90')}>
                                {isEnrolled ? 'تم التسجيل' :
                                    state === "submitting" ? 'يتم التسجيل...':'سجل الان' }
                            </button>
                        )}
                        <img
                            alt=''
                            loading='eager'
                            src={`${import.meta.env.VITE_API_ENDPOINT}/${workshop.cover}`}
                            className='object-cover overflow-hidden w-[400px] h-[320px]'
                        />
                        <div className='text-right'>
                            اسم الورشة: {workshop.title}
                        </div>
                        <div className='text-right'>
                            مدة الورشة: {workshop.duration}
                        </div>
                        <div className='text-right'>
                            شهادة في نهاية الورشة : {workshop.hasCertificate ? 'نعم' : 'لا'}
                        </div>
                        <div className='text-right'>
                            موقع الورشة: {workshop.place}
                        </div>
                    </Form>
                </div>
            </section>
        </>
    );
}
