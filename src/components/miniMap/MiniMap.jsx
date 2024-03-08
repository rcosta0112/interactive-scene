"use client";

import { useLayoutEffect, useEffect, useRef, useState } from 'react';
import "./miniMap.css";

export default function MiniMap({ thumbnail }) {

  const control = useRef();
  const [controlWidth, setControlWidth] = useState()

  window.addEventListener("resize", updateControlWidth);
  useEffect(updateControlWidth)

  function updateControlWidth(){
    setControlWidth(window.innerWidth / window.innerHeight * control.current.offsetHeight);
  }

  return (
    <div className="mini-map small">
      <img src={thumbnail} className="mini-map-thumb" />
      <div ref={control} className="mini-map-control" style={{ width: controlWidth + "px" }}></div>
    </div>
  )
}