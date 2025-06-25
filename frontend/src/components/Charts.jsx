import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Line, Bar, Doughnut } from "react-chartjs-2";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Charts = () => {
  // Daily Active Users Line Chart
  const dailyUsersData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Daily Active Users",
        data: [1200, 1350, 1100, 1450, 1600, 1800, 1700],
        borderColor: "rgb(99, 102, 241)",
        backgroundColor: "rgba(99, 102, 241, 0.1)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const dailyUsersOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "white",
        },
      },
      title: {
        display: true,
        text: "Weekly Active Users Trend",
        color: "white",
        font: {
          size: 16,
          weight: "bold",
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
        ticks: {
          color: "white",
        },
      },
      x: {
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
        ticks: {
          color: "white",
        },
      },
    },
  };

  // Material Downloads Bar Chart
  const downloadsData = {
    labels: [
      "Syllabus",
      "PYQs",
      "Notes",
      "Lab Manuals",
      "Projects",
      "Tutorials",
    ],
    datasets: [
      {
        label: "Downloads This Week",
        data: [450, 320, 280, 190, 150, 220],
        backgroundColor: [
          "rgba(99, 102, 241, 0.8)",
          "rgba(168, 85, 247, 0.8)",
          "rgba(236, 72, 153, 0.8)",
          "rgba(34, 197, 94, 0.8)",
          "rgba(251, 146, 60, 0.8)",
          "rgba(59, 130, 246, 0.8)",
        ],
        borderColor: [
          "rgb(99, 102, 241)",
          "rgb(168, 85, 247)",
          "rgb(236, 72, 153)",
          "rgb(34, 197, 94)",
          "rgb(251, 146, 60)",
          "rgb(59, 130, 246)",
        ],
        borderWidth: 2,
      },
    ],
  };

  const downloadsOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "white",
        },
      },
      title: {
        display: true,
        text: "Material Downloads by Category",
        color: "white",
        font: {
          size: 16,
          weight: "bold",
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
        ticks: {
          color: "white",
        },
      },
      x: {
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
        ticks: {
          color: "white",
        },
      },
    },
  };

  // User Distribution Doughnut Chart
  const userDistributionData = {
    labels: ["1st Year", "2nd Year", "3rd Year", "4th Year"],
    datasets: [
      {
        data: [35, 28, 22, 15],
        backgroundColor: [
          "rgba(99, 102, 241, 0.8)",
          "rgba(168, 85, 247, 0.8)",
          "rgba(236, 72, 153, 0.8)",
          "rgba(34, 197, 94, 0.8)",
        ],
        borderColor: [
          "rgb(99, 102, 241)",
          "rgb(168, 85, 247)",
          "rgb(236, 72, 153)",
          "rgb(34, 197, 94)",
        ],
        borderWidth: 2,
      },
    ],
  };

  const userDistributionOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "white",
          padding: 20,
        },
      },
      title: {
        display: true,
        text: "User Distribution by Year",
        color: "white",
        font: {
          size: 16,
          weight: "bold",
        },
      },
    },
  };

  return (
    <section className="py-16 bg-gradient-to-b from-gray-900 to-black">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">
            Analytics Dashboard
          </h2>
          <p className="text-gray-400 text-lg">
            Real-time insights and performance metrics
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Daily Active Users Chart */}
          <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10 h-80">
            <Line data={dailyUsersData} options={dailyUsersOptions} />
          </div>

          {/* Material Downloads Chart */}
          <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10 h-80">
            <Bar data={downloadsData} options={downloadsOptions} />
          </div>
        </div>

        {/* User Distribution Chart */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10 h-80">
            <Doughnut
              data={userDistributionData}
              options={userDistributionOptions}
            />
          </div>
        </div>

        {/* Quick Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
          <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 backdrop-blur-lg rounded-xl p-6 border border-blue-500/20 text-center">
            <div className="text-3xl font-bold text-blue-400 mb-2">1,450</div>
            <div className="text-gray-400 text-sm">Avg Daily Users</div>
          </div>
          <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-lg rounded-xl p-6 border border-purple-500/20 text-center">
            <div className="text-3xl font-bold text-purple-400 mb-2">1,610</div>
            <div className="text-gray-400 text-sm">Total Downloads</div>
          </div>
          <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 backdrop-blur-lg rounded-xl p-6 border border-green-500/20 text-center">
            <div className="text-3xl font-bold text-green-400 mb-2">85%</div>
            <div className="text-gray-400 text-sm">User Retention</div>
          </div>
          <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 backdrop-blur-lg rounded-xl p-6 border border-orange-500/20 text-center">
            <div className="text-3xl font-bold text-orange-400 mb-2">2.3s</div>
            <div className="text-gray-400 text-sm">Avg Load Time</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Charts;
