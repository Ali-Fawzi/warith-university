import LeftArrow from "~/asstes/icons/LeftArrow.svg";
import {Link} from "@remix-run/react";

export type itemNews = {
    id: string;
    title: string;
    pic: string;
}
export function NewsCard(item: itemNews) {
    return (
        <div className='flex flex-row gap-4 bg-white'>
            <div className='max-w-sm flex flex-col py-4 px-8 justify-between'>
                <p className='text-right font-semibold'>{item.title}</p>
                <Link to={`news/${item.id}`} className='flex flex-row items-start justify-start gap-3'>
                    <LeftArrow />
                    <p className='-mt-1'>اقرأ المزيد</p>
                </Link>
            </div>
            <img
                alt=''
                src={import.meta.env.VITE_API_ENDPOINT +'/'+item.pic}
                className='object-cover overflow-hidden h-32 w-32 xl:h-48 xl:w-80'
            />
        </div>
    );
}