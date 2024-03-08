"use client";

import Link from 'next/link';
import "./hotspot.css";

export default function Hotspots({
  clickHandler,
  position = { x: 0, y: 0 },
  label = "Lorem Ipsum",
  targetPopup = "0",
  type = "icon",
  number,
  color,
  link
}) {

  const hotspotBody =
    <div className="hotspot" data-target={targetPopup} onClick={() => { clickHandler && clickHandler(targetPopup) }} style={{ left: position.x + "vh", top: position.y + "vh" }}>
      <div className="hotspot-icon-wrap" style={{ backgroundColor: color || "var(--primary-color)" }}>
        <div className={`hotspot-${type}`}>{type == "number" && number}</div>
      </div>
      <div className="hotspot-pulse" style={{ backgroundColor: color || "var(--primary-color)" }}></div>
      <div className="hotspot-label">{label}</div>
    </div>;

  const hotspot = (type == "zoom") ? <Link href={link}>{hotspotBody}</Link> : hotspotBody;

  return (
    hotspot
  )

}
