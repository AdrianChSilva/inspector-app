import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl";
import type { LngLatLike } from "mapbox-gl";
import { useEffect, useRef } from "react";
import { lineString } from "@turf/turf";
import { paseoYarita } from "../constants/routesCoordinates";
import { useIncidenceStore } from "../stores/incidenceStore";
import { useNavigate } from "react-router-dom";
import "../App.css";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

const routeLine = lineString(paseoYarita);

const TrackingMap = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const userMarkerRef = useRef<mapboxgl.Marker | null>(null);
  const incidences = useIncidenceStore((state) => state.incidences);
  const navigate = useNavigate();

  useEffect(() => {
    if (!mapContainerRef.current) return;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [-4.4323, 36.7187],
      zoom: 17,
    });

    mapRef.current = map;

    map.on("load", () => {
      map.addSource("route", {
        type: "geojson",
        data: routeLine,
      });

      map.addLayer({
        id: "route-line",
        type: "line",
        source: "route",
        layout: { "line-cap": "round", "line-join": "round" },
        paint: {
          "line-color": "#3b82f6",
          "line-width": 6,
        },
      });

      incidences.forEach((inc) => {
        const popup = new mapboxgl.Popup({ offset: 25, closeButton: true }).setHTML(`
          <div class="text-sm text-gray-800 space-y-1">
            <div class="flex justify-between items-center">
              <p class="font-semibold">${inc.category} - ${inc.subcategory}</p>
              
            </div>
            <p><span class="font-medium">Notas:</span> ${inc.notes}</p>
            <p><span class="font-medium">Cantidad:</span> ${inc.count}</p>
            <p class="text-xs text-gray-500">${new Date(inc.createdAt).toLocaleString()}</p>
          </div>
        `);

        new mapboxgl.Marker({ color: inc.notes.trim() ? '#60a5fa' : '#3b82f6' })
          .setLngLat([inc.longitude, inc.latitude])
          .setPopup(popup)
          .addTo(map);
      });
    });

    return () => map.remove();
  }, [incidences]);

  useEffect(() => {
    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        const coords: LngLatLike = [pos.coords.longitude, pos.coords.latitude];

        const el = document.createElement("div");
        el.className = "custom-marker";

        const dot = document.createElement("div");
        dot.className = "custom-marker-dot";
        el.appendChild(dot);

        if (userMarkerRef.current) {
          userMarkerRef.current.setLngLat(coords);
        } else {
          userMarkerRef.current = new mapboxgl.Marker({ element: el })
            .setLngLat(coords)
            .addTo(mapRef.current!);
        }

        mapRef.current?.easeTo({ center: coords, duration: 1000 });
      },
      (err) => {
        console.error("Error GPS:", err);
        alert("No se pudo obtener tu ubicación. Por favor, activa el GPS y permite el acceso.");
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

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

export default TrackingMap;
