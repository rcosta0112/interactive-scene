"use client";

import { useEffect, useRef, useState } from 'react';
import "./scene.css";
import "./miniMap.css";

export default function Scene({ backgroundURL, startPosition, children }) {

  const sceneRef = useRef(null);
  const backgroundRef = useRef(null);
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


  // MINI MAP

  let targetPosition;
  let isDownMinimap = false;
  let currentPosition;
  let controlOffset;
  let minX;
  let maxX;
  let padding = 0;
  let sceneWidth;

  const miniMap = useRef();
  const control = useRef();
  const [controlWidth, setControlWidth] = useState();

  // Control handlers

  useEffect(() => {

    sceneWidth = backgroundRef.current?.offsetWidth || 0;
    controlOffset = control.current.offsetWidth / 2;
    minX = controlOffset;
    maxX = miniMap.current.offsetWidth - controlOffset;

    control.current.style.left = 0;

    miniMap.current.addEventListener('mousedown', mouseUp);
    miniMap.current.addEventListener('touchstart', mouseUp);

    miniMap.current.addEventListener('mouseup', mouseDown);
    miniMap.current.addEventListener('touchend', mouseDown);

    miniMap.current.addEventListener('mouseup', mouseDown);
    miniMap.current.addEventListener('touchend', mouseDown);

    miniMap.current.addEventListener('mousemove', mouseMove);
    miniMap.current.addEventListener('touchmove', mouseMove);

    miniMap.current.addEventListener('mouseenter', () => {
      isDownMinimap = false;
      miniMap.current.classList.remove('scrolling');
    });

    // These two are flipped for some reason. WTF.
    function mouseUp(e) {
      isDownMinimap = true;
      control.current.classList.add('scrolling');
      startX = e.pageX - miniMap.current.offsetLeft;
      currentPosition = control.current.style.left;
    }

    function mouseDown() {
      isDownMinimap = false;
      control.current.classList.remove('scrolling');
    }

    function mouseMove(e) {

      // If mouse is up, do nothing
      if (!isDownMinimap) return;
      e.preventDefault();
      
      // Gets mouse X relative to the minimap
      if (e.pageX !== undefined) {
        targetPosition = e.pageX - miniMap.current.offsetLeft;
      } else {
        // Touch screen support
        targetPosition = e.changedTouches[0].pageX - miniMap.current.offsetLeft;
      }
      
      // Clamps control.current position
      if (targetPosition < minX + padding) { targetPosition = minX; }
      else if (targetPosition > maxX - padding) { targetPosition = maxX - padding; }
      
      // Offsets for the frame size
      targetPosition = targetPosition - controlOffset;
      
      // Updates the position of the minimap's control.current
      control.current.style.left = targetPosition + "px";
      
      // Normalizes minimap position
      let normalizedPosition = targetPosition / (miniMap.current.offsetWidth - controlOffset / 2);
      
      // Scrolls scene
      sceneRef.current.scrollLeft = normalizedPosition * sceneWidth;

    }

  });

  
  useEffect(() => {
    // Updates minimap control control.current width 
    updateControlWidth();
    window.addEventListener("resize", updateControlWidth);
  }, []);

  function updateControlWidth() {
    setControlWidth(window.innerWidth / window.innerHeight * control.current?.offsetHeight);
  }


  // Moves minimap control control.current when scene is scrolled
  function sceneScrollHandler() {
    if (!isDownMinimap) {
      const position = sceneRef.current.scrollLeft;
      // Normalizes position
      let normalizedPosition = -position / (sceneRef.current.offsetWidth - sceneWidth);
      // Calculates target position and updates
      const targetPosition = (miniMap.current.offsetWidth - control.current.offsetWidth) * normalizedPosition;
      control.current.style.left = targetPosition + "px";
    }
  }

  return (
    <>
      <div className='scene'
        ref={sceneRef}
        onMouseDown={mouseDownHandler}
        onMouseUp={mouseUpHandler}
        onMouseLeave={mouseLeaveHandler}
        onMouseMove={mouseMoveHandler}
        onScroll={sceneScrollHandler}
      >
        <div className='background' ref={backgroundRef} style={{ backgroundImage: `url(${backgroundURL})` }}></div>
        {children}
      </div>
      {/* Mini map can't be factored out because we useState causes a refresh and stops the scroll event */}
      <div ref={miniMap} className="mini-map small">
        <img src={backgroundURL} className="mini-map-thumb" />
        <div ref={control} className="mini-map-control" style={{ width: controlWidth + "px" }}></div>
      </div>
    </>
  )

}