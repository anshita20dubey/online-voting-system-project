import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const AdminDashboard = () => {
  const [voteCounts, setVoteCounts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVoteCounts = async () => {
      try {
        const response = await axios.get("http://localhost:7777/api/vote/vote-counts");
        setVoteCounts(response.data);
      } catch (error) {
        console.error("Error fetching vote counts:", error);
      }
    };

    fetchVoteCounts();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("admin");
    navigate("/admin/login");
  };

  const getColor = (index) => {
    switch (index) {
      case 0:
        return "bg-green-100 text-green-600 font-bold";
      case 1:
        return "bg-yellow-100 text-yellow-600 font-semibold";
      case 2:
        return "bg-blue-100 text-blue-600 font-medium";
      default:
        return "bg-red-100 text-red-600";
    }
  };

  const getSymbol = (index) => (index === 0 ? "+" : "-");

  const chartData = {
    labels: voteCounts.map((vote) => vote._id),
    datasets: [
      {
        label: "Votes",
        data: voteCounts.map((vote) => vote.count),
        borderColor: "#4caf50",
        backgroundColor: "rgba(76, 175, 80, 0.2)",
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    scales: {
      y: {
        ticks: {
          stepSize: 1,
          callback: function (value) {
            if (Number.isInteger(value)) {
              return value;
            }
          },
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      title: {
        display: true,
        text: "Vote Counts Visualization",
      },
    },
  };

  return (
    <div className="flex flex-col items-center justify-between min-h-screen bg-gray-100">
      {/* Header */}
      <h1 className="text-5xl font-bold mt-28">Admin Dashboard</h1>

      {/* Content: Table and Graph */}
      <div className="flex flex-row w-full max-w-5xl mt-6 gap-8">
        {/* Table */}
        <div className="w-1/2 bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Vote Counts</h2>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 p-2">Rank</th>
                <th className="border border-gray-300 p-2">Party</th>
                <th className="border border-gray-300 p-2">Votes</th>
              </tr>
            </thead>
            <tbody>
              {voteCounts.map((vote, index) => (
                <tr key={vote._id} className={`${getColor(index)} text-center`}>
                  <td className="border border-gray-300 p-2">
                    {index + 1} {getSymbol(index)}
                  </td>
                  <td className="border border-gray-300 p-2">{vote._id}</td>
                  <td className="border border-gray-300 p-2">{vote.count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Graph */}
        <div className="w-1/2 bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Vote Counts Graph</h2>
          <Line data={chartData} options={chartOptions} />
        </div>
      </div>

      {/* Logout Button */}
      <button
        className="mb-10 bg-red-500 text-white px-4 py-2 rounded"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default AdminDashboard;
