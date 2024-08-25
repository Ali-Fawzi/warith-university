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
    const {workshopsHandle} = args.params;
    const workshop = await fetch(`${import.meta.env.VITE_API_ENDPOINT}/courses/${workshopsHandle}`);

    return {
        workshop: await workshop.json()
    };
}

export default function Workshops() {
    const {workshop} = useLoaderData<typeof loader>()
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
                                {workshop.lectures.map((lecture, i) =>
                                    <li key={i}>{lecture}</li>
                                )}
                            </ul>
                        </div>
                    </div>
                    <div className='flex flex-col items-end justify-center gap-3'>
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
                    </div>
                </div>
            </section>
        </>
    );
}
