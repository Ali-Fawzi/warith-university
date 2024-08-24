import LeftArrow from "~/asstes/icons/LeftArrow.svg";
import {Link} from "@remix-run/react";
import clsx from "clsx";
import {formatDateToDDMMYYYY} from "~/lib/utils";

export type itemNews = {
    id: string;
    title: string;
    pic: string;
    createdAt: string;
    content: string;
    description: string;
}
export function NewsCard({itemNews, variant = 'section'}: {itemNews: itemNews, variant: 'page' | 'section'}) {
    return (
        <div className='max-w-5xl mx-auto'>
            <div className='flex flex-row justify-between bg-white'>
                <div className={clsx('grow flex flex-col py-4 px-8 justify-between', variant === 'section' ? 'max-w-sm' : '')}>
                    <p className='text-right font-semibold'>{itemNews.title}</p>
                    <div className='flex flex-row items-center justify-between'>
                        <Link to={`${variant === 'section' ? '/news/' : ''}${itemNews.id}`}
                              className='flex flex-row items-start justify-start gap-3'>
                            <LeftArrow/>
                            <p className='-mt-1'>اقرأ المزيد</p>
                        </Link>
                        {variant === 'page' && (
                            <p className='text-sm'>{formatDateToDDMMYYYY(itemNews.createdAt)}</p>
                        )}
                    </div>
                </div>
                <img
                    alt=''
                    src={import.meta.env.VITE_API_ENDPOINT + '/' + itemNews.pic}
                    className={clsx('object-cover overflow-hidden h-32 w-32', variant === 'page' ? 'xl:h-56 xl:w-96' : ' xl:h-48 xl:w-80')}
                    loading='lazy'
                />
            </div>
        </div>
    );
}