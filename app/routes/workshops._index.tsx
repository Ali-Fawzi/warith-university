import {json, MetaFunction} from "@remix-run/node";
import {HeroSection} from "~/components/HeroSection";
import {useLoaderData} from "@remix-run/react";
import Pagination from "~/components/ui/Pagination";
import {course} from "~/components/ui/CourseCard";
import {WorkshopCard} from "~/components/ui/WorkshopCard";

export const meta: MetaFunction = () => {
    return [
        { title: "جامعة وارث الانبياء" },
        { name: "الوصف", content: "اهلا بكم في جامعة وارث الانبياء في كربلاء المقدسة" },
    ];
};
export const loader = async ({ request }) => {
    const url = new URL(request.url);
    const skip = Number(url.searchParams.get('skip')) || 0;
    const take = Number(url.searchParams.get('take')) || 12;

    const response = await fetch(`${process.env.VITE_API_ENDPOINT}/courses?skip=${skip}&take=${take}`);
    const workshops = await response.json();

    return json({ workshops, skip, take });
};
export default function AllWorkshops() {
    const { workshops, skip, take } = useLoaderData<typeof loader>();
    return (
        <>
            <section className='relative isolate overflow-hidden'>
                <HeroSection title={'الورش التدريبية'}/>
            </section>
            <section className='my-8 max-w-7xl mx-auto'>
                <Pagination
                    itemsStyle='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 p-4'
                    itemsPerPage={take}
                    currentPage={Math.floor(skip / take) + 1}
                    totalItems={workshops.total}
                >
                    {workshops.data.map((course: course) => course.type === 'Warsha' && (
                        <WorkshopCard key={course.id} workshop={course}/>)
                    )}
                </Pagination>
            </section>
        </>
    );
}
