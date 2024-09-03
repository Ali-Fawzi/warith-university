import {course, CourseCard} from "~/components/ui/CourseCard";
import {Link} from "@remix-run/react";
import {Button} from "~/components/ui/Button";

export function CoursesSection({course}: {course: course}) {
    return (
        <div className='my-8 max-w-7xl mx-auto flex flex-col items-center justify-center'>
            <p className='text-center text-3xl font-bold'>الدورات التدريبية</p>
            <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 p-4 mt-8'>
                {course.data.map((course: course) => (
                        <div key={course.id} className='mx-auto'>
                            <CourseCard course={course}/>
                        </div>
                    )
                )}
            </div>
            <Link to={'courses'} className='mt-8'>
                <Button
                    variant={'secondary'}
                    baseButtonClasses='inline-block rounded-md font-semibold text-center py-3 px-6 border'
                >
                    عرض كل الدورات
                </Button>
            </Link>
        </div>
    );
}