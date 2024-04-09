"use client";

import Image from 'next/image';
// import VidyardEmbed from '@vidyard/embed-code';
import "./popup.css";
import { useState, useEffect } from 'react';

export default function VideoPopup({ id, currentPopup, closePopups, UUID }) {

  const [popupIsVisible, setPopupIsVisible] = useState();

  useEffect(() => {
    if (currentPopup === id){
      player[0].seek(0);
      player[0].play();
    }
  }, [popupIsVisible, currentPopup, id])

  // VidyardEmbed.api.addReadyListener((_, player) => {
  //   if(currentPopup === id) player.play();
  // }, UUID)

  // Video player 
  // VidyardEmbed.api.renderDOMPlayers();
  // const players = VidyardV4.players;
  // const player = VidyardV4.api.getPlayersByUUID(UUID);

  function closePopup() {
    players.forEach((player) => {player.seek(0); player.pause()});
    closePopups();
  }

  return (
    <div className={"popup " + (currentPopup === id ? "in" : "")}>
      <div className="video-wrapper">
        <Image width="1920" height="1080" alt="slide" className="vidyard-player-embed" data-uuid={UUID} data-v="4" data-type="inline" />
      </div>
      <div title="Close Popup" className="popup-close-button" onClick={closePopup}>
        <div className="popup-close-button-text">+</div>
      </div>
    </div>
  )

}

