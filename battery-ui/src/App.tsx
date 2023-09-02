import React, { useState, useRef, useEffect } from 'react';
import LiveValue from './live_value'
import IncidentTimestamps from './incident_timestamps';
import RedbackLogo from './redback_logo.jpg';
import './App.css';
import LiveChart from './temperature-chart';

function App() {

  const [temperature, setTemperature] = useState<number>(1);
  const [recent_temperatures] = useState<Array<number>>([]);
  const [recent_timestamps] = useState<Array<number>>([]);

  const ws: any = useRef(null);

  useEffect(() => {
    // using the native browser WebSocket object
    const socket: WebSocket = new WebSocket("ws://localhost:8080");

    socket.onopen = () => {
      console.log("opened");
    };

    socket.onclose = () => {
      console.log("closed");
    };

    socket.onmessage = (event) => {
      console.log("got message", event.data);
      let message_obj = JSON.parse(event.data);
      const temp = message_obj["battery_temperature"].toPrecision(3);
      const timestamp = parseInt(message_obj["timestamp"]);
      setTemperature(temp);

      if (temp < 20 || temp > 80) {
        if (recent_temperatures.length === 10) {
          recent_temperatures.splice(9,1);
        } 
        recent_temperatures.unshift(message_obj["battery_temperature"].toPrecision(3));
        if (recent_timestamps.length === 10) {
          recent_timestamps.splice(9,1);
        }
        recent_timestamps.unshift(timestamp);
      }
    };

    ws.current = socket;

    return () => {
      socket.close();
    };
  }, []);

  return (
    <div className="App">
      <header className="App-header">
      <div className='left-container'>
      <img src={RedbackLogo} className="redback-logo" alt="Redback Racing Logo"/>
      <div className='current-temperature'>
          <p className='value-title'>
            Live Battery Temperature
          </p>
          <LiveValue temp={temperature}/>
      </div>
      <IncidentTimestamps temperatures = {recent_temperatures} timestamps={recent_timestamps}/>
      </div>
      <div className='right-container'>
          <p className='value-title'>
            Live Battery Temperature Chart
          </p>
          <LiveChart temperatures = {recent_temperatures} timestamps={recent_timestamps}/>
      </div>
      </header>
    </div>
  );
}

export default App;
