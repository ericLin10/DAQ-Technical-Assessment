import React from 'react';
import './App.css';
var fs = require('fs');

interface data {
  timestamps: number[];
  temperatures: number[];
}

function IncidentTimestamps({timestamps, temperatures}: data) {
  
  let valueColour = 'white';
  const listItems = timestamps.map((timestamp,index) => {
    if (temperatures[index] < 20) {
      return <li className ="cold">{`Timestamp: ${timestamp}   ${temperatures[index]}°C`}</li>
    } else {
      return <li className ="hot">{`Timestamp: ${timestamp}    ${temperatures[index]}°C`}</li>
    }
  }
);
  return (
      <header className="recent-timestamps" style={{ color : 'white'}}>
        <p>Timestamps of recent temperature errors</p>
        <ul>{listItems}</ul>
      </header>
  );
}

export default IncidentTimestamps;