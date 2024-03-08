"use client";

import Scene from "@/components/scene/Scene";
import TopNav from "@/components/topNav/TopNav";
import MiniMap from "@/components/miniMap/MiniMap";
import Help from "@/components/help/Help";
import Hotspots from "@/components/hotspots/Hotspots";
import Hotspot from "@/components/hotspots/Hotspot";
import Popup from "@/components/popups/Popup";
import VideoPopup from "@/components/popups/VideoPopup";

import { useState, useEffect, useRef } from "react";

export default function Home() {

  // Scene scroll and mini map

  const sceneRef = useRef();
  const [sceneScroll, setSceneScroll] = useState();

  const backgroundRef = useRef();
  const backgroundURL = "/images/background/lab.jpg";

  // Help

  const [helpIn, setHelpIn] = useState();

  const toggleHelp = function () {
    setHelpIn(!helpIn);
  }

  useEffect(() => {
    setHelpIn(false);
  }, [false]);


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
          <Hotspot label="Lorem Ipsum" position={{ x: 54, y: 41 }} clickHandler={openPopup} targetPopup="1" type="icon" />
          <Hotspot label="Dolorem Sit Amet" position={{ x: 197, y: 42 }} clickHandler={openPopup} targetPopup="5" type="icon" />
          <Hotspot label="Back to the main floor" position={{ x: 83, y: 36 }} targetPopup="4" type="zoom" link="/?nohelp=true" />
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


