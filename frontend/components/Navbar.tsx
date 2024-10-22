"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { fetchData } from "../lib/fetchData"; // Adjust the path as necessary

// Define types for the logo and button data
interface LogoData {
  url: string;
  alternativeText: string | null;
}

interface ButtonData {
  logoLink: string;
  title: string;
  isExternal: boolean;
}

const Navbar: React.FC = () => {
  const [logoData, setLogoData] = useState<LogoData | null>(null);
  const [buttons, setButtons] = useState<ButtonData[]>([]);

  // Fetch data from both APIs
  useEffect(() => {
    // Fetch logo data
    const logoQuery =
      "/api/logo?populate[Logo][populate][logoWeb][fields][0]=url&populate[Logo][populate][logoWeb][fields][1]=alternativeText&populate[Logo][populate][logoWeb][fields][2]=name";

    fetchData(logoQuery).then((response) => {
      if (response?.data?.Logo?.logoWeb) {
        const logoWeb = response.data.Logo.logoWeb;
        setLogoData({
          url: logoWeb.url,
          alternativeText: logoWeb.alternativeText || "Logo",
        });
      }
    });

    // Fetch navbar data
    const navbarQuery = "/api/nav-bars?populate[Button][populate]=true";

    fetchData(navbarQuery).then((response) => {
      if (response?.data) {
        const buttonsArray = response.data.flatMap(
          (item: { Button: ButtonData[] }) => item.Button
        );
        setButtons(buttonsArray);
      }
    });
  }, []);

  // If data is not yet loaded, show a placeholder or null
  if (!logoData || buttons.length === 0) {
    return null;
  }

  return (
    <div className="w-full h-[65px] bg-[#111] fixed backdrop-blur-sm z-50 px-10">
      <div className="w-full h-full flex flex-row items-center justify-between m-auto px-[10px]">
        {/* Logo */}
        <a href="/" className="h-auto w-auto flex flex-row items-center">
          <Image
            src={logoData.url} // Use strapiImage utility to construct the full image URL
            alt={logoData.alternativeText || "Logo"}
            width={100}
            height={100}
            sizes="100vw"
            className="w-full h-auto"
          />
        </a>

        {/* Navigation Links */}
        <div className="flex flex-row gap-5">
          {buttons.map((button) => (
            <a
              key={button.title}
              href={button.title}
              target={button.isExternal ? "_blank" : "_self"}
              rel={button.isExternal ? "noopener noreferrer" : ""}
              className="z-[1] bg-transparent cursor-pointer bg-black hover:bg-[#2E2E2E] rounded-xl text-white py-2 px-5"
            >
              {button.logoLink}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
