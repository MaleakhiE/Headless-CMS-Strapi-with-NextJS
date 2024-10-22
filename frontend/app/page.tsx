"use client";

import React, { useEffect, useState } from "react";
import About from "@/components/About";
import Banner from "@/components/Banner";
import Experience from "@/components/Experience";
import Footer from "@/components/Footer";
import Projects from "@/components/Projects";
import { fetchData } from "@/lib/fetchData"; // Adjust path as necessary
import GitHubCalendar from "@/components/GithubCalender";

// Create a mapping between menu and components
const layoutComponentMap: { [key: string]: React.FC } = {
  "<Banner />": Banner,
  "<About />": About,
  "<Experience />": Experience,
  "<Projects />": Projects,
  "<Footer />": Footer,
  "<GitHubCalendar />": GitHubCalendar,
};

interface LayoutItem {
  menu: string;
  Position: number;
}

export default function Home() {
  const [layoutData, setLayoutData] = useState<string[]>([]); // Updated to store string[] (menu strings)

  useEffect(() => {
    // Fetch the layout data from the API
    const query = "/api/layouts?populate=*";

    fetchData(query).then((response) => {
      if (response?.data) {
        // Flatten and ensure Layout is an array of objects with 'menu' and 'Position'
        const layoutArray = response.data
          .flatMap((item: { Layout: LayoutItem[] }) => item.Layout) // Type annotation for item
          .sort((a: LayoutItem, b: LayoutItem) => a.Position - b.Position) // Type annotation for a and b
          .map((item: LayoutItem) => item.menu); // Extract just the 'menu' property

        setLayoutData(layoutArray);
      }
    });
  }, []);

  return (
    <main className="h-full w-full bg-[url('/LooperGroup2.png')] bg-no-repeat">
      <div className="flex flex-col gap-20">
        {/* Dynamically render components based on the layoutData */}
        {layoutData.map((menu, index) => {
          const Component = layoutComponentMap[menu];
          return Component ? <Component key={index} /> : null;
        })}
      </div>
    </main>
  );
}
