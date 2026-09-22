import { useEffect, useState } from "react";
import {
  AlertTriangle,
  Activity,
  Shield,
  Users,
  MapPin,
  Bell,
  RefreshCw,
} from "lucide-react";

import {
  getEmergencies,
  getLocations,
} from "../services/api";

function Dashboard() {
  const [emergencies, setEmergencies] = useState([]);
  const [locations, setLocations] = useState([]);

  const [loadingEmergencies, setLoadingEmergencies] = useState(true);
  const [loadingLocations, setLoadingLocations] = useState(true);

  const [emergencyError, setEmergencyError] = useState("");
  const [locationError, setLocationError] = useState("");

  // ================================
  // LOAD EMERGENCIES
  // ================================

  const loadEmergencies = async () => {
    try {
      setLoadingEmergencies(true);
      setEmergencyError("");

      const response = await getEmergencies();

      console.log("Emergency response:", response);

      const data =
        response?.emergencies ||
        response?.data ||
        response ||
        [];

      setEmergencies(
        Array.isArray(data) ? data : []
      );
    } catch (error) {
      console.error("Emergency error:", error);

      setEmergencyError(
        error?.message || "Unable to load emergencies"
      );

      setEmergencies([]);
    } finally {
      setLoadingEmergencies(false);
    }
  };

  // ================================
  // LOAD LOCATIONS
  // ================================

  const loadLocations = async () => {
    try {
      setLoadingLocations(true);
      setLocationError("");

      const response = await getLocations();

      console.log("Location response:", response);

      const data =
        response?.locations ||
        response?.data ||
        response ||
        [];

      setLocations(
        Array.isArray(data) ? data : []
      );
    } catch (error) {
      console.error("Location error:", error);

      setLocationError(
        error?.message || "Unable to load locations"
      );

      setLocations([]);
    } finally {
      setLoadingLocations(false);
    }
  };

  useEffect(() => {
    loadEmergencies();
    loadLocations();
  }, []);

  // ================================
  // STATISTICS
  // ================================

  const activeEmergencies = emergencies.filter(
    (emergency) => {
      const status = String(
        emergency?.status || ""
      ).toUpperCase();

      return (
        status === "ACTIVE" ||
        status === "DANGER" ||
        status === "PENDING"
      );
    }
  ).length;

  const assistanceRequests = emergencies.filter(
    (emergency) => {
      const status = String(
        emergency?.status || ""
      ).toUpperCase();

      return (
        status === "BAD" ||
        status === "HELP" ||
        status === "ASSISTANCE"
      );
    }
  ).length;

  const resolvedToday = emergencies.filter(
    (emergency) => {
      const status = String(
        emergency?.status || ""
      ).toUpperCase();

      return (
        status === "SAFE" ||
        status === "RESOLVED"
      );
    }
  ).length;

  // ================================
  // REFRESH
  // ================================

  const refreshDashboard = () => {
    loadEmergencies();
    loadLocations();
  };

  return (
    <div className="safelens-dashboard">

      {/* =================================
          SIDEBAR
      ================================= */}

      <aside className="safelens-sidebar">

        <div className="brand">

          <div className="brand-icon">
            <Shield size={28} />
          </div>

          <div>
            <h2>SafeLens</h2>
            <span>Response Center</span>
          </div>

        </div>

        <div className="sidebar-divider" />

        <nav className="sidebar-nav">

          <button className="nav-item active">
            <Activity size={20} />
            <span>Dashboard</span>
          </button>

          <button className="nav-item">
            <AlertTriangle size={20} />
            <span>Emergencies</span>

            {emergencies.length > 0 && (
              <span className="nav-count">
                {emergencies.length}
              </span>
            )}
          </button>

          <button className="nav-item">
            <Users size={20} />
            <span>Users</span>
          </button>

          <button className="nav-item">
            <MapPin size={20} />
            <span>Locations</span>
          </button>

          <button className="nav-item">
            <Shield size={20} />
            <span>Settings</span>
          </button>

        </nav>

        <div className="sidebar-bottom">

          <div className="online-dot" />

          <div>
            <strong>System Online</strong>
            <span>All services operational</span>
          </div>

        </div>

      </aside>


      {/* =================================
          MAIN
      ================================= */}

      <main className="dashboard-main">

        {/* HEADER */}

        <header className="dashboard-topbar">

          <div>
            <h1>
              Emergency Response Dashboard
            </h1>

            <p>
              Monitor and respond to active SafeLens
              safety events.
            </p>
          </div>

          <div className="admin-area">

            <button className="notification-button">
              <Bell size={20} />

              <span className="notification-dot" />
            </button>

            <div className="admin-avatar">
              AD
            </div>

            <div className="admin-info">
              <strong>Administrator</strong>
              <span>Response Team</span>
            </div>

          </div>

        </header>


        {/* =================================
            STAT CARDS
        ================================= */}

        <section className="stats-grid">

          <div className="stat-card">

            <div className="stat-icon danger">
              <AlertTriangle size={25} />
            </div>

            <div className="stat-content">

              <span>
                Active Emergencies
              </span>

              <strong>
                {activeEmergencies}
              </strong>

              <small>
                Requires attention
              </small>

            </div>

          </div>


          <div className="stat-card">

            <div className="stat-icon assistance">
              <Activity size={25} />
            </div>

            <div className="stat-content">

              <span>
                Assistance Requests
              </span>

              <strong>
                {assistanceRequests}
              </strong>

              <small>
                Users requesting help
              </small>

            </div>

          </div>


          <div className="stat-card">

            <div className="stat-icon resolved">
              <Shield size={25} />
            </div>

            <div className="stat-content">

              <span>
                Resolved Today
              </span>

              <strong>
                {resolvedToday}
              </strong>

              <small>
                Safety events resolved
              </small>

            </div>

          </div>


          <div className="stat-card">

            <div className="stat-icon users">
              <Users size={25} />
            </div>

            <div className="stat-content">

              <span>
                Active Users
              </span>

              <strong>
                —
              </strong>

              <small>
                Connected users
              </small>

            </div>

          </div>

        </section>


        {/* =================================
            ACTIVE EMERGENCIES
        ================================= */}

        <section className="dashboard-section">

          <div className="section-title-row">

            <div>
              <h2>
                Active Emergencies
              </h2>

              <p>
                Current safety events requiring monitoring.
              </p>
            </div>

            <button
              className="refresh-link"
              onClick={refreshDashboard}
            >
              Refresh
            </button>

          </div>


          <div className="emergency-container">

            {loadingEmergencies ? (

              <div className="loading-state">
                Loading emergencies...
              </div>

            ) : emergencyError ? (

              <div className="emergency-error">

                <div className="error-icon">
                  <AlertTriangle size={24} />
                </div>

                <div className="error-content">

                  <div className="error-title">

                    <strong>
                      Unable to load emergencies
                    </strong>

                    <span>
                      ERROR
                    </span>

                  </div>

                  <p>
                    {emergencyError}
                  </p>

                </div>

                <button
                  className="retry-button"
                  onClick={loadEmergencies}
                >
                  Retry
                </button>

              </div>

            ) : activeEmergencies === 0 ? (

              <div className="no-emergencies">

                <Shield size={38} />

                <strong>
                  No active emergencies
                </strong>

                <span>
                  All current safety events are under control.
                </span>

              </div>

            ) : (

              emergencies.map(
                (emergency, index) => (

                  <div
                    className="emergency-row"
                    key={
                      emergency?._id ||
                      emergency?.id ||
                      index
                    }
                  >

                    <div className="emergency-row-icon">
                      <AlertTriangle size={22} />
                    </div>

                    <div>
                      <strong>
                        {String(
                          emergency?.status ||
                          "EMERGENCY"
                        ).toUpperCase()}
                      </strong>

                      <p>
                        {emergency?.message ||
                          emergency?.description ||
                          "Emergency event detected"}
                      </p>
                    </div>

                  </div>

                )
              )

            )}

          </div>

        </section>


        {/* =================================
            BOTTOM GRID
        ================================= */}

        <div className="bottom-grid">


          {/* SYSTEM ACTIVITY */}

          <section className="dashboard-section activity-section">

            <div className="section-title">

              <h2>
                System Activity
              </h2>

              <p>
                Latest SafeLens events
              </p>

            </div>


            <div className="activity-list">

              <div className="activity-item">

                <span className="activity-dot red" />

                <div>
                  <strong>
                    Emergency event received
                  </strong>

                  <p>
                    SafeLens emergency event detected
                  </p>
                </div>

                <time>
                  Just now
                </time>

              </div>


              <div className="activity-item">

                <span className="activity-dot orange" />

                <div>
                  <strong>
                    Assistance requested
                  </strong>

                  <p>
                    User selected BAD / NEED HELP
                  </p>
                </div>

                <time>
                  —
                </time>

              </div>


              <div className="activity-item">

                <span className="activity-dot green" />

                <div>
                  <strong>
                    Safety event resolved
                  </strong>

                  <p>
                    User confirmed SAFE
                  </p>
                </div>

                <time>
                  —
                </time>

              </div>

            </div>

          </section>


          {/* LOCATIONS */}

          <section className="dashboard-section">

            <div className="section-title">

              <h2>
                Emergency Locations
              </h2>

              <p>
                Current active event locations
              </p>

            </div>


            <div className="map-preview">

              {loadingLocations ? (

                <div className="map-message">
                  Loading locations...
                </div>

              ) : locationError ? (

                <div className="map-message">
                  <MapPin size={38} />
                  <strong>
                    Unable to load locations
                  </strong>
                  <span>
                    {locationError}
                  </span>
                </div>

              ) : locations.length === 0 ? (

                <div className="map-message">

                  <MapPin size={42} />

                  <strong>
                    Map Integration
                  </strong>

                  <span>
                    Live emergency locations will appear here.
                  </span>

                </div>

              ) : (

                <div className="location-list">

                  {locations.map(
                    (location, index) => (

                      <div
                        className="location-item"
                        key={
                          location?._id ||
                          location?.id ||
                          index
                        }
                      >

                        <MapPin size={20} />

                        <div>

                          <strong>
                            {location?.city ||
                              location?.name ||
                              "Emergency Location"}
                          </strong>

                          <span>
                            {location?.latitude &&
                            location?.longitude
                              ? `${location.latitude}, ${location.longitude}`
                              : "Coordinates available"}
                          </span>

                        </div>

                      </div>

                    )
                  )}

                </div>

              )}

            </div>

          </section>

        </div>

      </main>

    </div>
  );
}

export default Dashboard;