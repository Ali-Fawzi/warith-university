import {json, MetaFunction} from "@remix-run/node";
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
export const loader = async ({ request }) => {
    const url = new URL(request.url);
    const skip = Number(url.searchParams.get('skip')) || 0;
    const take = Number(url.searchParams.get('take')) || 4;

    const response = await fetch(`${import.meta.env.VITE_API_ENDPOINT}/posts?skip=${skip}&take=${take}`);
    const posts = await response.json();

    return json({ posts, skip, take });
};
export default function AllNews() {
    const { posts, skip, take } = useLoaderData<typeof loader>();
    return (
        <>
            <section className='relative isolate overflow-hidden'>
                <HeroSection title={'آخر الأخبار'}/>
            </section>
            <section className='my-8'>
                <Pagination
                    itemsStyle="flex flex-col items-center justify-center gap-16"
                    itemsPerPage={take}
                    currentPage={Math.floor(skip / take) + 1}
                    totalItems={posts.total}
                >
                    {posts.data.map((item) => (
                        <div key={item.id} className="relative w-full">
                            <NewsCard itemNews={item} variant="page" />
                        </div>
                    ))}
                </Pagination>
            </section>
        </>
    );
}
