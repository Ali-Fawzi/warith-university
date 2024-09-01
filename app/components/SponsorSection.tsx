import {Link} from "@remix-run/react";
import {Swiper, SwiperSlide} from "swiper/react";
import {A11y, Navigation} from "swiper/modules";

type sponsor = {
    name: string;
    pic: string;
    link: string;
}
export function SponsorSection({sponsors} :{sponsors: sponsor[]}) {
    return (
      <div className='text-center bg-white flex flex-col justify-center items-center gap-4 p-4'>
          <p className='text-center border-brand border-b pb-2 text-2xl max-w-xs mx-auto'>المؤسسات الداعمة</p>
          <Swiper dir={'rtl'}
                  modules={[Navigation, A11y]}
                  spaceBetween={16}
                  breakpoints={{
                      320: {slidesPerView: 1},
                      480: {slidesPerView: 2.4},
                      600: {slidesPerView: 3.1},
                      1024: {slidesPerView: 4.1},
                      1280: {slidesPerView: 5.2},
                      1536: {slidesPerView: 6},
                  }}
                  navigation
                  className='w-full black-swiper-nav'
          >
              {sponsors.map((sponser: sponsor) =>
                  <SwiperSlide key={sponser.name}>
                      <Link to={sponser.link} >
                          <div className='w-48 h-48 mx-auto'>
                              <img
                                  className="object-cover h-full overflow-hidden mx-auto"
                                  sizes="(min-width: 64em) 25vw, (min-width: 48em) 30vw, 45vw"
                                  src={import.meta.env.VITE_API_ENDPOINT +'/'+ sponser.pic}
                                  alt={sponser.name}
                              />
                          </div>
                          <p>{sponser.name}</p>
                      </Link>
                  </SwiperSlide>
              )}
          </Swiper>
      </div>
    );
}