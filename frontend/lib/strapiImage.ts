const BASE_URL = "https://loving-horse-4e6d5ec2f4.strapiapp.com"; // Update this if your Strapi instance has a different URL

export const strapiImage = (relativeUrl: string) => {
  if (!relativeUrl) return ""; // Handle case when no URL is provided
  return `${BASE_URL}${relativeUrl}`; // Construct full URL by prepending base URL
};
