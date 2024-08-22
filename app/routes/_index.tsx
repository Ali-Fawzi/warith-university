import {MetaFunction} from "@remix-run/node";
import {HeroSlider} from "~/components/HeroSlider";
import {SponserSection} from "~/components/SponserSection";
import {useLoaderData} from "@remix-run/react";
import {WarithElevateSection} from "~/components/WarithElevateSection";
import {InstructorsSection} from "~/components/InstructorsSection";

export const meta: MetaFunction = () => {
  return [
    { title: "جامعة وارث الانبياء" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};
export const loader = async () => {
    const sponsors = await fetch(import.meta.env.VITE_API_ENDPOINT + "/sponsers");
    const slides = await fetch(import.meta.env.VITE_API_ENDPOINT + "/slides");
    const posts = await fetch(import.meta.env.VITE_API_ENDPOINT + "/posts");

    return {
        sponsors: await sponsors.json(),
        slides: await slides.json(),
        posts: await posts.json()
    };
};

export default function Index() {
    const {sponsors, slides, posts} = useLoaderData<typeof loader>()
    console.log(posts)
    return (
        <>
            <section className='relative isolate overflow-hidden'>
                <HeroSlider slides={slides} />
            </section>
            <section className='relative -mt-10'>
                <SponserSection sponsors={sponsors} />
            </section>
            <section className='p-4 text-center'>
                الدورات التدريبية
            </section>
            <section>
                <WarithElevateSection />
            </section>
            <section className='p-4 text-center'>
                الورش التدريبية
            </section>
            <section>
                <InstructorsSection />
            </section>
            <section>

            </section>
        </>
    );
}
