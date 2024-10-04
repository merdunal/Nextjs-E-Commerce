"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { useEffect, useRef } from "react";
import { Pagination } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";

const MainImageSlider = () => {
  const sliderRef = useRef<any>(null);

  const images = [
    "/eCommerce-Website-Features-1920-x-1080.jpg",
    "/e-commerce-1920-x-1080-wallpaper-tb4uqckgoo0883zw.jpg",
    "/19201080.png",
    // Add more image paths as needed
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      if (sliderRef.current) {
        sliderRef.current.swiper.slideNext();
      }
    }, 5000); // Change slides every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative bg-zinc-100 overflow-hidden h-[600px] w-[1920px]">
      <Swiper
        ref={sliderRef}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        slidesPerView={1}
        loop={true} // Enable looping
        className="h-full w-full"
      >
        {images.map((src, index) => (
          <SwiperSlide key={index} className="relative h-full w-full">
            <Image
              src={src}
              alt={`Slide image ${index + 1}`}
              layout="fill" // Use layout fill for responsive resizing
              objectFit="cover" // Crop the image to fill
              //className="rounded-xl" // Optional: Add rounded corners if desired
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Navigation Buttons */}
      <div className="absolute z-10 inset-0 flex items-center justify-between opacity-100 transition">
        <button
          onClick={() => sliderRef.current.swiper.slidePrev()}
          className="hover:bg-gray-500 text-white rounded-full p-2 m-2"
          aria-label="Previous Slide"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          onClick={() => sliderRef.current.swiper.slideNext()}
          className="hover:bg-gray-500 text-white rounded-full p-2 m-5"
          aria-label="Next Slide"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
};

export default MainImageSlider;
