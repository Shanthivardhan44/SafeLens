import { Bell } from "lucide-react";

function Header({ title, subtitle }) {
  const storedUser = localStorage.getItem("user");

  let user = null;

  try {
    user = storedUser ? JSON.parse(storedUser) : null;
  } catch {
    user = null;
  }

  const name = user?.name || "Administrator";

  const initials = name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();

  return (
    <header className="header">
      <div>
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>

      <div className="header-actions">
        <button className="notification-btn">
          <Bell size={21} />
          <span></span>
        </button>

        <div className="profile">
          <div className="profile-avatar">{initials}</div>

          <div>
            <strong>{name}</strong>
            <small>Response Team</small>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;