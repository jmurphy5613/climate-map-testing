import './App.css';
// eslint-disable-next-line import/no-webpack-loader-syntax
import mapboxgl from '!mapbox-gl';
import { useRef, useState, useEffect } from 'react';

mapboxgl.accessToken = 'pk.eyJ1IjoibGFuZGF1ZGVzaWduIiwiYSI6ImNrZ3F4dDIyeTBsMXIyenIzd2EwdnBsZTQifQ.MOBff0ku-Z960ubZPr3b6g';

function App() {
 
  // initialize map
  const mapContainer = useRef(null);
  const map = useRef(null);

  const [lng, setLng] = useState(-74.5);
  const [lat, setLat] = useState(40);
  const [zoom, setZoom] = useState(9);

  const addWaterEffect = () => {
    map.current.setPaintProperty('depth', 'fill-color', ['match', ['get', 'min_depth'], 6000, '#012551', 5000, '#012E65', 4000, '#01377A', 3000, '#01408D', 2000, '#024AA2', 1000, '#0253B6', 900, '#025CCA', 800, '#0265DE', 700, '#026EF2', 600, '#0D79FD', 500, '#2184FD', 400, '#358FFD', 300, '#499AFD', 200, '#5EA5FD', 100, '#72B1FD', 0, '#87BCFD', '#000000']);
  }

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/landaudesign/cl6nyboq0000u14o1zpvq98rg',
      center: [lng, lat],
      zoom: zoom
    });


  }, []);

  



  return (
    <div className="App">
      <div ref={mapContainer} className="map-container" /> 
      <button onClick={addWaterEffect} className='button'>Do Something</button>     
    </div>
  );
}

export default App;
