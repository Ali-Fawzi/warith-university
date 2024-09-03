import {json, MetaFunction} from "@remix-run/node";
import {HeroSection} from "~/components/HeroSection";
import {useLoaderData} from "@remix-run/react";
import Pagination from "~/components/ui/Pagination";
import {course, CourseCard} from "~/components/ui/CourseCard";

export const meta: MetaFunction = () => {
    return [
        { title: "جامعة وارث الانبياء" },
        { name: "الوصف", content: "اهلا بكم في جامعة وارث الانبياء في كربلاء المقدسة" },
    ];
};
export const loader = async ({ request }) => {
    const url = new URL(request.url);
    const skip = Number(url.searchParams.get('skip')) || 0;
    const take = Number(url.searchParams.get('take')) || 9;

    const response = await fetch(`${process.env.VITE_API_ENDPOINT}/courses?type=Tadreab&skip=${skip}&take=${take}`);
    const courses = await response.json();

    return json({ courses, skip, take });
};
export default function AllCourses() {
    const { courses, skip, take } = useLoaderData<typeof loader>();
    return (
        <>
            <section className='relative isolate overflow-hidden'>
                <HeroSection title={'الدورات التدريبية'}/>
            </section>
            <section className='my-8 max-w-7xl mx-auto'>
                <Pagination
                    itemsStyle='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 p-4'
                    itemsPerPage={take}
                    currentPage={Math.floor(skip / take) + 1}
                    totalItems={courses.total}
                >
                    {courses.data.map((course: course) => (
                        <CourseCard key={course.id} course={course}/>)
                    )}
                </Pagination>
            </section>
        </>
    );
}
