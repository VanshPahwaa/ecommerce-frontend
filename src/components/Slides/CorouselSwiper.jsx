import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './styles.css';


import firstImage from "../../assets/ForSlides/firstImage.png"
import secondImage from "../../assets/ForSlides/MegaSaleTemplate.png"
import thirdImage from "../../assets/ForSlides/onTopBrands.png"
import forthImage from "../../assets/ForSlides/upcommingSale.png"


// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

export default function CorouselSwiper() {
  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide><img src={firstImage}/></SwiperSlide>
        <SwiperSlide><img src={secondImage}/></SwiperSlide>
        <SwiperSlide><img src={thirdImage}/></SwiperSlide>
        <SwiperSlide><img src={forthImage}/></SwiperSlide>
      </Swiper>
    </>
  );
}
