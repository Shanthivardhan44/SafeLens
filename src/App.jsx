import { useState } from "react";

import Dashboard from "./pages/Dashboard";
import Emergencies from "./pages/Emergencies";
import Users from "./pages/Users";
import Locations from "./pages/Locations";
import Settings from "./pages/Settings";

function App() {
  const [page, setPage] = useState("dashboard");

  const handleNavigate = (nextPage) => {
    setPage(nextPage);
  };

  switch (page) {
    case "emergencies":
      return (
        <Emergencies
          onNavigate={handleNavigate}
        />
      );

    case "users":
      return (
        <Users
          onNavigate={handleNavigate}
        />
      );

    case "locations":
      return (
        <Locations
          onNavigate={handleNavigate}
        />
      );

    case "settings":
      return (
        <Settings
          onNavigate={handleNavigate}
        />
      );

    default:
      return (
        <Dashboard
          onNavigate={handleNavigate}
        />
      );
  }
}

export default App;