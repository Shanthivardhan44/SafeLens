const API_BASE_URL = "http://localhost:5000";

export async function getEmergencies() {
  const response = await fetch(`${API_BASE_URL}/api/emergencies`);

  if (!response.ok) {
    throw new Error("Failed to fetch emergencies");
  }

  return response.json();
}

export async function getLocations() {
  const response = await fetch(`${API_BASE_URL}/api/locations`);

  if (!response.ok) {
    throw new Error("Failed to fetch locations");
  }

  return response.json();
}