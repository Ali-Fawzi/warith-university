import universityImage from '../asstes/images/university.jpeg'
import {formatDateToDDMMYYYY, getDayName} from "~/lib/utils";
export function HeroSection ({title, variant, date, heading, time}: {title: string; variant?: 'complex'; date?: string; heading?: string; time?: string}) {
    return (
        <div className='h-48'>
            <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
                <img
                    loading='eager'
                    alt=""
                    src={universityImage}
                    className="h-full w-full object-cover object-center"
                />
            </div>
            <div aria-hidden="true" className="absolute inset-0 bg-dark/50"/>
            {!variant ?
                <div className='absolute text-white w-full text-center text-3xl font-bold mt-20'>
                    <span className='text-brand'> {title.split(" ")[0]} </span>
                    <span>{title.split(" ")[1]}</span>
                </div> :
                <div className='absolute flex flex-col items-end justify-center max-w-7xl m-auto left-0 right-0 h-full gap-1 text-white p-4'>
                    <div className='text-brand text-xl'>
                        {heading}
                    </div>
                    <div className='text-2xl xl:text-3xl font-bold text-right'>
                        {title}
                    </div>
                    <div className='flex flex-row items-center justify-center gap-1 border-t-2 border-brand'>
                        {date && (
                            <span>{formatDateToDDMMYYYY(date)}</span>
                        )}
                        {time && (
                            <span>{time}</span>
                        )}
                    </div>
                </div>
            }
        </div>
    );
}