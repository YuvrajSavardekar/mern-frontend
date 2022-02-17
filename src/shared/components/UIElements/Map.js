import React, { useState } from "react";
import ReactMapGL, { Marker } from "react-map-gl";
import LocationOnIcon from '@mui/icons-material/LocationOn';

import "mapbox-gl/dist/mapbox-gl.js";
//  import 'mapbox-gl/dist/mapbox-gl.css';

import "./Map.css";

const Map = (props) => {
  const [viewPort, setViewPort] = useState({
    latitude: 40.7484405,
    longitude: -73.9878584,
    zoom: 20,
    width: "100vw",
    height: "100vh",
  });

  const { lat, lng } = props.center;
  return (
    <React.Fragment>
      <ReactMapGL
        initialViewState={{
          latitude: lat,
          longitude: lng,
          zoom: props.zoom,
        }}
        mapboxAccessToken={
          "pk.eyJ1IjoieXV2cmFqcHMiLCJhIjoiY2t6OGdoazI5MDV1ejJ2bXFhNnY2bnF1MCJ9.KDX92uVzseLOxmiGP5YqhQ"
        }
        mapStyle="mapbox://styles/mapbox/streets-v11"
        // onMove={setViewPort}
        // initialViewState={{ zoom: props.zoom}}
      >
        <Marker latitude={lat} longitude={lng}>
          {/* <button className="marker-btn"> */}
            {/* <img
              src="https://www.iconpacks.net/icons/1/free-pin-icon-48-thumb.png"
              alt="location"
            /> */}
          {/* <LocationOnIcon sx={{ width: '20px' }}/> */}
          {/* </button> */}
        </Marker>
      </ReactMapGL>
    </React.Fragment>
  );
};

export default Map;
//  40.7484405,
// lng: -73.9878584
// pk.eyJ1IjoieXV2cmFqcHMiLCJhIjoiY2t6OGdoazI5MDV1ejJ2bXFhNnY2bnF1MCJ9.KDX92uVzseLOxmiGP5YqhQ

// pk.eyJ1IjoieXV2cmFqcHMiLCJhIjoiY2t6OGd0bm5qMWlvZDJvcnhobDZibDM5MiJ9.CWo6Uo97rz2qKbdGw4_ZJQ

// mapbox://styles/mapbox/satellite-v9
// mapbox://styles/mapbox/streets-v11
// mapbox://styles/mapbox/dark-v10
// mapbox://styles/mapbox/light-v10
// mapbox://styles/mapbox/satellite-streets-v11

// initialViewState={{
//   longitude: 40.7484405,
//   latitude: -73.9878584,
//   zoom: 14,
//   width: '100vw',
//   height: '100vh'
// }}
