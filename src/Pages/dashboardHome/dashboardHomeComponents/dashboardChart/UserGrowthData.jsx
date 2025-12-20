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
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const userGrowthData = {
    labels: months,
    datasets: [
      {
        label: "User Growth",
        data: [100, 80, 75, 78, 77, 90, 85, 80, 75, 78, 76, 79],
        backgroundColor: "#6C63FF",
        borderRadius: 15,
        responsive: true,
        maintainAspectRatio: false,
      },
    ],
  };

  return (
    <div>
      <div className="bg-white p-4 rounded-md ">
        <div className="flex justify-between items-center mb-2 ">
          <h2 className="text-lg font-semibold">User Growth</h2>
          <select className="p-2 bg-gray-100 rounded text-sm outline-none border border-gray-200">
            {years.map((year) => (
              <option key={year} value={year} className="cursor-pointer">
                {year}
              </option>
            ))}
          </select>
        </div>
        <Bar data={userGrowthData} height={70} />
      </div>
    </div>
  );
};

export default UserGrowthData;
