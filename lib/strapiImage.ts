const BASE_URL = "http://localhost:1337"; // Update this if your Strapi instance has a different URL

export const strapiImage = (relativeUrl: string) => {
  if (!relativeUrl) return ""; // Handle case when no URL is provided
  return `${BASE_URL}${relativeUrl}`; // Construct full URL by prepending base URL
};
