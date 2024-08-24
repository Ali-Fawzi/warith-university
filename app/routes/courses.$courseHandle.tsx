import {LoaderFunctionArgs, MetaFunction} from "@remix-run/node";
import {HeroSection} from "~/components/HeroSection";
import {useLoaderData} from "@remix-run/react";

export const meta: MetaFunction = () => {
    return [
        { title: "جامعة وارث الانبياء" },
        { name: "الوصف", content: "اهلا بكم في جامعة وارث الانبياء في كربلاء المقدسة" },
    ];
};
export async function loader(args: LoaderFunctionArgs) {
    const {courseHandle} = args.params;
    const course = await fetch(`${import.meta.env.VITE_API_ENDPOINT}/courses/${courseHandle}`);

    return {
        course: await course.json()
    };
}

export default function Courses() {
    const {course} = useLoaderData<typeof loader>()
    return (
        <>
            <section className='relative isolate overflow-hidden'>
                <HeroSection variant='complex' title={course.title} date={course.startDate} heading={'كورسات'} time={'يبدأ في'}/>
            </section>
            <section className='my-8 max-w-7xl mx-auto text-right'>
                <div className='flex flex-col-reverse items-center justify-between gap-16 xl:flex-row-reverse p-4 mx-8 xl:mx-28'>
                    <div className='flex flex-col items-end justify-start gap-8 max-w-xl mb-auto'>
                        <p className='text-2xl font-bold'>عن الدورة التدريبية</p>
                        <p>{course.description}</p>
                    </div>
                    <div className='flex flex-col items-end justify-center gap-3'>
                        <img
                            alt=''
                            loading='eager'
                            src={`${import.meta.env.VITE_API_ENDPOINT}/${course.cover}`}
                            className='object-cover overflow-hidden w-[400px] h-[320px]'
                        />
                        <div className='text-right'>
                            اسم الدورة: {course.title}
                        </div>
                        <div className='text-right'>
                            مدة الدورة: {course.duration}
                        </div>
                        <div className='text-right'>
                            شهادة في نهاية الدورة : {course.hasCertificate ? 'نعم' : 'لا'}
                        </div>
                        <div className='text-right'>
                            موقع الدورة: {course.place}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
