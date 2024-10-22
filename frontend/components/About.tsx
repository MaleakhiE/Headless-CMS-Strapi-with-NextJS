"use client";

import React, { useEffect, useState } from "react";
import { fetchData } from "../lib/fetchData"; // Adjust the path as necessary

const About: React.FC<{}> = () => {
  const [aboutData, setAboutData] = useState<{
    title: string;
    childTitle: string;
    description: string;
  } | null>(null);

  // Fetch data from the API and set state
  useEffect(() => {
    const query = "/api/about?populate=*";

    fetchData(query).then((data) => {
      if (data && data.data.About) {
        const about = data.data.About;

        // Set state with the actual values from the API response
        setAboutData({
          title: about.title || "",
          childTitle: about.childTitle || "",
          description: about.description || "",
        });
      }
    });
  }, []);

  // If data is not yet loaded, show a placeholder or null
  if (!aboutData) {
    return null;
  }

  return (
    <section
      id="about"
      className="flex flex-col items-center justify-center h-full relative overflow-hidden pt-[35px]"
    >
      <div className="flex flex-col justify-around flex-wrap items-center max-w-[900px]">
        <h1 className="text-white font-semibold text-6xl">{aboutData.title}</h1>
        <p className="tracking-[0.5em] text-transparent font-light pb-5 bg-clip-text bg-gradient-to-r from-purple-700 to-orange-500 text-1xl">
          {aboutData.childTitle}
        </p>
        <p
          className="text-gray-300 text-justify size-1/2 text-lg"
          dangerouslySetInnerHTML={{ __html: aboutData.description }}
        ></p>
      </div>
    </section>
  );
};

export default About;
