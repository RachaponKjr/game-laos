import { Icon } from "@iconify/react";
import React from "react";
import { BannerType } from "@/types/banner.type";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import { Autoplay, Navigation } from "swiper/modules";

const Banner = ({ banner }: { banner: BannerType[] }) => {
  return (
    <div className="relative my-10 md:my-20 max-w-11/13 md:max-w-10/12 mx-auto">
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        loop
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        navigation={{
          nextEl: ".swiper-next",
          prevEl: ".swiper-prev",
        }}
        modules={[Autoplay, Navigation]}
      >
        {banner.map((item) => (
          <SwiperSlide key={item.id}>
            <div className="bg-neutral-200 w-full aspect-16/8 flex items-end relative">
              <Image
                src={item.imageUrl || ""}
                alt={item.title || ""}
                fill
                className="object-cover"
              />
              <div className="absolute top-0 left-0 w-full h-full bg-linear-to-t from-black/50 via-black/10 to-transparent z-20" />
              <div className="text-white flex flex-col md:gap-2 p-4 md:p-10 z-50">
                <h5 className="text-sm md:text-4xl max-w-3xl font-bold line-clamp-1">
                  {item.title || ""}
                </h5>
                <p className="max-w-2xl text-xs md:text-lg line-clamp-2">
                  {item.description || ""}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* <div className="bg-neutral-200 w-full aspect-16/8 flex items-end relative">
        <Image
          src={banner[0]?.imageUrl || ""}
          alt={banner[0]?.title || ""}
          fill
          className="object-cover"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-linear-to-t from-black/50 via-black/10 to-transparent z-20" />
        <div className="text-white flex flex-col md:gap-2 p-4 md:p-10 z-50">
          <h5 className="text-sm md:text-4xl max-w-3xl font-bold line-clamp-1">
            {banner[0]?.title || ""}
          </h5>
          <p className="max-w-2xl text-xs md:text-lg line-clamp-2">
            {banner[0]?.description || ""}
          </p>
        </div>
      </div> */}
      <div className="swiper-prev absolute top-1/2 left-0 rotate-45 -translate-x-1/2 -translate-y-1/2 w-12 md:w-16 h-12 md:h-16 p-2 bg-[#0b0c2a] z-20">
        <div className="w-full h-full bg-white/70 cursor-pointer flex items-center justify-center">
          <Icon
            icon="mdi:arrow-left"
            width={26}
            height={26}
            color="#0b0c2a"
            className="-rotate-45"
          />
        </div>
      </div>
      <div className="swiper-next absolute top-1/2 right-0 rotate-45 translate-x-1/2 -translate-y-1/2 w-12 md:w-16 h-12 md:h-16 p-2 bg-[#0b0c2a] z-20">
        <div className="w-full h-full bg-white/70 cursor-pointer flex items-center justify-center">
          <Icon
            icon="mdi:arrow-right"
            width={26}
            height={26}
            color="#0b0c2a"
            className="-rotate-45"
          />
        </div>
      </div>
    </div>
  );
};

export default Banner;
