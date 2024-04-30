"use client";

import { useEffect, useRef, useState } from 'react';
import "./miniMap.css";

export default function MiniMap({ scene, thumbnailURL, sceneScroll, background }) {

  const miniMap = useRef();
  const control = useRef();
  const [controlWidth, setControlWidth] = useState();
  const [targetPosition, setTargetPosition] = useState(0);

  let isDown = false;
  let sceneWidth = background.current?.offsetWidth || 0;

  window.addEventListener("resize", updateControlWidth);
  useEffect(updateControlWidth)

  useEffect(()=>{
    updateControlPosition(sceneScroll)
  }, [sceneScroll])

  function updateControlWidth(){
    setControlWidth(window.innerWidth / window.innerHeight * control.current?.offsetHeight);
  }

  function updateControlPosition(position) {
    if (!isDown) {
      // Normalizes position
      let normalizedPosition = -position / (scene.current.offsetWidth - sceneWidth);
      // Calculates target position and updates
      setTargetPosition((miniMap.current.offsetWidth - control.current.offsetWidth) * normalizedPosition);
    }
  }

  return (
    <div ref={miniMap} className="mini-map small">
      <img src={thumbnailURL} className="mini-map-thumb" />
      <div ref={control} className="mini-map-control" style={{ width: controlWidth + "px", left: targetPosition + "px" }}></div>
    </div>
  )
}