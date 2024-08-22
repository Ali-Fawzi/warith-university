import {itemNews, NewsCard} from "~/components/ui/NewsCard";
import newsimg from "~/asstes/static/news.jpeg";
import {Link} from "@remix-run/react";
import {Button} from "~/components/ui/Button";

export function NewsSection(news: itemNews[]) {
    return (
        <div className='flex flex-col items-center justify-center mb-16'>
            <p className='text-center text-3xl font-bold'>النشاطات</p>
            <div className='flex flex-col-reverse xl:flex-row items-center justify-center gap-16 mt-8'>
                <div>
                    {news.news.data.map((item: itemNews) =>
                        <div key={item.id}>
                            <NewsCard  item={item} />
                        </div>
                    )}
                </div>
                <div className='relative'>
                    <img
                        alt=''
                        src={newsimg}
                        className='object-cover overflow-hidden h-[253px] w-[380px] xl:h-[760px] xl:w-[580px]'
                    />
                    <div aria-hidden="true" className="absolute inset-0 bg-dark/50"/>
                    <div className='absolute bottom-0 text-white text-2xl xl:text-3xl text-right p-4 xl:mb-20'>
                        <p>خطوات عملية لتأهيل وتدريب وتوظيف طلبة وخريجي جامعة وارث الانبياء(عليه
                            السلام)</p>
                    </div>
                </div>
            </div>
            <Link to={'news'} className='mt-8'>
                <Button
                    variant={'secondary'}
                    baseButtonClasses='inline-block rounded-md font-semibold text-center py-3 px-6 border'
                >
                    عرض كل الاخبار
                </Button>
            </Link>
        </div>
    );
}