import { useMemo, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { ExternalLink, MapPin } from "lucide-react";
import type { RestaurantLocation } from "../data/restaurants";
import { mapsHref } from "../data/restaurants";
import { siteConfig } from "../config/siteConfig";

import iconUrl from "leaflet/dist/images/marker-icon.png";
import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";

const center: [number, number] = [43.6047, 1.4442];

function MapFitBounds({ locations }: { locations: RestaurantLocation[] }) {
  const map = useMap();
  useEffect(() => {
    if (locations.length === 0) return;
    if (locations.length === 1) {
      map.setView([locations[0].lat, locations[0].lng], 14);
      return;
    }
    const b = L.latLngBounds(
      locations.map((l) => [l.lat, l.lng] as [number, number])
    );
    map.fitBounds(b, { padding: [48, 48], maxZoom: 14 });
  }, [map, locations]);
  return null;
}

type ToulouseMapProps = {
  locations: RestaurantLocation[];
};

export function ToulouseMap({ locations }: ToulouseMapProps) {
  const defaultIcon = useMemo(
    () =>
      L.icon({
        iconUrl,
        iconRetinaUrl,
        shadowUrl,
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
      }),
    []
  );

  return (
    <div className="overflow-hidden rounded-2xl border" style={{ borderColor: "var(--b-border)", height: "420px" }}>
      <MapContainer center={center} zoom={11} scrollWheelZoom style={{ height: "100%", width: "100%" }}>
        <MapFitBounds locations={locations} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {locations.map((loc) => (
          <Marker key={loc.id} position={[loc.lat, loc.lng]} icon={defaultIcon}>
            <Popup>
              <div className="max-w-[220px] text-sm">
                <p className="font-semibold text-neutral-900">{loc.name}</p>
                <p className="text-xs text-neutral-600 mt-1">{loc.enseigne}</p>
                <p className="text-xs text-neutral-700 mt-2">
                  {loc.address}, {loc.postalCode} {loc.city}
                </p>
                <div className="mt-3 flex flex-col gap-2">
                  <a
                    href={mapsHref(loc.googleMapsQuery)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-red-600 hover:underline"
                  >
                    <MapPin size={12} /> Google Maps
                  </a>
                  <a
                    href={siteConfig.ordering.deliverooToulouse}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-teal-700 hover:underline"
                  >
                    <ExternalLink size={12} /> Deliveroo — Toulouse
                  </a>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
