function ActivityList({ emergencies = [] }) {
  if (!emergencies.length) {
    return (
      <div className="empty-activity">
        No recent emergency activity.
      </div>
    );
  }

  return (
    <div className="activity-list">
      {emergencies.slice(0, 5).map((event, index) => {
        const status = String(
          event?.status || "PENDING"
        ).toUpperCase();

        const isDanger =
          status === "DANGER" ||
          status === "ACTIVE";

        const user =
          event?.user?.name ||
          event?.userName ||
          event?.name ||
          "Unknown User";

        const createdAt =
          event?.createdAt ||
          event?.timestamp;

        const time = createdAt
          ? new Date(createdAt).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })
          : "";

        return (
          <div className="activity-item" key={event?._id || index}>
            <span
              className={`activity-dot ${
                isDanger
                  ? "danger-dot"
                  : "warning-dot"
              }`}
            ></span>

            <div>
              <strong>
                {isDanger
                  ? "Emergency event received"
                  : "Assistance requested"}
              </strong>

              <small>
                {user} selected {status}
              </small>
            </div>

            <time>{time}</time>
          </div>
        );
      })}
    </div>
  );
}

export default ActivityList;