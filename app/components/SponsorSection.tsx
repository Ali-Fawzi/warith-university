import {Link} from "@remix-run/react";

type sponsor = {
    name: string;
    pic: string;
    link: string;
}
export function SponsorSection({sponsors} :{sponsors: sponsor[]}) {
    return (
      <div className='text-center bg-white flex flex-col justify-center items-center gap-4 p-4'>
          <p className='text-center border-brand border-b pb-2 text-2xl max-w-xs mx-auto'>المؤسسات الداعمة</p>
          <div className='flex flex-col items-center justify-start xl:justify-around xl:flex-row gap-8 grow'>
              {sponsors.map((sponser: sponsor) =>
                  <Link to={sponser.link} key={sponser.name}>
                    <div className='w-48 h-48'>
                        <img
                            className="object-cover h-full overflow-hidden mx-auto"
                            sizes="(min-width: 64em) 25vw, (min-width: 48em) 30vw, 45vw"
                            src={import.meta.env.VITE_API_ENDPOINT +'/'+ sponser.pic}
                            alt={sponser.name}
                        />
                    </div>
                    <p>{sponser.name}</p>
                  </Link>
              )}
          </div>
      </div>
    );
}