import { useEffect, useState } from "react";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import EmergencyCard from "../components/EmergencyCard";

import { getEmergencies } from "../services/api";

function Emergencies({ onNavigate }) {
  const [emergencies, setEmergencies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadEmergencies = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getEmergencies();

      const data =
        response?.emergencies ||
        response?.data ||
        response ||
        [];

      setEmergencies(
        Array.isArray(data) ? data : []
      );
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEmergencies();
  }, []);

  return (
    <div className="app">
      <Sidebar
        activePage="emergencies"
        onNavigate={onNavigate}
        emergencyCount={emergencies.length}
      />

      <main className="main">
        <Header
          title="Emergencies"
          subtitle="Monitor all SafeLens safety events."
        />

        <section className="content-section">
          <div className="section-header">
            <div>
              <h2>Emergency Events</h2>
              <p>
                All recorded SafeLens emergency
                events.
              </p>
            </div>

            <button
              className="view-all"
              onClick={loadEmergencies}
            >
              Refresh
            </button>
          </div>

          {loading && (
            <div className="loading-card">
              Loading emergencies...
            </div>
          )}

          {error && (
            <div className="error-card">
              {error}

              <button
                className="details-btn danger-btn"
                onClick={loadEmergencies}
              >
                Retry
              </button>
            </div>
          )}

          {!loading &&
            !error &&
            emergencies.length === 0 && (
              <div className="empty-card">
                No emergency events found.
              </div>
            )}

          <div className="emergency-list">
            {emergencies.map((emergency) => (
              <EmergencyCard
                key={emergency._id}
                emergency={emergency}
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default Emergencies;