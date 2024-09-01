import {Link} from "@remix-run/react";
import PlanetIcon from '../asstes/icons/Planet.svg'
import EmailIcon from '../asstes/icons/Email.svg'
import LinkedinIcon from '../asstes/icons/Linkedin.svg'
import UserIcon from '../asstes/icons/User.svg'
import {Swiper, SwiperSlide} from "swiper/react";
import {A11y, Navigation} from "swiper/modules";
import 'swiper/css';
import 'swiper/css/navigation';

type instructor = {
    name: string,
    email: string,
    pic: string,
    id: string,
    jobTitle: string,
    bio: string,
    linkedIn?: string,
    website?: string,
}
export function InstructorsSection ({instructors}: {instructors: instructor}) {
    return (
        <div className='flex flex-col justify-center items-center gap-4 p-4 max-w-7xl mx-auto'>
            <p className='text-center text-2xl max-w-sm mx-auto font-bold'>Warith Elevate تعرف على مدربين </p>
            <Swiper
                dir={'rtl'}
                modules={[Navigation, A11y]}
                spaceBetween={16}
                breakpoints={{
                    320: {slidesPerView: 1.1},
                    1024: {slidesPerView: 2.3},
                    1280: {slidesPerView: 2.8},
                    1536: {slidesPerView: 3},
                }}
                navigation
                className='w-full black-swiper-nav'
            >
                {instructors.data.map((instructor: instructor) =>
                    <SwiperSlide key={instructor.id}>
                        <div
                            className='flex flex-col xl:flex-row-reverse items-center justify-between gap-8 xl:gap-4 shadow-lg rounded-lg p-4 bg-white text-right'>
                            <div className='flex flex-col items-end gap-4 w-full'>
                                <p className='font-bold text-lg w-full'>{instructor.name}</p>
                                <p className='font-light w-full'>{instructor.jobTitle}</p>
                                <p className='font-light w-full'>{instructor.bio}</p>
                                <div className='flex flex-row gap-2 items-start justify-start w-full'>
                                    {instructor.website && (
                                        <Link to={instructor.website}>
                                            <PlanetIcon/>
                                        </Link>
                                    )}
                                    <Link to={instructor.email}>
                                        <EmailIcon/>
                                    </Link>
                                    {instructor.linkedIn && (
                                        <Link to={instructor.linkedIn}>
                                            <LinkedinIcon/>
                                        </Link>
                                    )}
                                </div>
                            </div>
                            {instructor.pic ?
                                <img
                                    alt=''
                                    src={instructor.pic}
                                    className='object-cover overflow-hidden '
                                /> : <UserIcon className='h-80 w-72 xl:w-32 xl:h-44'/>
                            }
                        </div>
                    </SwiperSlide>
                )}
            </Swiper>
        </div>
    );
}