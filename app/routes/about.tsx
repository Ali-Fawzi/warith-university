import {MetaFunction} from "@remix-run/node";
import {SponsorSection} from "~/components/SponsorSection";
import {useLoaderData} from "@remix-run/react";
import {WarithElevateSection} from "~/components/WarithElevateSection";
import {InstructorsSection} from "~/components/InstructorsSection";
import {HeroSection} from "~/components/HeroSection";
import {AboutSection} from "~/components/AboutSection";
import {VisionSection} from "~/components/VisionSection";
export const meta: MetaFunction = () => {
    return [
        { title: "جامعة وارث الانبياء" },
        { name: "الوصف", content: "اهلا بكم في جامعة وارث الانبياء في كربلاء المقدسة" },
    ];
};
export const loader = async () => {
    const sponsors = await fetch(import.meta.env.VITE_API_ENDPOINT + "/sponsers");

    return {
        sponsors: await sponsors.json(),
    };
};

export default function About() {
    const {sponsors} = useLoaderData<typeof loader>()
    return (
        <>
            <section className='relative isolate overflow-hidden'>
                <HeroSection title={'من نحن'}/>
            </section>
            <section className='mt-8'>
                <AboutSection />
            </section>
            <section className='mt-8 bg-white'>
                <VisionSection />
            </section>
            <section className='mt-8'>
                <WarithElevateSection/>
            </section>
            <section className='mt-8'>
                <SponsorSection sponsors={sponsors}/>
            </section>
            <section className='my-8'>
                <InstructorsSection/>
            </section>
        </>
    );
}
