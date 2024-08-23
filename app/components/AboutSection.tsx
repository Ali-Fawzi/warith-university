import about from '../asstes/images/about.png'

export function AboutSection() {
    return (
        <div className='flex flex-col items-center justify-center gap-16 xl:flex-row-reverse p-4 mx-8 xl:mx-28'>
            <div className='flex flex-col items-end justify-end gap-8 max-w-xl'>
                <p className='font-bold text-brand'>Warith Elevate</p>
                <p className='text-3xl font-bold text-navy'>مركز وارث</p>
                <p className='text-3xl'>للريادة والابتكار والتطوير</p>
                <div className='flex flex-col items-end justify-end text-right gap-2 font-light'>
                    <p>مرحبا بكم في مركز وارث للريادة والابتكار والتطوير Warith Elevate
                        نؤمن بقوة الافكار ونقدم بيئة تعاونية يطمح لها رواد الاعمال والمبتكرين ونزود الافراد بالمعرفة والمهارات والموارد التي يحتاجون اليها لتحويل افكارهم الى مشاريع ناجحة ، نقدم نهجا شاملا للتطوير من خلال ورش عمل وبرامج التدريب والارشاد</p>
                    <p>مرحبا بكم في مركز وارث للريادة والابتكار والتطوير Warith Elevate
                        نؤمن بقوة الافكار ونقدم بيئة تعاونية يطمح لها رواد الاعمال والمبتكرين ونزود الافراد بالمعرفة والمهارات والموارد التي يحتاجون اليها لتحويل افكارهم الى مشاريع ناجحة ، نقدم نهجا شاملا للتطوير من خلال ورش عمل وبرامج التدريب والارشاد.</p>
                    <p>مرحبا بكم في مركز وارث للريادة والابتكار والتطوير Warith Elevate
                        نؤمن بقوة الافكار ونقدم بيئة تعاونية يطمح لها رواد الاعمال والمبتكرين ونزود الافراد بالمعرفة والمهارات والموارد التي يحتاجون اليها لتحويل افكارهم الى مشاريع ناجحة ، نقدم نهجا شاملا للتطوير من خلال ورش عمل وبرامج التدريب والارشاد.</p>
                </div>
            </div>
            <img
                alt=''
                loading='eager'
                src={about}
                className='object-cover overflow-hidden'
            />
        </div>
    );
}