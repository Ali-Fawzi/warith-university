import {course} from "~/components/ui/CourseCard";
import {WorkshopCard} from "~/components/ui/WorkshopCard";
import {Link} from "@remix-run/react";
import {Button} from "~/components/ui/Button";

export function WorkshopsSection({workshops}: {workshops: course}) {
    return (
        <div className='max-w-7xl mx-auto flex flex-col items-center justify-center'>
            <p className='text-center text-3xl font-bold'>الورش التدريبية</p>
            <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 p-4 mt-8'>
                {workshops.data.map((course: course) => (
                    <div key={course.id} className=' mx-auto'>
                        <WorkshopCard workshop={course}/>
                    </div>
                    )
                )}
            </div>
            <Link to={'workshops'} className='mt-8'>
                <Button
                    variant={'secondary'}
                    baseButtonClasses='inline-block rounded-md font-semibold text-center py-3 px-6 border'
                >
                    عرض كل الورش
                </Button>
            </Link>
        </div>
    );
}