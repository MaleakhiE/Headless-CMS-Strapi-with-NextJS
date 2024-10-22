"use client"; // Ensures that the component is rendered on the client side

import React, { useEffect, useState } from "react";
import { fetchData } from "@/lib/fetchData"; // Adjust the path based on your project structure

const Experience: React.FC<{}> = () => {
  const [experienceData, setExperienceData] = useState<any | null>(null);

  useEffect(() => {
    // Fetch data from the API
    const query = "/api/experiences?populate=*";

    fetchData(query).then((data) => {
      if (data && data.data.length > 0) {
        // Assuming there's only one experience
        const experience = data.data[0].Experience[0];
        setExperienceData(experience);
      }
    });
  }, []);

  if (!experienceData) {
    return <div>Loading...</div>;
  }

  return (
    <section id="experience">
      {/* Title */}
      <h1 className="text-white font-semibold text-center text-6xl pt-[35px]">
        {experienceData.title}
      </h1>

      {/* Subtitle */}
      <p className="tracking-[0.5em] text-center text-transparent font-light pb-5 bg-clip-text bg-gradient-to-r from-purple-700 to-orange-500 text-1xl">
        {experienceData.childTitle}
      </p>

      <div className="container mx-auto 2xl">
        <div className="flex flex-row justify-between pt-5">
          {/* Job Title */}
          <p className="text-gray-300">
            <span className="font-semibold">{experienceData.jobTitle}</span>
          </p>

          {/* Job Date */}
          <p className="text-gray-300">{experienceData.jobDates}</p>
        </div>

        {/* Description */}
        <p
          className="text-gray-300 size-1/2 text-lg"
          style={{ textAlign: "justify" }}
          dangerouslySetInnerHTML={{ __html: experienceData.description }}
        />

        {/* Skills */}
        <div className="flex flex-row flex-wrap sm:flex-nowrap">
          {experienceData.skillTitle
            .split(", ")
            .map((skill: string, index: number) => (
              <div
                key={index}
                className="bg-transparent mt-5 mr-2 cursor-pointer rounded-3xl text-white py-2 px-5 border border-[#2E2E2E] w-max"
              >
                {skill}
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
