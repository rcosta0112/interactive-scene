"use client";

import Scene from "@/components/scene/Scene";
import TopNav from "@/components/topNav/TopNav";
import MiniMap from "@/components/miniMap/MiniMap";
import Help from "@/components/help/Help";
import Hotspots from "@/components/hotspots/Hotspots";
import Hotspot from "@/components/hotspots/Hotspot";
import Popup from "@/components/popups/Popup";
import VideoPopup from "@/components/popups/VideoPopup";

import { useSearchParams } from 'next/navigation';
import { useState, useEffect, useRef } from "react";

export default function Home() {

  const searchParams = useSearchParams();

  // Scene scroll and mini map
  const sceneRef = useRef();
  const [sceneScroll, setSceneScroll] = useState();

  const backgroundRef = useRef();
  const backgroundURL = "/images/background/main-floor.jpg";

  // Help
  const [helpIn, setHelpIn] = useState();

  const toggleHelp = function () {
    setHelpIn(!helpIn);
  }

  // checks if help popup should be up on load
  useEffect(() => {
    if(searchParams.get('nohelp')){
      setHelpIn(false);
    } else {
      setHelpIn(true);
    }
  }, [true]);


  // Popups
  const [currentPopup, setCurrentPopup] = useState();

  const openPopup = function (targetPopup) {
    setCurrentPopup(targetPopup);
  }

  const closePopups = function () {
    setCurrentPopup(false);
  }

  return (
    <main>

      <Scene startPosition="0" backgroundURL={backgroundURL} sceneRef={sceneRef}
             backgroundRef={backgroundRef}
             sceneScroll={sceneScroll} setSceneScroll={setSceneScroll}>
        <Hotspots>
          <Hotspot label="Overview" position={{ x: 32, y: 45 }} clickHandler={openPopup} targetPopup="1" type="icon" />
          <Hotspot label="Dolorem Sit Amet" position={{ x: 86, y: 52 }} clickHandler={openPopup} targetPopup="2" type="icon" number="1" />
          <Hotspot label="Lab" position={{ x: 266, y: 42 }} targetPopup="4" type="zoom" link="/lab" />
          <Hotspot label="Puela Cantat" position={{ x: 353, y: 52 }} clickHandler={openPopup} targetPopup="5" type="icon" />
        </Hotspots>
      </Scene>

      <TopNav toggleHelp={toggleHelp} />
      {/* <MiniMap thumbnailURL={backgroundURL} backgroundRef={backgroundRef} scene={sceneRef} setSceneScroll={setSceneScroll} sceneScroll={sceneScroll} /> */}

      <Popup id="1" currentPopup={currentPopup} closePopups={closePopups} />
      <Popup id="2" currentPopup={currentPopup} closePopups={closePopups} />
      <Popup id="4" currentPopup={currentPopup} closePopups={closePopups} />
      <Popup id="5" currentPopup={currentPopup} closePopups={closePopups} />

      <Help helpIn={helpIn} toggleHelp={toggleHelp} thumbnailURL={backgroundURL} />

    </main>
  );
}
