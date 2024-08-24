import {LoaderFunctionArgs, MetaFunction} from "@remix-run/node";
import {HeroSection} from "~/components/HeroSection";
import {useLoaderData} from "@remix-run/react";
import {getDayName} from "~/lib/utils";

export const meta: MetaFunction = () => {
    return [
        { title: "جامعة وارث الانبياء" },
        { name: "الوصف", content: "اهلا بكم في جامعة وارث الانبياء في كربلاء المقدسة" },
    ];
};
export async function loader(args: LoaderFunctionArgs) {
    const {newsHandle} = args.params;
    const post = await fetch(`${import.meta.env.VITE_API_ENDPOINT}/posts/${newsHandle}`);

    return {
        post: await post.json()
    };
}

export default function News() {
    const {post: news} = useLoaderData<typeof loader>()
    return (
        <>
            <section className='relative isolate overflow-hidden'>
                <HeroSection variant='complex' title={news.title} date={news.createdAt} heading={'الأخبار'} time={getDayName(news.createdAt)}/>
            </section>
            <section className='my-8 max-w-7xl mx-auto'>
                <div className='flex flex-col-reverse items-center justify-between gap-16 xl:flex-row-reverse p-4 mx-8 xl:mx-28'>
                    <div className='flex flex-col items-end justify-center gap-8 max-w-xl mb-auto'>
                        <p>{news.content}</p>
                    </div>
                    <div className='flex flex-col items-end justify-center gap-4'>
                        <img
                            alt=''
                            loading='eager'
                            src={`${import.meta.env.VITE_API_ENDPOINT}/${news.pic}`}
                            className='object-cover overflow-hidden w-[400px] h-[320px]'
                        />
                        <div className='text-right'>
                            {news.description}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
