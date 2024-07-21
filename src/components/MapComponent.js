import React, { useState, useRef, useEffect } from "react";
import {
  GoogleMap,
  LoadScript,
  Autocomplete,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { MdMyLocation, MdOutlineMap } from "react-icons/md";
import { Button, Container } from "react-bootstrap";
import { BsDot } from "react-icons/bs";
import { NavLink, useNavigate } from "react-router-dom";

const containerStyle = {
  width: "100%",
  height: "400px",
};

function MapComponent({ setLocation }) {
  const [mapCenter, setMapCenter] = useState({ lat: 22.5726, lng: 88.3639 }); // Initial center (Kolkata)
  const [markers, setMarkers] = useState([{ lat: 22.5726, lng: 88.3639 }]);
  const [selected, setSelected] = useState(null);
  const autocompleteRef = useRef(null);
  const inputRef = useRef(null);
  const geocoderRef = useRef(null);
  const mapRef = useRef(null);
  const navigation = useNavigate()

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
      setMarkers([newCenter]);
      if (inputRef.current) {
        inputRef.current.value = place.formatted_address || place.name;
        setLocation({
          ...newCenter,
          address: place.formatted_address || place.name,
        });
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
      if (status === "OK" && results[0]) {
        if (inputRef.current) {
          inputRef.current.value = results[0].formatted_address;
          setLocation({ ...newMarkers, address: results[0].formatted_address });
        }
      }
    });
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newCenter = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setMapCenter(newCenter);
          setMarkers([newCenter]);
          geocoderRef.current.geocode(
            { location: newCenter },
            (results, status) => {
              if (status === "OK" && results[0]) {
                if (inputRef.current) {
                  inputRef.current.value = results[0].formatted_address;
                  setLocation({
                    ...newCenter,
                    address: results[0].formatted_address,
                  });
                }
              }
            }
          );
        },
        () => {
          alert("Error getting current location");
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  return (
    <Container>
      <LoadScript
        googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
        libraries={["places"]}
      >
        <div>
          <div style={{ width: "", flexDirection: "row", display: "flex" }}>
            <div
              style={{
                flex: 1,
              }}
            >
              {/* <BsDot /> */}

              <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
                <input
                  type="text"
                  ref={inputRef}
                  className="mapInput"
                  placeholder="Search for places"
                  style={{
                    width: "100%",
                    padding: "10px",
                    outline: "none",
                    marginTop: "5px",
                  }}
                />
              </Autocomplete>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                cursor: "pointer",
                margin: 20,
              }}
              onClick={getCurrentLocation}
            >
              <MdMyLocation size={22} />
              <p style={{ margin: 5 }} className="d-none d-sm-inline">
                Current Location
              </p>
            </div>
            {/* <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                cursor: "pointer",
                margin:5
              }}
            >
              <MdOutlineMap size={22} />
              <p style={{ margin: 5 }}>Select Location on Map</p>
            </div> */}
          </div>
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
          <div
            className="datecard"
            style={{
              marginBottom: "10px",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
              display: "flex",
            }}
          >
            <button className="locationButton" style={{ maxWidth: 400 }} onClick={()=>navigation('/')}>
              CONFIRM PICKUP LOCATION
            </button>
          </div>
        </div>
      </LoadScript>
    </Container>
  );
}

export default React.memo(MapComponent);
