import './App.css';
// eslint-disable-next-line import/no-webpack-loader-syntax
import mapboxgl from '!mapbox-gl';
import { useRef, useState, useEffect } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

mapboxgl.accessToken = 'pk.eyJ1IjoibGFuZGF1ZGVzaWduIiwiYSI6ImNrZ3F4dDIyeTBsMXIyenIzd2EwdnBsZTQifQ.MOBff0ku-Z960ubZPr3b6g';

function App() {
 
  // initialize map
  const mapContainer = useRef(null);
  const map = useRef(null);

  const [lng, setLng] = useState(-74.5);
  const [lat, setLat] = useState(40);
  const [zoom, setZoom] = useState(9);

  const [sliderValue, setSliderValue] = useState(0);

  const breakpoints = [6000, 5000, 4000, 3000, 2000, 1000, 600, 200, 0];
  const colors = ['#012551', '#012E65', '#01377A', '#01408D', '#024AA2', '#026EF2', '#0D79FD', '#72B1FD', '#87BCFD'];
  const shownColors = ['#012551', '#012E65', '#01377A', '#01408D', '#024AA2', '#026EF2', '#0D79FD', '#72B1FD', '#87BCFD'];

  const addWaterEffect = () => {
    map.current.setPaintProperty('depth', 'fill-color', ['match', ['get', 'min_depth'], 6000, shownColors[0], 5000, shownColors[1], 4000, shownColors[2], 3000, shownColors[3], 2000, shownColors[4], 1000, shownColors[5], 600, shownColors[6], 200, shownColors[7], 0, shownColors[8], '#000000']);
  }

  const updateShownColors = () => {
    for(const breakpoint of breakpoints) {
      if(sliderValue > breakpoint) {
        shownColors[breakpoints.indexOf(breakpoint)] = '#000000';
      }
    }
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
      <div className='thing'>
            <Slider
                style={{ width: '80%', marginTop: '40px' }}
                marks={{
                    0: `0 Feet`,
                    6000: `6000 Feet`,
                }}
                min={0}
                max={6000}
                defaultValue={0}
                tipFormatter={value => `${value}`}
                tipProps={{
                    placement: "top",
                    visible: true
                }}
                onChange={value => setSliderValue(value)}
                
            />    
      </div>     
    </div>
  );
}

export default App;
