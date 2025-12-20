import { useState } from "react";
import { Bar } from "react-chartjs-2";
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
} from "chart.js";
import { useGetUserGrowthQuery } from "../../../../Redux/dashboardApis";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const UserGrowthData = () => {
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear);

  const years = Array.from(
    { length: currentYear - 2024 + 1 },
    (_, i) => 2024 + i
  ).reverse();

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const { data } = useGetUserGrowthQuery({ year: selectedYear });

  const chartData = {
    labels: months,
    datasets: [
      {
        label: "User Growth",
        data: months.map(
          (month) =>
            data?.data.find((item) => item.month === month)?.totalUser || 0
        ),
        backgroundColor: "#6C63FF",
        borderRadius: 15,
        responsive: true,
        maintainAspectRatio: false,
      },
    ],
  };

  return (
    <div>
      <div className="bg-white p-4 rounded-md">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-semibold">User Growth</h2>
          <select
            className="p-2 bg-gray-100 rounded text-sm outline-none border border-gray-200"
            value={selectedYear}
            onChange={(e) => setSelectedYear(Number(e.target.value))}
          >
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
        <Bar data={chartData} height={70} />
      </div>
    </div>
  );
};

export default UserGrowthData;
