import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import { bannerLists } from "../../utils";

const colors = ["bg-banner-color1", "bg-banner-color2", "bg-banner-color3"];

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
// import "swiper/css/scrollbar";
import "swiper/css/effect-fade";
import "swiper/css/autoplay";

import { Link } from "react-router-dom";

const HeroBanner = () => {
  return (
    <div className="py-2 rounded-md">
      <Swiper
        grabCursor={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        navigation
        modules={[Pagination, EffectFade, Navigation, Autoplay]}
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        slidesPerView={1}
      >
        {bannerLists.map((item, i) => (
          <SwiperSlide key={item.id}>
            <div
              className={`carousel-item rounded-md sm:h-[500px] h-96 ${colors[i]}`}
            >
              <div className="flex items-center justify-center">
                <div className="hidden lg:flex justify-center w-1/2 p-18">
                  <div className="text-center">
                    <h3 className="text-3xl text-white font-bold">
                      {item.title}
                    </h3>
                    <h1 className="text-5xl text-white font-bold mt-2">
                      {item.subtitle}
                    </h1>
                    <p className="text-white font-bold mt-4">
                      {item.description}
                    </p>
                    <Link
                      className="mt-6 inline-block bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition duration-200"
                      to="/products"
                    >
                      Shop
                    </Link>
                  </div>
                </div>
                <div className="w-full flex justify-center lg:w-1/2 p-12">
                  <img
                    src={item?.image}
                    alt="Item Image"
                    className="w-full max-w-[800px] h-[400px] object-cover rounded-2xl block opacity-70"
                    style={{
                      // 4-sided linear mask: top/bottom + left/right
                      WebkitMaskImage: `
                        linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%),
                        linear-gradient(to right,  transparent 0%, black 20%, black 80%, transparent 100%)
                        `,
                      maskImage: `
                        linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%),
                        linear-gradient(to right,  transparent 0%, black 20%, black 80%, transparent 100%)
                        `,
                      // Intersect the masks (Safari/WebKit uses different keywords)
                      WebkitMaskComposite: "source-in, source-in",
                      maskComposite: "intersect",
                    }}
                  />
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroBanner;
