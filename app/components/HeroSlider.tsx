import {Swiper, SwiperSlide} from "swiper/react";
import {A11y, Navigation} from "swiper/modules";
import Logo from "~/asstes/icons/Logo2.svg";
import Logo2 from "~/asstes/icons/Logo3.svg";
import {Button} from "~/components/ui/Button";
import 'swiper/css';
import 'swiper/css/navigation';
import {Link} from "@remix-run/react";

type slide = {
    title: string;       // where this should be displayed ?
    description: string; // where this should be displayed ?
    href: string;
    pic: string;
}
export function HeroSlider({slides} :{slides: slide[]}) {
    return (
        <Swiper
            dir={'rtl'}
            modules={[Navigation, A11y]}
            spaceBetween={50}
            slidesPerView={1}
            navigation
            className={'text-white h-screen bg-dark'}
        >
            {slides.data.map((slide: slide, i: number) =>
                <SwiperSlide key={slide.title}>
                    <div>
                        <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
                            <img
                                loading={i === 0 ? 'eager':'lazy'}
                                alt=""
                                src={import.meta.env.VITE_API_ENDPOINT +'/'+ slide.pic}
                                className="h-full w-full object-cover object-center"
                            />
                        </div>
                        <div aria-hidden="true" className="absolute inset-0 bg-dark/50"/>
                        <div
                            className='absolute flex flex-col items-start justify-center w-full h-full space-y-8 xl:space-y-16 mx-8 xl:mx-16'>
                            <div className='flex flex-row-reverse items-center justify-end space-x-4 w-96'>
                                <div className='mt-auto'>
                                    <Logo className="h-[80px] w-[150px] xl:h-[120px] xl:w-[221px]"/>
                                </div>
                                <div className='-mb-3'>
                                    <Logo2 className="h-[126px] w-[81.9px] xl:h-[180px] xl:w-[117px]"
                                         />
                                </div>
                            </div>
                            <div className='flex flex-col space-y-4'>
                                <p className='text-white font-light text-xl border-brand border-b text-center pb-2 w-72'>مركز
                                    وارث للريادة و الابتكار و التطوير</p>
                                <div
                                    className='flex flex-col items-center justify-center font-bold text-5xl text-white'>
                                    <p className='w-full'>اطلق <span className='text-brand'>قدراتك</span></p>
                                    <p className='w-full'><span className='text-brand'>  وابتكر </span>مستقبلك </p>
                                </div>
                            </div>
                            <Link to={slide.href} >
                                <Button
                                    baseButtonClasses='inline-block rounded-sm font-semibold text-center py-3 px-6'
                                    variant='secondary'
                                >انضم الان</Button>
                            </Link>
                        </div>
                    </div>
                </SwiperSlide>
            )}
        </Swiper>
    );
}