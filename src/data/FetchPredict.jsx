import { getDailyIncomeExpenses } from "../utils/GetDailyIncomeExpenses";
import { CONFIG } from "../config/Config";
import dayjs from "dayjs";

export const FetchPredictAPI = async (summary) => {
  const token = localStorage.getItem(CONFIG.LS_KEY);
  const today = dayjs();
  const days = 14;
  // Ambil dailyIncomeExpenses
  let daily = await getDailyIncomeExpenses(); // return [{ date, income, expenses }, ... 14 days kebelakang]

  // Normalisasi ke format tanggal & buat mapping per hari
  const incomeExpenseMap = {};
  daily.forEach((item) => {
    const date = dayjs(item.date).format("YYYY-MM-DD");
    incomeExpenseMap[date] = {
      income: item.income,
      expenses: item.expenses,
    };
  });

  console.log("incomeExpenseMap: ", incomeExpenseMap);


  // [{date: '2025-05-29', income: 0, expenses: 0}, {date: '2025-05-30', income: 0, expenses: 0}, ...]
  // data 14 hari kebelakang dari sekarang
  const filledDaily = [];

  for (let i = 0; i < days; i++) {
    const date = today.subtract(i, "day").format("YYYY-MM-DD");

    const income = incomeExpenseMap[date]?.income ?? summary?.avgIncome ?? 0;
    const expenses =
      incomeExpenseMap[date]?.expenses ?? summary?.avgExpense ?? 0;

    filledDaily.unshift({ date, income, expenses }); // unshift untuk urutan lama → terbaru
  }

  console.log("filledDaily: ", filledDaily);

  let savings = summary?.currentSaving ?? 0;
  const result = [];

  for (let i = days - 1; i >= 0; i--) {
    const { income, expenses } = filledDaily[i];
    const asset = savings;
    const liability = 0;
    const loan = 0;

    // push ke depan agar urutan tetap lama → terbaru
    result.unshift([asset, liability, income, expenses, savings, loan]);

    // Backtrack savings ke hari sebelumnya
    savings = savings - (income - expenses);
  }

  console.log("savings: ", savings);

  const payload = {
    data: result, // array 14x6
  };

  console.log("Payload: ", payload);

  const resultFetch = await fetch(`${CONFIG.ML_BASE_URL}/predict`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  
  const resultFetchPredict = await resultFetch.json();
//   if (!resultFetch.ok) throw new Error("Gagal menampilkan hasil prediksi saat fetching");

  return resultFetchPredict;
};
