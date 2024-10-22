"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { fetchData } from "../lib/fetchData"; // Adjust the path as necessary

const Banner: React.FC<{}> = () => {
  const [bannerData, setBannerData] = useState<{
    title: string;
    childTitle: string;
    description: string;
    buttonName: string;
    link: string;
    isExternal: boolean;
  } | null>(null);

  const [photoData, setPhotoData] = useState<{
    url: string;
    alternativeText: string;
  } | null>(null);

  useEffect(() => {
    // Fetch Banner Data
    const bannerQuery = "/api/banner?populate=*";
    fetchData(bannerQuery).then((data) => {
      if (data && data.data.Banner) {
        const banner = data.data.Banner;
        setBannerData({
          title: banner.title || "",
          childTitle: banner.childTitle || "",
          description: banner.description || "",
          buttonName: banner.buttonName || "Contact Me",
          link: banner.link || "",
          isExternal: banner.isExternal || false,
        });
      }
    });

    // Fetch Photo Data
    const photoQuery =
      "/api/photo?populate[Photo][populate][imageUrl][fields][0]=url&populate[Photo][populate][imageUrl][fields][1]=alternativeText&populate[Photo][populate][imageUrl][fields][2]=name";
    fetchData(photoQuery).then((data) => {
      if (data && data.data.Photo) {
        const imageUrl = data.data.Photo.imageUrl;
        setPhotoData({
          url: imageUrl.url,
          alternativeText: imageUrl.alternativeText || "Profile Photo",
        });
      }
    });
  }, []);

  if (!bannerData || !photoData) {
    return null; // Show nothing if data is still loading
  }

  return (
    <div className="flex flex-row items-center justify-center px-20 mt-[150px] z-[20]">
      <div className="flex flex-col justify-center text-center">
        {/* Profile Photo */}
        <div className="justify-center flex">
          <img
            src={photoData.url} // Directly use the Strapi URL
            height={300}
            width={300}
            alt={photoData.alternativeText}
            className="rounded-full"
          />
        </div>

        {/* Banner Titles */}
        <div className="flex flex-col gap-6 mt-6 cursor-pointer animate-bounce tracking-tighter text-7xl text-transparent font-semibold bg-clip-text bg-gradient-to-r from-purple-500 to-gray-400 max-w-[600px] w-auto h-auto">
          {bannerData.title}
        </div>

        {/* Child Title */}
        <p className="text-2xl font-medium tracking-tighter text-gray-300 max-w-[600px]">
          {bannerData.childTitle}
        </p>

        {/* Description */}
        <p
          className="text-md text-gray-200 my-5 max-w-[600px]"
          style={{ textAlign: "justify" }}
        >
          {bannerData.description}
        </p>

        {/* Contact Button */}
        <div className="text-md flex justify-center">
          <button
            onClick={() =>
              window.open(
                bannerData.link,
                bannerData.isExternal ? "_blank" : "_self"
              )
            }
            className="z-[1] hover:bg-white rounded-3xl text-white font-semibold hover:text-black py-3 px-10 border-[0.1px] border-white hover:border-transparent"
          >
            {bannerData.buttonName}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
