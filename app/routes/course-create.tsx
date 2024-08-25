import {ActionFunction, MetaFunction, redirect} from "@remix-run/node";
import {HeroSection} from "~/components/HeroSection";
import {Form, useActionData, useNavigation} from "@remix-run/react";
import {useEffect, useRef} from "react";
import clsx from "clsx";
import {jwtCookie, roleCookie} from "~/lib/cookies";
export const meta: MetaFunction = () => {
    return [
        { title: "جامعة وارث الانبياء" },
        { name: "الوصف", content: "اهلا بكم في جامعة وارث الانبياء في كربلاء المقدسة" },
    ];
};
export const action: ActionFunction = async ({ request }) => {
    await new Promise((res) => setTimeout(res, 1000));
    const formData = await request.formData();
    const name = formData.get("name");
    const phone = formData.get("phone");
    const address = formData.get("address");
    const message = formData.get("message");
    const email = formData.get("email");

    const res = await fetch(`${import.meta.env.VITE_API_ENDPOINT}/contact`, {
        method: "post",
        body: JSON.stringify({ email, phone, address, message, name }),
        headers: {
            "Content-Type": "application/json; charset=utf-8",
        },
    });

    return res.json();

};
export async function loader({ request }) {
    const role = await roleCookie.parse(request.headers.get("Cookie"));

    if(role && role === 'Instructor' || role === 'Root') {
        return null;
    }
    return redirect('/');
}
export default function CourseCreate() {
    const actionData = useActionData();
    const navigation = useNavigation();

    const state: "idle" | "success" | "error" | "submitting" = navigation.state === "submitting"
        ? "submitting"
        : actionData?.name === 'Error'
            ? "error"
            : actionData?.status === 'Unread'
                ? "success"
                : "idle";

    const inputRef = useRef<HTMLInputElement>(null);
    const successRef = useRef<HTMLHeadingElement>(null);
    const mounted = useRef<boolean>(false);

    useEffect(() => {
        if (state === "error") {
            inputRef.current?.focus();
        }

        if (state === "idle" && mounted.current) {
            inputRef.current?.select();
        }

        if (state === "success") {
            successRef.current?.focus();
        }

        mounted.current = true;
    }, [state]);

    return (
        <div className='bg-white'>
            <section className='relative isolate overflow-hidden'>
                <HeroSection title={'انشاء دورة'}/>
            </section>
            <Form
                replace
                dir='RTL'
                method="POST"
                className={clsx('mt-8 max-w-6xl py-8 mx-auto flex flex-col items-center justify-center gap-16', state !== "success" ? 'block' : 'hidden')}
            >
                <div className='flex flex-col items-center justify-center space-y-2'>
                    <p className='text-xl'>استمارة انشاء دورة</p>
                    <p className='font-light max-w-xs text-center'>يرجى التاكد من صحة المعلومات قبل انشاء الدورة</p>
                </div>
                <div className='grid grid-cols-1 xl:grid-cols-2 gap-8 w-full p-4 xl:p-0 text-right'>
                    <div>
                        <label htmlFor="name"
                               className="block mb-2 text-sm font-medium">العنوان</label>
                        <input type="text"
                               id="name"
                               name="name"
                               className="block p-2.5 w-full text-sm bg-formInput rounded-md border-0"
                               placeholder="ادخل العنوان"
                               required
                               aria-describedby="error-message"
                               ref={inputRef}
                        />
                    </div>
                    <div>
                        <label htmlFor="email"
                               className="block mb-2 text-sm font-medium">المحتوى</label>
                        <input type="text"
                               id="email"
                               name="email"
                               className="block p-2.5 w-full text-sm bg-formInput rounded-md border-0"
                               placeholder="ادخل المحتوى" required/>
                    </div>
                    <div>
                        <label htmlFor="phone"
                               className="block mb-2 text-sm font-medium">عدد المحاضرات</label>
                        <input
                            type="number"
                            id="phone"
                            className="block p-2.5 w-full text-sm bg-formInput rounded-md border-0"
                            placeholder="عدد المحاضرات"
                            required
                            name="phone"
                        />
                    </div>
                    <div>
                        <label htmlFor="address"
                               className="block mb-2 text-sm font-medium">العنوان</label>
                        <input type="file" id="address"
                               name="address"
                               className="block p-2.5 w-full text-sm bg-formInput rounded-md border-0"
                               placeholder="العنوان" required/>
                    </div>
                    <div className='xl:col-span-2'>
                        <label htmlFor="message"
                               className="block mb-2 text-sm font-medium">الرسالة</label>
                        <textarea id="message"
                                  name="message"
                                  className="block p-2.5 w-full h-32 text-sm bg-formInput rounded-md border-0"
                                  placeholder="اكتب رسالتك..."></textarea>
                    </div>
                </div>
                <div className='flex flex-col items-center justify-center gap-4 relative'>
                    <div className='text-rose-500 text-center' id="error-message">
                        {state === "error" ? <div>
                            <p>تعذر انشاء الدورة</p>
                            <p>يرجى التاكد من صحة المعلومات و اعادة المحاولة</p>
                        </div> : ''}
                    </div>
                    <button
                        type='submit'
                        className='inline-block rounded-md font-semibold text-center py-3 px-6 bg-brand text-white hover:bg-brand/90 ease-in-out transform transition duration-500 select-none'>
                        {state === "submitting"
                            ? "يتم انشاء الدورة ..."
                            : "انشاء الدورة"}
                    </button>
                </div>
            </Form>
        </div>
    );
}
