const BASE_URL = "https://loving-horse-4e6d5ec2f4.strapiapp.com"; // Default base URL

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
