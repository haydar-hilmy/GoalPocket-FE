import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

const dataDummy = [
  { month: "1", income: 200000, expense: 50000 },
  { month: "2", income: 100000, expense: 20000 },
  { month: "3", income: 100000, expense: 10000 },
  { month: "4", income: 100000, expense: 100000 },
  { month: "5", income: 125000, expense: 75000 },
  { month: "6", income: 150000, expense: 125000 },
  { month: "7", income: 200000, expense: 175000 },
  { month: "8", income: 80000, expense: 60000 },
  { month: "9", income: 50000, expense: 110000 },
  { month: "10", income: 125000, expense: 50000 },
  { month: "11", income: 90000, expense: 30000 },
  { month: "12", income: 120000, expense: 135000 }
];

const IncomeExpenseChart = () => {
  return (
    <div className="w-full h-96 mt-10 bg-white p-4 rounded-xl shadow">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={dataDummy}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="income" fill="#00e676" name="Pemasukan" />
          <Bar dataKey="expense" fill="#ff1744" name="Pengeluaran" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default IncomeExpenseChart;
