import {itemNews, NewsCard} from "~/components/ui/NewsCard";
import {Link} from "@remix-run/react";
import {Button} from "~/components/ui/Button";
import Vector from '../asstes/icons/Vector.svg'
export function NewsSection({news}: {news: itemNews}) {
    return (
        <div className='flex flex-col items-center justify-center mb-16'>
            <p className='text-center text-3xl font-bold'>النشاطات</p>
            <div className='flex flex-col-reverse xl:flex-row items-center justify-center gap-16 mt-8'>
                <div className='flex flex-col items-center justify-center gap-16 w-full'>
                    {news.data.map((item: itemNews, i: number) =>
                        <div key={item.id} className='relative w-full'>
                            <NewsCard itemNews={item} variant='section'/>
                            {i === 0 ?
                                <div className='hidden xl:block absolute -right-4 xl:-right-6 top-1/2'>
                                    <Vector/>
                                </div>
                                : ''}
                        </div>
                    )}
                </div>
                <div className='relative w-full rounded-xl'>
                    <img
                        alt=''
                        src={import.meta.env.VITE_API_ENDPOINT + '/' + news.data[0].pic}
                        className='object-cover overflow-hidden h-[253px] w-[380px] xl:h-[760px] xl:w-[580px] rounded-xl'
                        loading='lazy'
                    />
                    <div aria-hidden="true" className="absolute inset-0 bg-dark/50 rounded-xl"/>
                    <div className='absolute bottom-0 text-white text-2xl xl:text-3xl text-right p-4 xl:mb-20 w-full rounded-xl'>
                        <p>{news.data[0].title}</p>
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