import {MetaFunction} from "@remix-run/node";
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
export const loader = async () => {
    const courses = await fetch(`${import.meta.env.VITE_API_ENDPOINT}/courses`);

    return {
        courses: await courses.json()
    };
};
export default function AllCourses() {
    const {courses} = useLoaderData<typeof loader>()
    return (
        <>
            <section className='relative isolate overflow-hidden'>
                <HeroSection title={'الدورات التدريبية'}/>
            </section>
            <section className='my-8 max-w-7xl mx-auto'>
                <Pagination itemsStyle='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 p-4' itemsPerPage={4}>
                    {courses.data.map((course: course) => course.type === 'Tadreab' && (
                        <CourseCard key={course.id} course={course}/>)
                    )}
                </Pagination>
            </section>
        </>
    );
}
