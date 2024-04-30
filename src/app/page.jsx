"use client";

import Scene from "@/components/scene/Scene";
import TopNav from "@/components/topNav/TopNav";
import Help from "@/components/help/Help";
import Hotspots from "@/components/hotspots/Hotspots";
import Hotspot from "@/components/hotspots/Hotspot";
import Popup from "@/components/popups/Popup";
import MiniMap from "@/components/miniMap/MiniMap";

import { useState, useEffect, useRef } from "react";
import { useDebouncedCallback } from 'use-debounce';

export default function Home({ searchParams }) {

  // Fades in after dom is mounted
  useEffect(() => {
    const main = document.querySelector('main');
    main.classList.add('in');
  }, []);


  // Scene scroll and mini map
  const backgroundRef = useRef();
  const backgroundURL = "/images/background/main-floor.jpg";

  const sceneRef = useRef();
  const [sceneScroll, setSceneScroll] = useState();
  // var sceneScroll = 0;

  // If you don't debounce, setSceneScroll will stop the page from scrolling
  const scrollHandler = useDebouncedCallback((e)=>{
    setSceneScroll(e.target.scrollLeft);
  }, 100);

  // const scrollHandler = function(e){
  //   sceneScroll = e.target.scrollLeft;
  //   console.log(sceneScroll)
  // }

  // Help
  const [helpIn, setHelpIn] = useState();

  const toggleHelp = function () {
    setHelpIn(!helpIn);
  }

  // Only shows the help screen if not coming from another page
  useEffect(() => {
    if (searchParams.help === undefined) {
      setHelpIn(true);
    }
  }, []);

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
      <Scene
        startPosition="0"
        backgroundURL={backgroundURL}
        sceneRef={sceneRef}
        backgroundRef={backgroundRef}
        scrollHandler={scrollHandler}
        >
        <Hotspots>
          <Hotspot label="Overview" position={{ x: 31, y: 43 }} clickHandler={openPopup} targetPopup="1" type="icon" />
          <Hotspot label="Dolorem Sit Amet" position={{ x: 86, y: 46 }} clickHandler={openPopup} targetPopup="2" type="icon" number="1" />
          <Hotspot label="Lab" position={{ x: 266, y: 42 }} targetPopup="4" type="zoom" link="/lab" />
          <Hotspot label="Puela Cantat" position={{ x: 293, y: 43 }} clickHandler={openPopup} targetPopup="5" type="icon" />
        </Hotspots>
      </Scene>

      <TopNav toggleHelp={toggleHelp} />
      <MiniMap
        thumbnailURL={backgroundURL}
        background={backgroundRef}
        scene={sceneRef}
        sceneScroll={sceneScroll}
      />

      <Popup id="1" currentPopup={currentPopup} closePopups={closePopups} />
      <Popup id="2" currentPopup={currentPopup} closePopups={closePopups} />
      <Popup id="4" currentPopup={currentPopup} closePopups={closePopups} />
      <Popup id="5" currentPopup={currentPopup} closePopups={closePopups} />

      <Help helpIn={helpIn} toggleHelp={toggleHelp} thumbnailURL={backgroundURL} />

    </main>
  );
}
