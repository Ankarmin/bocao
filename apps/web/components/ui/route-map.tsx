"use client";

import { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";

export type MapPoint = {
  lat: number;
  lng: number;
  label: string;
  delivered: boolean;
};

type RouteMapProps = {
  points: MapPoint[];
  center: [number, number];
};

async function fetchRoadRoute(waypoints: [number, number][]): Promise<[number, number][]> {
  if (waypoints.length < 2) return waypoints;

  const coords = waypoints.map(([lat, lng]) => `${lng},${lat}`).join(";");
  const url = `https://router.project-osrm.org/route/v1/driving/${coords}?geometries=geojson&overview=full`;

  try {
    const res = await fetch(url);
    const data = (await res.json()) as { routes?: { geometry?: { coordinates?: [number, number][] } }[] };
    const geometry = data.routes?.[0]?.geometry;

    if (geometry?.coordinates?.length) {
      return geometry.coordinates.map(([lng, lat]) => [lat, lng] as [number, number]);
    }
  } catch {
    // fall back to straight lines
  }

  return waypoints;
}

export function RouteMap({ points, center }: RouteMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const initializedRef = useRef(false);

  useEffect(() => {
    if (initializedRef.current || !containerRef.current) return;
    initializedRef.current = true;

    void import("leaflet").then(async (L) => {
      const map = L.map(containerRef.current!, {
        center,
        zoom: 13,
        zoomControl: true,
      });

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 19,
      }).addTo(map);

      mapRef.current = map;

      L.circleMarker(center, {
        radius: 8,
        fillColor: "#10b981",
        fillOpacity: 0.9,
        color: "#047857",
        weight: 2,
      })
        .addTo(map)
        .bindTooltip("Base BOCAO", { permanent: true, direction: "top", offset: [0, -8] });

      points.forEach((point) => {
        const color = point.delivered ? "#10b981" : "#f59e0b";
        const border = point.delivered ? "#047857" : "#d97706";

        L.circleMarker([point.lat, point.lng], {
          radius: point.delivered ? 5 : 7,
          fillColor: color,
          fillOpacity: 0.9,
          color: border,
          weight: 2,
        })
          .addTo(map)
          .bindTooltip(point.label, { direction: "top", offset: [0, -6] });
      });

      const waypoints: [number, number][] = [
        center,
        ...points.map((p) => [p.lat, p.lng] as [number, number]),
      ];

      const roadCoords = await fetchRoadRoute(waypoints);

      L.polyline(roadCoords as L.LatLngExpression[], {
        color: "#6366f1",
        weight: 4,
        opacity: 0.7,
      }).addTo(map);

      setTimeout(() => map.invalidateSize(), 100);
    });

    return () => {
      const map = mapRef.current;
      if (map) map.remove();
    };
  }, [center, points]);

  return <div ref={containerRef} style={{ width: "100%", height: "100%", minHeight: 420 }} />;
}
