import {Link} from "@remix-run/react";
import {formatDateToDDMMYYYY} from "~/lib/utils";
import Calender from "~/asstes/icons/Calender.svg";
import Time from "~/asstes/icons/Time.svg";
import {Button} from "~/components/ui/Button";
import {course} from "~/components/ui/CourseCard";

export function WorkshopCard({workshop}: {workshop: course}) {
    return (
        <Link to={`/workshops/${workshop.id}`} className='shadow-lg rounded-xl bg-white flex flex-col items-center justify-center'>
            <img
                alt=''
                src={`${import.meta.env.VITE_API_ENDPOINT}/${workshop.cover}`}
                className='object-cover overflow-hidden w-[461px] h-[246px] rounded-xl'
                loading='lazy'
            />
            <div className='flex flex-row-reverse items-center justify-between'>
                <div className='flex flex-col gap-2 w-full px-4 pb-4'>
                    <p className='text-brand text-right'>{workshop.title}</p>
                    <p dir={'RTL'} className='text-xl text-right font-bold min-h-14'>{workshop.description}</p>
                    <div className='flex flex-row items-center justify-end gap-4'>
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
                <div className='ml-2'>
                    <Button baseButtonClasses='inline-block rounded-md text-center py-2 px-4'>انضمام</Button>
                </div>
            </div>
        </Link>
    );
}