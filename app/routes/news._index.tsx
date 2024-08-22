import {MetaFunction} from "@remix-run/node";
import {HeroSection} from "~/components/HeroSection";

export const meta: MetaFunction = () => {
    return [
        { title: "جامعة وارث الانبياء" },
        { name: "الوصف", content: "اهلا بكم في جامعة وارث الانبياء في كربلاء المقدسة" },
    ];
};

export default function News() {
    return (
        <>
            <section className='relative isolate overflow-hidden'>
                <HeroSection title={'اخر الاخبار'}/>
            </section>
        </>
    );
}
