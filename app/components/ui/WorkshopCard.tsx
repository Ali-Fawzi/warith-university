import {Link} from "@remix-run/react";
import {formatDateToDDMMYYYY} from "~/lib/utils";
import Calender from "~/asstes/icons/Calender.svg";
import Time from "~/asstes/icons/Time.svg";
import {course} from "~/components/ui/CourseCard";

export function WorkshopCard({workshop}: {workshop: course}) {
    return (
        <Link to={`/workshops/${workshop.id}`} className='shadow-sm transition transform ease-in-out duration-500 hover:shadow-xl border border-white hover:border-background rounded-xl bg-white flex flex-col items-center justify-center'>
            <img
                alt=''
                src={`${import.meta.env.VITE_API_ENDPOINT}/${workshop.cover}`}
                className='object-cover overflow-hidden w-[461px] h-[246px] rounded-t-xl'
                loading='lazy'
            />
            <div className='flex flex-row-reverse items-center justify-between w-full'>
                <div className='flex flex-col items-end justify-end gap-2 w-full px-4 pb-4'>
                    <p className='text-brand font-light text-right'>{workshop.title}</p>
                    <p dir={'RTL'} className='text-xl text-right min-h-14 max-w-72 line-clamp-1'>{workshop.description}</p>
                    <div className='flex flex-row items-center justify-between gap-4 text-sm w-full'>
                        <div className='flex flex-row items-center justify-end gap-1'>
                            <p className='font-light'>{formatDateToDDMMYYYY(workshop.startDate)}</p>
                            <Calender/>
                        </div>
                        <div className='flex flex-row items-center justify-end gap-1'>
                            <p className='font-light'>{workshop.duration}</p>
                            <Time/>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}