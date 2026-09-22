import { MapPin } from "lucide-react";

function MapPreview({ locations = [] }) {
  return (
    <div className="map-preview">
      <div className="map-header">
        <h2>Emergency Locations</h2>
        <p>Current active event locations</p>
      </div>

      <div className="map-placeholder">
        <MapPin size={42} />

        <h3>Emergency Locations</h3>

        {locations.length > 0 ? (
          <p>
            {locations.length} location
            {locations.length !== 1 ? "s" : ""} available.
          </p>
        ) : (
          <p>No active emergency locations.</p>
        )}
      </div>
    </div>
  );
}

export default MapPreview;