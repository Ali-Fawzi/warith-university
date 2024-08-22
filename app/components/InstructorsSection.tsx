import {Link} from "@remix-run/react";
import instructorImg from '../asstes/static/instructor.jpeg';
import PlanetIcon from '../asstes/icons/Planet.svg'
import EmailIcon from '../asstes/icons/Email.svg'
import LinkedinIcon from '../asstes/icons/Linkedin.svg'

type instructor = {
    name: string,
    email: string,
    specialization: string,
    about: string,
    linkedin?: string,
    website?: string,
}
export function InstructorsSection () {
    return (
        <div className='flex flex-col justify-center items-center gap-4 p-4'>
            <p className='text-center text-2xl max-w-sm mx-auto font-bold'>Warith Elevate تعرف على مدربين </p>
            <div className='flex flex-col items-center justify-start xl:justify-around xl:flex-row gap-8 grow'>
                <div className='flex flex-col xl:flex-row items-center justify-center gap-8 xl:gap-4 shadow-lg rounded-lg p-3 bg-white'>
                    <div className='flex flex-col items-end gap-4 xl:max-w-80'>
                        <p className='font-bold'>احمد علي كاظم</p>
                        <p className='font-light text-sm'>مهندس برمجيات</p>
                        <p className='font-light text-sm text-right'>انضم الينا في رحلة الاكتشاف والتعلم والابتكار، كن جزءا من مجتمع يحتفي بالتطوير، ويتقبل التحديات، ويحول الافكار الى مشاريع ذات تأثير.</p>
                        <div className='flex flex-row gap-2 items-start justify-start w-full'>
                            <Link to={''}>
                                <PlanetIcon />
                            </Link>
                            <Link to={''}>
                                <EmailIcon />
                            </Link>
                            <Link to={''}>
                                <LinkedinIcon />
                            </Link>
                        </div>
                    </div>
                    <img alt='' src={instructorImg} className='object-cover overflow-hidden h-80 w-72 xl:w-32 xl:h-44'/>
                </div>
            </div>
        </div>
    );
}