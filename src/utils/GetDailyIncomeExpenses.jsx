import { CONFIG } from "../config/Config";
import { GetAllTrackings } from "../data/Api";

export const getDailyIncomeExpenses = async () => {
  const token = localStorage.getItem(CONFIG.LS_KEY);
  const trackings = await GetAllTrackings(token);

  const dailySummary = {};

  trackings.forEach((transaction) => {
    const date = transaction.createdAt.split("T")[0];

    if (!dailySummary[date]) {
      dailySummary[date] = {
        income: 0,
        expenses: 0,
      };
    }

    if (transaction.type === "income") {
      dailySummary[date].income += transaction.amount;
    } else if (transaction.type === "expense") {
      dailySummary[date].expenses += transaction.amount;
    }
  });

  const sortedDates = Object.keys(dailySummary).sort(
    (a, b) => new Date(b) - new Date(a)
  );

  const last14Days = sortedDates.slice(0, 14);

  const result = last14Days.map((date) => ({
    date,
    income: dailySummary[date].income,
    expenses: dailySummary[date].expenses,
  }));

  return result;
};
