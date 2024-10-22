"use client"; // Ensures that the component is rendered on the client side

import React, { useEffect, useState } from "react";
import GitHubCalendar from "react-github-calendar";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css"; // Import the tooltip CSS
import "./main/styles.css"; // Import your custom styles here

const Home: React.FC = () => {
  const [githubData, setGithubData] = useState<any | null>(null);

  useEffect(() => {
    setGithubData({
      title: "GITHUB", // Title for the section
      childTitle: "EXPLORE NOW", // Subtitle
      username: "maleakhie", // GitHub username for calendar
    });
  }, []);

  if (!githubData) {
    return <div>Loading...</div>;
  }

  return (
    <section id="github-contributions">
      <h1 className="text-white font-semibold text-center text-6xl pt-[35px]">
        {githubData.title}
      </h1>

      <p className="tracking-[0.5em] text-center text-transparent font-light pb-5 bg-clip-text bg-gradient-to-r from-purple-700 to-orange-500 text-1xl">
        {githubData.childTitle}
      </p>

      <div className="container mx-auto 2xl">
        <GitHubContributions username={githubData.username} />
      </div>
    </section>
  );
};

const GitHubContributions: React.FC<{ username: string }> = ({ username }) => {
  return (
    <div className="github-calendar-container flex justify-center pt-5">
      <GitHubCalendar
        username={username}
        blockSize={10} // Adjust the block size
        blockMargin={5} // Adjust the margin between blocks
        colorScheme="dark" // Can be "light" or "dark" depending on your theme
        data-tooltip-id="github-tooltip" // Apply the tooltip
      />
      <Tooltip id="github-tooltip" place="top" />
    </div>
  );
};

export default Home;
