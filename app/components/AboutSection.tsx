import about1 from '../asstes/images/about1.jpeg'
import about2 from '../asstes/images/about2.jpeg'
import DesktopDotsIcon from '../asstes/icons/DesktopDots.svg'
import MobileDotsIcon from '../asstes/icons/MobileDots.svg'

export function AboutSection() {
    return (
        <div className='flex flex-col items-center justify-center gap-16 xl:flex-row-reverse p-4 mx-8 xl:mx-28'>
            <div className='flex flex-col items-end justify-end gap-4'>
                <p className='font-bold text-brand'>Warith Elevate</p>
                <p className='text-3xl font-bold text-navy'>مركز وارث</p>
                <p className='text-3xl'>للريادة والابتكار والتطوير</p>
                <div className='flex flex-col items-end justify-end text-right gap-1 font-light'>
                    <p>مرحبا بكم في مركز وارث للريادة والابتكار والتطوير Warith Elevate
                        نؤمن بقوة الافكار ونقدم بيئة تعاونية يطمح لها رواد الاعمال والمبتكرين ونزود الافراد بالمعرفة والمهارات والموارد التي يحتاجون اليها لتحويل افكارهم الى مشاريع ناجحة ، نقدم نهجا شاملا للتطوير من خلال ورش عمل وبرامج التدريب والارشاد</p>
                    <p>مرحبا بكم في مركز وارث للريادة والابتكار والتطوير Warith Elevate
                        نؤمن بقوة الافكار ونقدم بيئة تعاونية يطمح لها رواد الاعمال والمبتكرين ونزود الافراد بالمعرفة والمهارات والموارد التي يحتاجون اليها لتحويل افكارهم الى مشاريع ناجحة ، نقدم نهجا شاملا للتطوير من خلال ورش عمل وبرامج التدريب والارشاد.</p>
                    <p>مرحبا بكم في مركز وارث للريادة والابتكار والتطوير Warith Elevate
                        نؤمن بقوة الافكار ونقدم بيئة تعاونية يطمح لها رواد الاعمال والمبتكرين ونزود الافراد بالمعرفة والمهارات والموارد التي يحتاجون اليها لتحويل افكارهم الى مشاريع ناجحة ، نقدم نهجا شاملا للتطوير من خلال ورش عمل وبرامج التدريب والارشاد.</p>
                </div>
            </div>
            <div className='grid grid-cols-3 grid-rows-2'>
                <div className='hidden xl:block'>
                    <DesktopDotsIcon/>
                </div>
                <div className='xl:hidden'>
                    <MobileDotsIcon/>
                </div>
                <img alt='' src={about2} className='col-span-2 w-full h-full object-cover overflow-hidden'/>
                <img alt='' src={about1} className='col-span-2 w-full h-full object-cover overflow-hidden'/>
                <div className='hidden xl:flex justify-end flex-col items-end'>
                    <DesktopDotsIcon/>
                </div>
                <div className='flex justify-end flex-col items-end xl:hidden'>
                    <MobileDotsIcon/>
                </div>
            </div>
        </div>
    );
}