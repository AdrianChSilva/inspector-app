import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl";
import type { LngLatLike } from "mapbox-gl";
import { useEffect, useRef, useState } from "react";
import {
  lineString,
  length,
  point,
  nearestPointOnLine,
  lineSliceAlong,
} from "@turf/turf";
import { paseoYarita } from "../constants/routesCoordinates";
import "../App.css";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

const routeLine = lineString(paseoYarita);
const totalRouteLength = length(routeLine); // en km

const TrackingMap = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const userMarkerRef = useRef<mapboxgl.Marker | null>(null);

  const [progressPercent, setProgressPercent] = useState(0);

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

      map.addSource("completed", {
        type: "geojson",
        data: lineString([]),
      });

      map.addLayer({
        id: "completed-line",
        type: "line",
        source: "completed",
        layout: { "line-cap": "round", "line-join": "round" },
        paint: {
          "line-color": "#9ca3af",
          "line-width": 6,
        },
      });
    });

    return () => map.remove();
  }, []);

  useEffect(() => {
    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        const coords: LngLatLike = [pos.coords.longitude, pos.coords.latitude];
        const heading = pos.coords.heading ?? 0;

        const el = document.createElement("div");
        el.className = "custom-marker";

        const dot = document.createElement("div");
        dot.className = "custom-marker-dot";
        el.appendChild(dot);

        const cone = document.createElement("div");
        cone.className = "custom-marker-cone";
        cone.style.transform = `translateX(-50%) rotate(${heading}deg)`;
        el.appendChild(cone);

        if (userMarkerRef.current) {
          userMarkerRef.current.setLngLat(coords);
          const markerEl = userMarkerRef.current.getElement();
          const coneEl = markerEl.querySelector(".custom-marker-cone") as HTMLElement;
          if (coneEl) coneEl.style.transform = `translateX(-50%) rotate(${heading}deg)`;
        } else {
          userMarkerRef.current = new mapboxgl.Marker({ element: el })
            .setLngLat(coords)
            .addTo(mapRef.current!);
        }

        mapRef.current?.easeTo({ center: coords, duration: 1000 });

        const pointTurf = point(coords as [number, number]);
        const snapped = nearestPointOnLine(routeLine, pointTurf);
        const distance = snapped.properties!.location as number;
        const percentage = Math.min(100, (distance / totalRouteLength) * 100);

        setProgressPercent(Math.round(percentage));

        const traveledLine = lineSliceAlong(routeLine, 0, distance);
        const completedSource = mapRef.current?.getSource("completed") as mapboxgl.GeoJSONSource;
        if (completedSource) {
          completedSource.setData(traveledLine);
        }
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
      <div className="absolute top-4 left-4 bg-white px-4 py-2 rounded-md shadow text-sm font-medium z-10">
        Ruta completada: {progressPercent}%
      </div>
      <div ref={mapContainerRef} className="h-full w-full" />
    </div>
  );
};

export default TrackingMap;
