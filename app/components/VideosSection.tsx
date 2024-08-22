import VectorIcon from '../asstes/icons/Vector.svg'
import {Link} from "@remix-run/react";
import {Button} from "~/components/ui/Button";
export function VideosSection() {
    return (
        <div className="flex flex-col gap-8 p-4 items-center">
            <div className='flex flex-row-reverse w-full justify-around'>
                <div className='hidden xl:block'>
                    <iframe
                        title='استعدادات الجامعة للعام الدراسي القادم'
                        className='w-[340px] h-[253px] xl:w-[654px] xl:h-[370px]'
                        src="https://www.youtube.com/embed/ShuGg7PzdGI"
                    />
                    <div className='flex flex-row justify-end gap-2 mt-2'>
                        <p className='-mt-1 text-right'>استعدادات الجامعة للعام الدراسي القادم</p>
                        <VectorIcon/>
                    </div>
                </div>
                <div>
                    <iframe
                        title='ماذا قال ضيوف مؤتمر وارث الدولي الاول للعلوم الهندسية" عن جامعة وارث الانبياء(عليه السلام)'
                        className='w-[340px] h-[253px] xl:w-[654px] xl:h-[370px]'
                        src="https://www.youtube.com/embed/YrR1jc80t3o"
                    />
                    <div className='flex flex-row justify-end items-center gap-2 mt-2'>
                        <p className='-mt-1 text-right'>.ماذا قال ضيوف مؤتمر وارث الدولي الاول للعلوم الهندسية" عن جامعة وارث الانبياء(عليه السلام)
                        </p>
                        <VectorIcon/>
                    </div>
                </div>
            </div>
            <Link to={'youtube-library'} className='mt-8'>
                <Button
                    variant={'secondary'}
                    baseButtonClasses='inline-block rounded-md font-semibold text-center py-3 px-6 border'
                >
                    عرض مكتبة الفيديوهات
                </Button>
            </Link>
        </div>
    );
}