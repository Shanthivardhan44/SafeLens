import {
  AlertTriangle,
  Activity,
  Clock,
  MapPin,
} from "lucide-react";

function EmergencyCard({ emergency, onViewDetails }) {
  const status = String(
    emergency?.status || "PENDING"
  ).toUpperCase();

  const isDanger =
    status === "DANGER" ||
    status === "ACTIVE";

  const isHelp =
    status === "BAD" ||
    status === "HELP";

  const title = isDanger
    ? "Danger Detected"
    : isHelp
    ? "Assistance Requested"
    : "Safety Event";

  const label = isDanger
    ? "DANGER"
    : isHelp
    ? "BAD / HELP"
    : status;

  const user =
    emergency?.user?.name ||
    emergency?.userName ||
    emergency?.name ||
    "Unknown User";

  const location =
    emergency?.location?.address ||
    emergency?.location?.name ||
    emergency?.address ||
    emergency?.city ||
    "Location unavailable";

  const source =
    emergency?.source ||
    emergency?.trigger ||
    emergency?.type ||
    "Safety Check-in";

  const createdAt =
    emergency?.createdAt ||
    emergency?.timestamp;

  const formattedTime = createdAt
    ? new Date(createdAt).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "--:--";

  return (
    <div
      className={`emergency-card ${
        isDanger ? "danger-card" : "warning-card"
      }`}
    >
      <div
        className={`emergency-status ${
          isDanger
            ? "danger-status"
            : "warning-status"
        }`}
      >
        {isDanger ? (
          <AlertTriangle size={22} />
        ) : (
          <Activity size={22} />
        )}
      </div>

      <div className="emergency-info">
        <div className="emergency-title">
          <h3>{title}</h3>

          <span
            className={
              isDanger
                ? "danger-label"
                : "warning-label"
            }
          >
            {label}
          </span>
        </div>

        <p>
          User: <strong>{user}</strong>
        </p>

        <div className="event-details">
          <span>
            <Clock size={15} />
            {formattedTime}
          </span>

          <span>
            <MapPin size={15} />
            {location}
          </span>

          <span>📱 {source}</span>
        </div>
      </div>

      <button
        className={`details-btn ${
          isDanger
            ? "danger-btn"
            : "warning-btn"
        }`}
        onClick={() => onViewDetails?.(emergency)}
      >
        View Details
      </button>
    </div>
  );
}

export default EmergencyCard;