"use client";

import "./help.css";
import Image from 'next/image';
// import { useSearchParams } from 'next/navigation';


export default function Help({ helpIn = false, thumbnailURL, toggleHelp }) {

  // const searchParams = useSearchParams();

  // checks if help popup should be up on load

  // if (searchParams.get('nohelp')) {
  //   helpIn = false;
  // } 

  // useEffect(() => {
  //   if (searchParams.get('nohelp')) {
  //     setHelpIn(false);
  //   } else {
  //     setHelpIn(true);
  //   }
  // }, [searchParams]);

  return (
    <div className={"help " + (helpIn ? "in" : "")}>
      <div className="help-container">
        <Image width="640" height="160" alt="Office scene" className="help-thumbnail" src={thumbnailURL} />
        <div className="help-body">
          <div className='help-header'>
            <h1>Welcome</h1>
            <p>Navigate through this interactive floor by clicking the hotspots to see our solution come to life.</p>
          </div>
          <div className="help-columns">
            <div className="help-column">
              <Image width="204" height="60" alt="Drag icon" className="help-icon" src="images/help-icon-drag.svg" />
              <p className="small">Click and grab the screen or scroll to move around the space</p>
            </div>
            <div className="vertical-separator" />
            <div className="help-column">
              <Image width="204" height="60" alt="Click icon" className="help-icon" src="images/help-icon-click.svg" />
              <p className="small">Click a hotspot to display additional content</p>
            </div>
          </div>
          <button className="button" onClick={toggleHelp}>Begin exploring</button>
        </div>
      </div>
    </div>
  )
}