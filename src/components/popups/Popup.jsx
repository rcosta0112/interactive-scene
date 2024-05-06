"use client";

import Image from 'next/image';

import "./popup.css";
import { popupData } from "/src/app/utils/popupData";

// import Swiper core and required modules
import { Navigation, Pagination, Keyboard } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

export default function Popup({ id, currentPopup, closePopups }) {

  // Populate slides
  const slides = popupData.find(slide => {
    return slide.id == id
  }).slides;


  function closePopup() {
    closePopups();
  }

  return (

    <div className={"popup " + (currentPopup === id ? "in" : "")}>
        <div className='popup-body'>
        <Swiper
          modules={[Navigation, Pagination, Keyboard]}
          spaceBetween={50}
          keyboard={{ enabled: true }}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          navigation-sides-offset={40}
        >
          {
            slides.map((slide, index) => {
              if (slide.video) {
                return (
                  <SwiperSlide key={index}>
                    <div className="video-wrapper">
                      <Image width="1920" height="1080" alt="slide" className="video-player-embed" data-uuid={slide.UUID} data-v="4" data-type="inline" />
                    </div>
                  </SwiperSlide>
                )
              } else {
                return (
                  <SwiperSlide key={index}>
                    <Image width="1920" height="1080" alt="slide" className="swiper-slide" src={slide.fileName} />
                  </SwiperSlide>
                )
              }
            })
          }
        </Swiper>
        <div title="Close Popup" className="popup-close-button" onClick={closePopup}>
          <div className="popup-close-button-text">+</div>
        </div>
      </div>
    </div>
  )

}

