"use client";

import { useEffect, useRef, useState } from 'react';
import "./scene.css";
import MiniMap from '../miniMap/MiniMap';

export default function Scene({ backgroundURL, startPosition, children }) {

  const sceneRef = useRef(null);
  const backgroundRef = useRef(null);
  const miniMapRef = useRef();
  const scrollSpeed = 1.2;

  let isDownScene = false;
  let startX;
  let scrollLeft;

  // Fade in on load
  useEffect(() => {
    const scene = document.querySelector('.scene');
    scene.classList.add('in');
  }, []);

  // useEffect(() => {
  // This controls the scene starting scroll position
  // start at a certain percentage of the scene's width
  // if (startPosition) {
  //   var maxScrollLeft = sceneRef.current.scrollWidth - sceneRef.current.clientWidth;
  //   sceneRef.current.scrollLeft = maxScrollLeft * startPosition
  // }
  // });

  const mouseDownHandler = function (e) {
    isDownScene = true;
    e.target.classList.add('scrolling');
    startX = e.pageX - e.target.offsetLeft;
    scrollLeft = e.target.scrollLeft;
  }

  const mouseUpHandler = function (e) {
    isDownScene = false;
    e.target.classList.remove('scrolling');
  }

  const mouseLeaveHandler = function (e) {
    isDownScene = false;
    e.target.classList.remove('scrolling');
  }

  const mouseMoveHandler = function (e) {
    if (!isDownScene) return;
    e.preventDefault();
    const x = e.pageX - e.target.offsetLeft;
    const walk = (x - startX) * scrollSpeed;
    e.target.scrollLeft = scrollLeft - walk;
  }


  return (
    <>
      <div className='scene'
        ref={sceneRef}
        onMouseDown={mouseDownHandler}
        onMouseUp={mouseUpHandler}
        onMouseLeave={mouseLeaveHandler}
        onMouseMove={mouseMoveHandler}
        onScroll={() => miniMapRef?.current.sceneScrollHandler()}
      >
        <div className='background' ref={backgroundRef} style={{ backgroundImage: `url(${backgroundURL})` }}></div>
        {children}
      </div>
      <MiniMap 
        sceneRef={sceneRef}
        backgroundRef={backgroundRef}
        backgroundURL={backgroundURL}
        miniMapRef={miniMapRef}
      />
    </>
  )

}