import {
  LayoutDashboard,
  AlertTriangle,
  Users,
  MapPin,
  Settings,
  Shield,
} from "lucide-react";

function Sidebar({ activePage, onNavigate, emergencyCount }) {
  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
    },
    {
      id: "emergencies",
      label: "Emergencies",
      icon: AlertTriangle,
      badge: emergencyCount,
    },
    {
      id: "users",
      label: "Users",
      icon: Users,
    },
    {
      id: "locations",
      label: "Locations",
      icon: MapPin,
    },
    {
      id: "settings",
      label: "Settings",
      icon: Settings,
    },
  ];

  return (
    <aside className="sidebar">
      <div className="logo">
        <div className="logo-icon">
          <Shield size={25} />
        </div>

        <div>
          <h2>SafeLens</h2>
          <span>Response Center</span>
        </div>
      </div>

      <nav className="nav">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              className={`nav-item ${
                activePage === item.id ? "active" : ""
              }`}
              onClick={() => onNavigate(item.id)}
            >
              <Icon size={20} />

              <span>{item.label}</span>

              {item.badge > 0 && (
                <span className="badge">{item.badge}</span>
              )}
            </button>
          );
        })}
      </nav>

      <div className="sidebar-bottom">
        <div className="system-status">
          <span className="status-dot"></span>

          <div>
            <strong>System Online</strong>
            <small>All services operational</small>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;