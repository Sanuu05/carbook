import React, { useEffect } from 'react';
import { useMap } from 'react-leaflet';

const RecenterAutomatically = ({ lat, lon }) => {
  const map = useMap();

  useEffect(() => {
    if (lat && lon) {
      map.setView([lat, lon], 13);
    }
  }, [lat, lon, map]);

  return null;
};

export default RecenterAutomatically;
