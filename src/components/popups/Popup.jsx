"use client";

import VidyardEmbed from '@vidyard/embed-code';

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

  // Video player 
  VidyardEmbed.api.renderDOMPlayers();
  var players = VidyardV4.players;
  // var players = VidyardV4.api.getPlayersByUUID("MW2yWVyxgcLf31k3fk9ptQ");

  function stopVideo() {
    players.forEach((player) => player.pause());
  }

  function closePopup() {
    stopVideo();
    closePopups();
  }

  return (
    <div className={"popup " + (currentPopup === id ? "in" : "")}>

      <Swiper
        modules={[Navigation, Pagination, Keyboard]}
        spaceBetween={50}
        keyboard={{ enabled: true }}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        onSlideChange={stopVideo}
      >
        {
          slides.map((slide, index) => {
            if (slide.video) {
              return (
                <SwiperSlide key={index}>
                  <div className="video-wrapper">
                    <img className="vidyard-player-embed" data-uuid={slide.UUID} data-v="4" data-type="inline" />
                  </div>
                </SwiperSlide>
              )
            } else {
              return (
                <SwiperSlide key={index}>
                  <img className="swiper-slide" src={slide.fileName} />
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
  )

}

