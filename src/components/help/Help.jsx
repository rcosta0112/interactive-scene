"use client";

import "./help.css";

export default function Help({ helpIn=false, thumbnailURL, toggleHelp }) {

  return (
    <div className={"help " + (helpIn ? "in" : "")}>
      <div className="help-container">
        <img className="help-thumbnail" src={thumbnailURL} />
        <div className="help-body">
          <div className='help-header'>
            <h1>Welcome</h1>
            <p>Navigate through this interactive floor by clicking the hotspots to see our solution come to life.</p>
          </div>
          <div className="help-columns">
            <div className="help-column">
              <img className="help-icon" src="images/help-icon-drag.svg" alt="" />
              <p className="small">Click and grab the screen or scroll to move around the space</p>
            </div>
            <div className="vertical-separator" />
            <div className="help-column">
              <img className="help-icon" src="images/help-icon-click.svg" alt="" />
              <p className="small">Click a hotspot to display additional content</p>
            </div>
          </div>
          <button onClick={toggleHelp}>Begin exploring</button>
        </div>
      </div>
    </div>
  )
}