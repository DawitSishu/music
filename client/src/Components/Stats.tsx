import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { Bar, Pie } from "react-chartjs-2";
import { getStats } from "../services/ApiHandler";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register the required components with Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const StatsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  margin-top: 2rem;
  padding: 2rem;
  background-color: #222;
  color: #efcfa9;
  border-radius: 10px;
  box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.5);
`;

const TitleStyled = styled.h2`
  text-align: center;
  color: #efcfa9;
  width: 100%;
`;

const ChartContainer = styled.div`
  width: 250px;   /* Set a smaller width */
  height: 200px;  /* Set a smaller height */
  margin: 1rem;
`;

const Stats: React.FC<{ dependency: Boolean }> = ({ dependency }) => {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await getStats();
        setStats(response.data);
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    fetchStats();
  }, [dependency]);

  if (!stats) {
    return <p>Loading stats...</p>;
  }

  const genreData = {
    labels: stats.songsByGenre.map((item: any) => item._id || "Unknown"),
    datasets: [
      {
        label: "Songs by Genre",
        data: stats.songsByGenre.map((item: any) => item.count),
        backgroundColor: ["#efcfa9", "#e3b782", "#a3b9b2", "#d8b5a5", "#b5a39b", "#a5d8d1"],
      },
    ],
  };

  const artistData = {
    labels: stats.songsByArtist.map((item: any) => item._id || "Unknown"),
    datasets: [
      {
        label: "Songs by Artist",
        data: stats.songsByArtist.map((item: any) => item.count),
        backgroundColor: ["#e3b782", "#efcfa9", "#a3b9b2", "#d8b5a5", "#b5a39b", "#a5d8d1"],
      },
    ],
  };

  const albumData = {
    labels: stats.songsByAlbum.map((item: any) => item._id || "Unknown"),
    datasets: [
      {
        label: "Songs by Album",
        data: stats.songsByAlbum.map((item: any) => item.count),
        backgroundColor: ["#a3b9b2", "#d8b5a5", "#b5a39b", "#efcfa9", "#e3b782", "#a5d8d1"],
      },
    ],
  };

  const totalData = {
    labels: ["Total Songs", "Total Artists", "Total Albums", "Total Genres"],
    datasets: [
      {
        label: "Overall Totals",
        data: [stats.totalSongs, stats.totalArtists, stats.totalAlbums, stats.totalGenres],
        backgroundColor: ["#efcfa9", "#e3b782", "#a3b9b2", "#d8b5a5"],
      },
    ],
  };

  return (
    <StatsContainer>
      <TitleStyled>Music Stats</TitleStyled>
    
      <ChartContainer>
        <Pie data={totalData} options={{ responsive: true, maintainAspectRatio: false }} />
      </ChartContainer>

      <ChartContainer>
        <Pie data={genreData} options={{ responsive: true, maintainAspectRatio: false }} />
      </ChartContainer>

      <ChartContainer>
        <Pie data={artistData} options={{ responsive: true, maintainAspectRatio: false }} />
      </ChartContainer>

      <ChartContainer>
        <Bar data={albumData} options={{ responsive: true, maintainAspectRatio: false }} />
      </ChartContainer>
    </StatsContainer>
  );
};

export default Stats;
