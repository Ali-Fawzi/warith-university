import universityImage from '../asstes/images/university.jpeg'
export function HeroSection ({title}: {title: string}) {
    return (
        <div className='h-48'>
            <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
                <img
                    alt=""
                    src={universityImage}
                    className="h-full w-full object-cover object-center"
                />
            </div>
            <div aria-hidden="true" className="absolute inset-0 bg-dark/50"/>
            <div className='absolute text-white w-full text-center text-3xl font-bold mt-20'>
                <span className='text-brand'> {title.split(" ")[0]} </span>
                <span>{title.split(" ")[1]}</span>
            </div>
        </div>
    );
}