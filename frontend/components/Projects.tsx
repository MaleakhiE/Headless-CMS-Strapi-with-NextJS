"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { fetchData } from "../lib/fetchData"; // Adjust the path as necessary

const Projects: React.FC<{}> = () => {
  const [projects, setProjects] = useState<
    Array<{
      id: number;
      title: string;
      description: string;
      link: { href: string; isExternal: boolean };
      imageUrl: string;
    }>
  >([]);

  useEffect(() => {
    const query = "/api/projects?populate=Project.imageURL"; // Query to fetch all necessary data

    fetchData(query).then((data) => {
      if (data && data.data) {
        const projectsData = data.data.map((project: any) => {
          const projectDetails = project.Project[0]; // Extract the first project details

          // Extract image URL and ensure to use 'thumbnail' if available
          const imageURL = projectDetails?.imageURL?.formats?.thumbnail?.url
            ? projectDetails.imageURL.formats.thumbnail.url
            : projectDetails?.imageURL?.url || "";

          return {
            id: project.id,
            title: projectDetails?.title || "",
            description: projectDetails?.description || "",
            link: {
              href: projectDetails?.link || "#",
              isExternal: projectDetails?.isExternal || false,
            },
            imageUrl: imageURL, // Use the thumbnail version or the full image URL
          };
        });
        setProjects(projectsData);
      }
    });
  }, []);

  return (
    <section id="projects">
      <h1 className="text-white font-semibold text-center text-6xl pt-[35px]">
        PROJECTS
      </h1>
      <p className="tracking-[0.5em] text-center text-transparent font-light pb-5 bg-clip-text bg-gradient-to-r from-purple-700 to-orange-500 text-1xl">
        EXPLORE NOW
      </p>
      <div className="container mx-auto 2xl">
        {projects.length > 0 ? (
          <div className="flex flex-wrap">
            {projects.map((project) => (
              <div key={project.id} className="w-full md:w-1/2 lg:w-1/4 p-4">
                <a
                  href={project.link.href}
                  target={project.link.isExternal ? "_blank" : "_self"}
                  rel="noopener noreferrer"
                  className="z-[1]"
                >
                  <div className="flex flex-col items-center">
                    <div className="p-3 text-center">
                      {project.imageUrl ? (
                        <Image
                          src={project.imageUrl}
                          alt={project.title}
                          width={150}
                          height={150}
                          loading="lazy"
                        />
                      ) : (
                        <p>No image available</p>
                      )}
                      <p className="text-white font-semibold text-xl">
                        {project.title}
                      </p>
                      <p className="text-gray-500 text-[10px]">
                        {project.description}
                      </p>
                      <div
                        className="text-md flex justify-center"
                        style={{ marginTop: "15px" }}
                      >
                        <button
                          onClick={() => window.open(project.link.href)}
                          className="z-[1] hover:bg-white rounded-3xl text-white font-semibold hover:text-black py-2 px-6 border-[0.1px] border-white hover:border-transparent" // Adjusted padding and font size
                        >
                          See Project
                        </button>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-white text-center">No projects found</p>
        )}
      </div>
    </section>
  );
};

export default Projects;
