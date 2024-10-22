const BASE_URL = "http://localhost:1337"; // Default base URL

export const fetchData = async (query: string) => {
  const apiUrl = `${BASE_URL}${query}`; // Construct the full API URL
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data; // Return the raw data
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};
