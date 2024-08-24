import {LoaderFunctionArgs, MetaFunction} from "@remix-run/node";
import {HeroSection} from "~/components/HeroSection";
import {useLoaderData} from "@remix-run/react";

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
                <HeroSection variant='complex' title={news.title} createdAt={news.createdAt} heading={'الأخبار'} />
            </section>
            <section className='my-8 max-w-7xl mx-auto'>
                <div className='flex flex-col-reverse items-center justify-between gap-16 xl:flex-row-reverse p-4 mx-8 xl:mx-28'>
                    <div className='flex flex-col items-end justify-center gap-8 max-w-xl'>
                        <p>{news.content}</p>
                    </div>
                    <div className='flex-col items-center justify-center gap-4'>
                        <img
                            alt=''
                            loading='eager'
                            src={`${import.meta.env.VITE_API_ENDPOINT}/${news.pic}`}
                            className='object-cover overflow-hidden max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl'
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
