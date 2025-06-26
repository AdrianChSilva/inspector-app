import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl";
import { useEffect, useRef } from "react";
import { useIncidenceStore } from "../stores/incidenceStore";
import { useNavigate } from "react-router-dom";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

const Map = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const incidences = useIncidenceStore((state) => state.incidences);
  const navigate = useNavigate();

  useEffect(() => {
    if (!mapContainerRef.current) return;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [-4.4214, 36.7213], // centro en Málaga
      zoom: 13,
    });

    incidences.forEach((inc) => {
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

  return (
    <div className="relative h-screen w-full">
      <button
        onClick={() => navigate("/inspection")}
        className="absolute top-4 left-4 z-10 w-12 h-12 flex items-center justify-center bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors"
        aria-label="Volver"
      >
        <span className="text-2xl font-bold text-gray-700">&larr;</span>
      </button>
      <div ref={mapContainerRef} className="h-full w-full" />
    </div>
  );
};

export default Map;
