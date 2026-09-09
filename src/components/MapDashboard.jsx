import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import { useAppContext } from '../context/AppContext';

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN || 'dummy_token';

const MapDashboard = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const markersRef = useRef({});
  const { destinations, selectedDestination, selectDestination } = useAppContext();
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [75.5, 26.5], // Rajasthan center
      zoom: 6.5
    });

    map.current.on('load', () => {
      setMapLoaded(true);
    });

    return () => map.current.remove();
  }, []);

  useEffect(() => {
    if (!mapLoaded) return;

    // Remove old markers that are no longer in destinations
    const currentDestIds = new Set(destinations.map(d => d.id));
    Object.keys(markersRef.current).forEach(id => {
      if (!currentDestIds.has(Number(id))) {
        markersRef.current[id].remove();
        delete markersRef.current[id];
      }
    });

    destinations.forEach(dest => {
      let marker = markersRef.current[dest.id];
      const el = document.createElement('div');
      
      const size = 12 + (dest.congestion_ratio * 16);
      el.style.width = `${size}px`;
      el.style.height = `${size}px`;
      el.style.borderRadius = '50%';
      el.style.cursor = 'pointer';
      el.style.border = '2px solid white';
      
      let color = '#10b981'; // GREEN
      if (dest.zone === 'YELLOW') color = '#f59e0b';
      else if (dest.zone === 'RED') {
        color = '#ef4444';
        el.classList.add('marker-pulse');
      }
      
      el.style.backgroundColor = color;
      el.style.boxShadow = '0 2px 4px rgba(0,0,0,0.3)';

      el.addEventListener('click', (e) => {
        e.stopPropagation();
        selectDestination(dest);
      });

      if (marker) {
        // Update existing marker DOM element
        marker.getElement().replaceWith(el);
        marker.setLngLat([dest.longitude, dest.latitude]);
      } else {
        // Create new marker
        marker = new mapboxgl.Marker(el)
          .setLngLat([dest.longitude, dest.latitude])
          .addTo(map.current);
      }
      markersRef.current[dest.id] = marker;
    });

  }, [destinations, mapLoaded, selectDestination]);

  useEffect(() => {
    if (!mapLoaded || !selectedDestination) return;

    map.current.flyTo({
      center: [selectedDestination.longitude, selectedDestination.latitude],
      zoom: 10,
      essential: true
    });

    // We could add a popup here, but for simplicity we rely on the sidebar for details.

  }, [selectedDestination, mapLoaded]);

  return (
    <div ref={mapContainer} className="w-full h-full" />
  );
};

export default MapDashboard;
