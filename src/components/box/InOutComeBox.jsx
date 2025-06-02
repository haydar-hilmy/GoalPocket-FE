import {
  ArrowDownward,
  ArrowUpward,
  Savings,
  TrendingDown,
  TrendingUp,
} from "@mui/icons-material";

const iconMap = {
  income: <ArrowDownward className="text-green-500" fontSize="large" />,
  expense: <ArrowUpward className="text-red-500" fontSize="large" />,
  saving: <Savings className="text-blue-500" fontSize="large" />,
  avgIncome: <TrendingDown className="text-green-400" fontSize="large" />,
  avgOutcome: <TrendingUp className="text-red-500" fontSize="large" />,
};

export const InOutComeBox = ({
  title = "",
  number = "Rp 0",
  type = "income", // income, expense, saving, avgIncome, avgOutcome
}) => {
  return (
    <div className="flex flex-col items-center justify-center text-center gap-3 bg-white rounded-xl px-6 py-6 shadow-sm border hover:shadow-md transition-all duration-300 w-full max-w-xs">
      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-bg_base">
        {iconMap[type]}
      </div>
      <h2 className="text-sm text-text_dark font-medium">{title}</h2>
      <h3 className="text-2xl font-bold text-primary_text">{number}</h3>
    </div>
  );
};

export const InOutComeBoxLoading = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center gap-3 bg-white rounded-xl px-6 py-6 shadow-sm border animate-pulse w-full max-w-xs">
      <div className="w-12 h-12 rounded-full bg-gray-200" />
      <div className="w-24 h-4 bg-gray-200 rounded" />
      <div className="w-32 h-6 bg-gray-300 rounded" />
    </div>
  );
};
