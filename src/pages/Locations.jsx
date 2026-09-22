import { useEffect, useState } from "react";

import { MapPin } from "lucide-react";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

import { getLocations } from "../services/api";

function Locations({ onNavigate }) {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadLocations = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getLocations();

      const data =
        response?.locations ||
        response?.data ||
        response ||
        [];

      setLocations(
        Array.isArray(data) ? data : []
      );
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLocations();
  }, []);

  return (
    <div className="app">
      <Sidebar
        activePage="locations"
        onNavigate={onNavigate}
      />

      <main className="main">
        <Header
          title="Locations"
          subtitle="View SafeLens emergency locations."
        />

        <section className="content-section">
          <div className="section-header">
            <div>
              <h2>Emergency Locations</h2>
              <p>
                Locations reported by SafeLens.
              </p>
            </div>

            <button
              className="view-all"
              onClick={loadLocations}
            >
              Refresh
            </button>
          </div>

          {loading && (
            <div className="loading-card">
              Loading locations...
            </div>
          )}

          {error && (
            <div className="error-card">
              <strong>
                Unable to load locations
              </strong>

              <p>{error}</p>
            </div>
          )}

          {!loading &&
            !error &&
            locations.length === 0 && (
              <div className="empty-card">
                <MapPin size={35} />

                <h3>No locations found</h3>

                <p>
                  No emergency locations are
                  currently available.
                </p>
              </div>
            )}

          <div className="location-list">
            {locations.map((location) => (
              <div
                className="location-card"
                key={location._id}
              >
                <MapPin size={25} />

                <div>
                  <strong>
                    {location.address ||
                      location.name ||
                      "Emergency Location"}
                  </strong>

                  <p>
                    {location.latitude != null &&
                    location.longitude != null
                      ? `${location.latitude}, ${location.longitude}`
                      : "Coordinates unavailable"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default Locations;