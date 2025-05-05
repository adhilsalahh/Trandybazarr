import React from "react";
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

// Register necessary Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// Sample data for demonstration
const statisticsCardsData = [
  {
    title: "Total Sales",
    icon: "💰", // Emoji as a simple icon
    value: "$5,243",
    footer: { color: "text-green-500", value: "+12%", label: "from last month" },
  },
  {
    title: "Total Users",
    icon: "👥", // Emoji as a simple icon
    value: "1,500",
    footer: { color: "text-blue-500", value: "+8%", label: "from last month" },
  },
  {
    title: "Orders Completed",
    icon: "📝", // Emoji as a simple icon
    value: "3,200",
    footer: { color: "text-red-500", value: "-5%", label: "from last month" },
  },
  {
    title: "Revenue",
    icon: "💵", // Emoji as a simple icon
    value: "$15,400",
    footer: { color: "text-green-500", value: "+20%", label: "from last month" },
  },
];

const statisticsChartsData = [
  {
    title: "Sales Performance",
    chartData: {
      labels: ["January", "February", "March", "April", "May", "June"],
      datasets: [
        {
          label: "Sales ($)",
          data: [1200, 1900, 3000, 5000, 4000, 6000],
          borderColor: "rgb(75, 192, 192)",
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          fill: true,
        },
      ],
    },
    footer: "Last update: 2 hours ago",
  },
  {
    title: "User Growth",
    chartData: {
      labels: ["January", "February", "March", "April", "May", "June"],
      datasets: [
        {
          label: "Users",
          data: [400, 800, 1200, 1500, 1800, 2200],
          borderColor: "rgb(153, 102, 255)",
          backgroundColor: "rgba(153, 102, 255, 0.2)",
          fill: true,
        },
      ],
    },
    footer: "Last update: 1 hour ago",
  },
  {
    title: "Orders Overview",
    chartData: {
      labels: ["January", "February", "March", "April", "May", "June"],
      datasets: [
        {
          label: "Orders",
          data: [150, 200, 350, 450, 600, 700],
          borderColor: "rgb(255, 159, 64)",
          backgroundColor: "rgba(255, 159, 64, 0.2)",
          fill: true,
        },
      ],
    },
    footer: "Last update: 30 minutes ago",
  },
];

// Basic Typography component for text styling
const Typography = ({ className, children }) => (
  <span className={className}>{children}</span>
);

// Basic StatisticsCard component
const StatisticsCard = ({ title, value, icon, footer }) => (
  <div className="p-4 border rounded-lg shadow-md bg-white">
    <div className="flex items-center justify-between">
      <div className="text-2xl">{icon}</div>
      <div>
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="text-sm">{value}</p>
      </div>
    </div>
    <div className="mt-4">{footer}</div>
  </div>
);

// Basic StatisticsChart component with chart rendering
const StatisticsChart = ({ title, chartData, footer }) => (
  <div className="p-4 border rounded-lg shadow-md bg-white">
    <h3 className="text-xl font-semibold">{title}</h3>
    <div className="h-64 bg-gray-100 mt-4 mb-4">
      <Line data={chartData} />
    </div>
    <div>{footer}</div>
  </div>
);

// Dashboard Component
function Dashboard() {
  return (
    <div className="dashboard">
      <div className="dash-title title">
        <h2 className="text-4xl font-bold tracking-tight text-gray-900">DashBoard</h2>
      </div>
      <div className="mt-12">
        {/* Statistics Cards */}
        <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
          {statisticsCardsData.map(({ icon, title, footer, value }) => (
            <StatisticsCard
              key={title}
              title={title}
              value={value}
              icon={icon}
              footer={
                <Typography className="font-normal text-blue-gray-600">
                  <strong className={footer.color}>{footer.value}</strong>
                  &nbsp;{footer.label}
                </Typography>
              }
            />
          ))}
        </div>
        {/* Statistics Charts */}
        <div className="mb-6 grid grid-cols-1 gap-y-12 gap-x-6 md:grid-cols-2 xl:grid-cols-3">
          {statisticsChartsData.map(({ title, chartData, footer }) => (
            <StatisticsChart
              key={title}
              title={title}
              chartData={chartData}
              footer={
                <Typography className="flex items-center font-normal text-blue-gray-600">
                  <span className="h-4 w-4 text-blue-gray-400">🕒</span>
                  &nbsp;{footer}
                </Typography>
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
