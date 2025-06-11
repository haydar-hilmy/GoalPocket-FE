import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Line,
  LineChart,
} from "recharts";
import { GetAllTrackings } from "../../data/Api";
import dayjs from "dayjs";
import groupBy from "lodash.groupby";

const IncomeExpenseChart = ({ token }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const trackings = await GetAllTrackings(token);

        const sevenDaysAgo = dayjs().subtract(6, "day").startOf("day");
        const filteredData = trackings.filter((t) =>
          dayjs(t.createdAt).isAfter(sevenDaysAgo)
        );

        const grouped = groupBy(filteredData, (t) =>
          dayjs(t.createdAt).format("YYYY-MM-DD")
        );

        const days = [...Array(7).keys()].map((i) =>
          dayjs()
            .subtract(6 - i, "day")
            .format("YYYY-MM-DD")
        );

        const result = days.map((date) => {
          const items = grouped[date] || [];
          const income = items
            .filter((i) => i.type === "income")
            .reduce((sum, i) => sum + i.amount, 0);
          const expense = items
            .filter((i) => i.type === "expense")
            .reduce((sum, i) => sum + i.amount, 0);

          return {
            date,
            income,
            expense,
            notes: items,
          };
        });

        setChartData(result);
      } catch (error) {
        console.error("Error loading chart data:", error);
      }
    };

    loadData();
  }, [token]);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const { notes } = chartData.find((d) => d.date === label) || {};
      return (
        <div className="bg-white p-2 border rounded shadow text-sm w-full">
          <p className="font-bold">{label}</p>
          {notes?.map((item, idx) => (
            <div key={idx}>
              <span className="font-medium">{item.type == "expense" ? "Pengeluaran" : item.type == "income" ? "Pemasukan" : ""}: </span> {item.amount} -{" "}
              {item.notes}
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full overflow-x-auto">
      <div className="min-w-[800px]">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData} margin={{ left: 30 }}>
            <XAxis dataKey="date" />
            <YAxis tick={{ angle: -45 }} />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Line
              type="monotone"
              dataKey="income"
              stroke="#4caf50"
              name="Pemasukan"
            />
            <Line
              type="monotone"
              dataKey="expense"
              stroke="#f44336"
              name="Pengeluaran"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default IncomeExpenseChart;
