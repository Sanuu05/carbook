import React, { useState, useRef, useEffect } from "react";
import {
  GoogleMap,
  LoadScript,
  Autocomplete,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "400px",
};

function MapComponent() {
  const [mapCenter, setMapCenter] = useState({ lat: 22.5726, lng: 88.3639 }); // Initial center (Kolkata)
  const [markers, setMarkers] = useState([{ lat: 22.5726, lng: 88.3639 }]);
  const [selected, setSelected] = useState(null);
  const autocompleteRef = useRef(null);
  const inputRef = useRef(null);
  const geocoderRef = useRef(null);
  const mapRef = useRef(null);

  const onLoad = (autocomplete) => {
    autocompleteRef.current = autocomplete;
  };

  const onPlaceChanged = () => {
    const place = autocompleteRef.current.getPlace();
    if (place.geometry) {
      const newCenter = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      };
      setMapCenter(newCenter);
      setMarkers([...markers, newCenter]);
      if (inputRef.current) {
        inputRef.current.value = place.formatted_address || place.name;
      }
    }
  };

  const onMarkerDragEnd = (event, index) => {
    const newLatLng = { lat: event.latLng.lat(), lng: event.latLng.lng() };
    const newMarkers = markers.map((marker, i) =>
      i === index ? newLatLng : marker
    );
    setMarkers(newMarkers);
    setMapCenter(newLatLng);

    // Reverse geocoding
    geocoderRef.current.geocode({ location: newLatLng }, (results, status) => {
      if (status === 'OK' && results[0]) {
        if (inputRef.current) {
          inputRef.current.value = results[0].formatted_address;
        }
      }
    });
  };
  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY} libraries={['places']}>
      <div style={{width: '450px'}}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={mapCenter}
          zoom={12}
          onLoad={(map) => {
            mapRef.current = map;
            geocoderRef.current = new window.google.maps.Geocoder();
          }}
        >
          {markers.map((location, index) => (
            <Marker
              key={index}
              position={location}
              draggable={true}
              onDragEnd={(event) => onMarkerDragEnd(event, index)}
              onClick={() => setSelected(location)}
            />
          ))}

          {selected && (
            <InfoWindow
              position={selected}
              onCloseClick={() => setSelected(null)}
            >
              <div>
                <h2>Selected Location</h2>
                <p>Latitude: {selected.lat}</p>
                <p>Longitude: {selected.lng}</p>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
        <div className="datecard" style={{marginBottom: "10px"}}>
          <p>Rent Your Self Drive Car</p>
          <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
            <input
              type="text"
              ref={inputRef}
              className="sinput"
              placeholder="Search for places"
              style={{ width: "100%", padding: "10px", outline: 'none', marginTop: '5px' }}
            />
          </Autocomplete>
        </div>
      </div>
    </LoadScript>
  );
}

export default React.memo(MapComponent);
