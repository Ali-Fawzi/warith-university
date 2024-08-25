import {MetaFunction} from "@remix-run/node";
import {HeroSlider} from "~/components/HeroSlider";
import {SponserSection} from "~/components/SponserSection";
import {useLoaderData} from "@remix-run/react";
import {WarithElevateSection} from "~/components/WarithElevateSection";
import {InstructorsSection} from "~/components/InstructorsSection";
import {NewsSection} from "~/components/NewsSection";
import {VideosSection} from "~/components/VideosSection";
import {CoursesSection} from "~/components/CoursesSection";
import {WorkshopsSection} from "~/components/WorkshopsSections";

export const meta: MetaFunction = () => {
  return [
    { title: "جامعة وارث الانبياء" },
    { name: "الوصف", content: "اهلا بكم في جامعة وارث الانبياء في كربلاء المقدسة" },
  ];
};
export const loader = async () => {
    const sponsors = await fetch(`${import.meta.env.VITE_API_ENDPOINT}/sponsers`);
    const courses = await fetch(`${import.meta.env.VITE_API_ENDPOINT}/courses`);
    const slides = await fetch(`${import.meta.env.VITE_API_ENDPOINT}/slides`);
    const posts = await fetch(`${import.meta.env.VITE_API_ENDPOINT}/posts?take=3`);

    return {
        sponsors: await sponsors.json(),
        courses: await courses.json(),
        slides: await slides.json(),
        posts: await posts.json()
    };
};

export default function Index() {
    const {sponsors, slides, posts: news, courses} = useLoaderData<typeof loader>()
    return (
        <>
            <section className='relative isolate overflow-hidden'>
                <HeroSlider slides={slides} />
            </section>
            <section className='relative -mt-10 mx-8 xl:mx-16'>
                <SponserSection sponsors={sponsors} />
            </section>
            <section className='mt-8'>
                <CoursesSection course={courses}/>
            </section>
            <section className='mt-8 bg-white'>
                <WarithElevateSection />
            </section>
            <section className='mt-8'>
                <WorkshopsSection workshops={courses}/>
            </section>
            <section className='mt-8 bg-white'>
                <InstructorsSection />
            </section>
            <section className='mt-8'>
                <NewsSection news={news} />
            </section>
            <section className='mt-8'>
                <VideosSection />
            </section>
        </>
    );
}
