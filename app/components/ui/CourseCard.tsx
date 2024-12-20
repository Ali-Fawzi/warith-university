import {Link} from "@remix-run/react";
import {formatDateToDDMMYYYY} from "~/lib/utils";
import Calender from "~/asstes/icons/Calender.svg";
import Time from "~/asstes/icons/Time.svg";
import {Button} from "~/components/ui/Button";

export type course = {
    id: string;
    title: string;
    description: string;
    cover: string;
    startDate: string;
    place: string;
    duration: string;
    type: string;
}
export function CourseCard({course}: {course: course}) {
    return (
        <Link to={`/courses/${course.id}`} className='shadow-sm transition transform ease-in-out duration-500 hover:shadow-xl border border-white hover:border-background rounded-xl bg-white flex flex-col items-center justify-center'>
            <img
                alt=''
                src={`${import.meta.env.VITE_API_ENDPOINT}/${course.cover}`}
                className='object-cover overflow-hidden w-[400px] h-[320px] rounded-t-xl'
                loading='lazy'
            />
            <div className='flex flex-col gap-2 w-full p-4'>
                <p className='text-brand font-light text-right'>{course.title}</p>
                <p dir={'RTL'} className='text-xl text-right min-h-14 line-clamp-1'>{course.description}</p>
                <div className='flex flex-row items-center justify-between gap-4 text-sm'>
                    <div className='flex flex-row items-center justify-end gap-1'>
                        <p className='font-light'>{formatDateToDDMMYYYY(course.startDate)}</p>
                        <Calender />
                    </div>
                    <div className='flex flex-row items-center justify-end gap-1'>
                        <p className='font-light'>{course.duration}</p>
                        <Time />
                    </div>
                </div>
            </div>
        </Link>
    );
}