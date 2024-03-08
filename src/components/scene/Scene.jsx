"use client";

import { useEffect, useRef } from 'react';
import "./scene.css";

export default function Scene({ backgroundURL, backgroundRef, startPosition, children, sceneRef, sceneScroll, setSceneScroll }) {

  // const sceneRef = useRef(null);
  const scrollSpeed = 1.2;

  let isDown = false;
  let startX;
  let scrollLeft;
  let currentScrollLeft = 0;

  useEffect(() => {
    // This controls the scene starting scroll position
    // start at a certain percentage of the scene's width
    // if (startPosition) {
    //   var maxScrollLeft = sceneRef.current.scrollWidth - sceneRef.current.clientWidth;
    //   sceneRef.current.scrollLeft = maxScrollLeft * startPosition
    // }
  });

  // console.log(currentScrollLeft)
  
  useEffect(() => {
    // if (!isDown) sceneRef.current.scrollLeft = sceneScroll;
    // setSceneScroll(currentScrollLeft);
  }, [currentScrollLeft])

  const mouseDownHandler = function (e) {
    isDown = true;
    e.target.classList.add('scrolling');
    startX = e.pageX - e.target.offsetLeft;
    scrollLeft = e.target.scrollLeft;
  } 

  const mouseUpHandler = function (e) {
    isDown = false;
    e.target.classList.remove('scrolling');
  }

  const mouseLeaveHandler = function (e) {
    isDown = false;
    e.target.classList.remove('scrolling');
  }

  const mouseMoveHandler = function (e) {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - e.target.offsetLeft;
    const walk = (x - startX) * scrollSpeed;
    // console.log(currentScrollLeft)
    e.target.scrollLeft = scrollLeft - walk;
    currentScrollLeft = e.target.scrollLeft;
  }

  return (
    <div className='scene'
      ref={sceneRef}
      onMouseDown={mouseDownHandler}
      onMouseUp={mouseUpHandler}
      onMouseLeave={mouseLeaveHandler}
      onMouseMove={mouseMoveHandler}
    >
      <div className='background' ref={backgroundRef} style={{ backgroundImage: `url(${backgroundURL})` }}></div>
      {children}
    </div>
  )

}