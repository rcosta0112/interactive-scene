"use client";

import Link from 'next/link';
import "./topNav.css";

export default function TopNav({ toggleHelp }) {

  const backButtonIn = false;

  return (
    <div className="top-nav">
      <Link className={"back-button " + (backButtonIn ? "in" : "")} href="/">
        <div className="back-button-label">Back</div>
      </Link>
      <div className="spacer-horizontal"></div>
      <div className="nav-right">
        <div className="help-button" onClick={toggleHelp}>
          <div className="help-button-label">?</div>
        </div>
      </div>
    </div>
  )
}