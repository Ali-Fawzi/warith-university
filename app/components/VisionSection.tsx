import vision from '../asstes/images/vision.jpeg'
import EyeIcon from '../asstes/icons/Eye.svg'
import MessageIcon from '../asstes/icons/Message.svg'
import MissionIcon from '../asstes/icons/Mission.svg'
export function VisionSection() {
    return (
      <div className='flex flex-col xl:flex-row gap-16 items-center justify-center p-4 xl:p-16'>
        <div className='flex flex-col justify-end items-end text-right gap-4'>
            <div className='flex flex-row gap-2 items-end justify-end font-bold'>
                <p>رؤيتنا</p>
                <div className='p-1 bg-brand'>
                    <EyeIcon />
                </div>
            </div>
            <p className='font-light text-sm'>تعزيز القدرات لخلق الفرص</p>
            <div className='flex flex-row gap-2 items-end justify-end font-bold'>
                <p>رسالتنا</p>
                <div className='p-1 bg-brand'>
                    <MessageIcon />
                </div>
            </div>
            <p className='font-light text-sm'>التمكين المهني لطلبة وخريجي الجامعة ليأخذوا دورهم الحقيقي في المجتمع</p>
            <div className='flex flex-row gap-2 items-end justify-end font-bold'>
                <p>مهمتنا</p>
                <div className='p-1 bg-brand'>
                    <MissionIcon />
                </div>
            </div>
            <ul dir='rtl' className='font-light text-sm text-right list-disc mr-3'>
                <li>بناء القدرات وتعزيز التدريب وتحفيز التعلم الذاتي لضمان التحسين المستمر</li>
                <li>تعزيز الاخلاقيات والممارسات المهنية بما ينسجم مع منظومة الاخلاقية</li>
                <li>التفكير الريادي في الاعمال لتحويل الافكار الى مشاريع نافعة في المجتمع</li>
                <li>تحقيق الاثر الاقتصادي والاجتماعي</li>
                <li>تعزيز المجتمع المستدام</li>
            </ul>
        </div>
          <img alt='' src={vision} className='object-cover overflow-hidden w-[380px] h-[494px] xl:h-[494px] xl:w-[366px]'/>
      </div>
    );
}