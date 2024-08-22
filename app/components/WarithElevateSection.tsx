import WarithElevateImg from '../asstes/images/WarithElevate.jpeg'
import {Button} from "~/components/ui/Button";
import {Link} from "@remix-run/react";
import MarkerIcon from '../asstes/icons/Marker.svg'
import BuildingIcon from '../asstes/icons/Building.svg'
import ArrowIcon from '../asstes/icons/Arrow.svg'
import OnlineVideosIcon from '../asstes/icons/OnlineVideos.svg'
import NetworkIcon from '../asstes/icons/Network.svg'
export function WarithElevateSection() {
    return (
        <div className='flex flex-col xl:flex-row items-end xl:items-center justify-center gap-24 p-4'>
            <div className='flex flex-col items-end justify-center gap-4'>
                <p className='font-semibold'>سجل الان</p>
                <p className=' text-2xl xl:text-3xl font-bold'>Warith Elevate انضم الى مجتمع</p>
                <div className='mr-56 -mt-2'>
                    <MarkerIcon />
                </div>
                <p className='font-light max-w-lg text-right'>انضم الينا في رحلة الاكتشاف والتعلم والابتكار، كن جزءا من مجتمع يحتفي بالتطوير، ويتقبل التحديات، ويحول الافكار الى مشاريع ذات تأثير.</p>
                <div className='flex flex-row items-center justify-center gap-8'>
                    <p className='font-semibold'>توفير حاضنات الاعمال</p>
                    <div className='p-3 rounded-full bg-cyan'>
                        <BuildingIcon />
                    </div>
                </div>
                <div className='flex flex-row items-center justify-center gap-8'>
                    <p className='font-semibold'>شبكات التواصل الفعال</p>
                    <div className='p-3 rounded-full bg-cyan'>
                        <NetworkIcon />
                    </div>
                </div>
                <div className='flex flex-row items-center justify-center gap-8'>
                    <p className='font-semibold'>ورش العمل والدورات التدريبية</p>
                    <div className='p-3 rounded-full bg-cyan'>
                        <OnlineVideosIcon />
                    </div>
                    <div className='absolute left-1/2 xl:left-80'>
                        <ArrowIcon />
                    </div>
                </div>
                <Link to={'#'} className='mt-8 w-72'>
                    <Button
                        baseButtonClasses='inline-block rounded-md font-semibold text-center py-3 px-6'
                        width='full'
                    >
                        Warith Elevate انضم الان الى
                    </Button>
                </Link>
            </div>
            <div className='relative p-4 mt-8'>
                <div className='w-80 h-80 bg-brand rounded-xl'/>
                <img
                    src={WarithElevateImg}
                    alt=''
                    sizes="(min-width: 64em) 25vw, (min-width: 48em) 30vw, 45vw"
                    className='object-cover overflow-hidden w-80 h-80 rounded-xl absolute top-0 -rotate-[15deg] right-16'/>
            </div>
        </div>
    );
}