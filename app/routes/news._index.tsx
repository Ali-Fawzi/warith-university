import {MetaFunction} from "@remix-run/node";
import {HeroSection} from "~/components/HeroSection";
import {useLoaderData} from "@remix-run/react";
import {itemNews, NewsCard} from "~/components/ui/NewsCard";
import Pagination from "~/components/ui/Pagination";

export const meta: MetaFunction = () => {
    return [
        { title: "جامعة وارث الانبياء" },
        { name: "الوصف", content: "اهلا بكم في جامعة وارث الانبياء في كربلاء المقدسة" },
    ];
};
export const loader = async () => {
    const posts = await fetch(`${import.meta.env.VITE_API_ENDPOINT}/posts`);

    return {
        posts: await posts.json()
    };
};
export default function AllNews() {
    const {posts: news} = useLoaderData<typeof loader>()
    return (
        <>
            <section className='relative isolate overflow-hidden'>
                <HeroSection title={'آخر الأخبار'}/>
            </section>
            <section className='my-8'>
                <Pagination itemsStyle='flex flex-col items-center justify-center gap-16' itemsPerPage={4}>
                    {news.data.map((item: itemNews) =>
                        <div key={item.id} className='relative w-full'>
                            <NewsCard itemNews={item} variant='page'/>
                        </div>
                    )}
                </Pagination>
            </section>
        </>
    );
}
