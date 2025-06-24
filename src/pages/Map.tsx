import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl';
import { useEffect, useRef } from 'react';
import { useIncidenceStore } from '../stores/incidenceStore';

mapboxgl.accessToken = 'pk.eyJ1IjoiYWRyaWFuY2hzIiwiYSI6ImNtY2F2MjlmdTA2c3EyanNnMHllanltM3UifQ.bSPAyrKK50b7Fs3rNDSmmg'; // reemplaza esto por tu token

const Map = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const incidences = useIncidenceStore(state => state.incidences);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [ -4.4214, 36.7213 ], // centro en Málaga
      zoom: 13,
    });

    incidences.forEach(inc => {
      const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
        <div class="text-sm">
          <p><strong>${inc.category}</strong> - ${inc.subcategory}</p>
          <p>${inc.notes}</p>
          <p>Cantidad: ${inc.count}</p>
          <p>${new Date(inc.createdAt).toLocaleString()}</p>
        </div>
      `);

      new mapboxgl.Marker()
        .setLngLat([inc.longitude, inc.latitude])
        .setPopup(popup)
        .addTo(map);
    });

    return () => map.remove();
  }, [incidences]);

  return <div ref={mapContainerRef} className="h-screen w-full" />;
};

export default Map;
