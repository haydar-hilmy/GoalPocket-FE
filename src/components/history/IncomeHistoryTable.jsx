import React, { useState } from "react";
import { formatRupiah } from "../../utils/FormatRupiah";
import { formatDate } from "../../utils/FormatDate";
import SouthEastIcon from "@mui/icons-material/SouthEast";
import { SearchInput } from "../input/Input";

const iconMap = {
  income: (
    <div className="flex items-center justify-center w-6 h-6 rounded-full bg-green-200">
      <SouthEastIcon className="text-green-500" fontSize="small" />
    </div>
  ),
};

const IncomeHistoryTable = ({ data }) => {
  const [search, setSearch] = useState("");

  const filteredData = data.filter((income) =>
    income.category.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div className="p-4 bg-white rounded-lg shadow mb-6">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-semibold mb-2">Pemasukan</h2>
        <div className="w-64">
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Cari Pemasukan..."
          />
        </div>
      </div>
      <div className="overflow-x-auto rounded-lg shadow mb-4">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-green-300">
            <tr>
              <th className="px-4 py-2">Nama Pemasukan</th>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Nominal</th>
              <th className="px-4 py-2">Tanggal</th>
              <th className="px-4 py-2">Catatan</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length === 0 ? (
              <tr>
                <td
                  colSpan="5"
                  className="text-center py-4 text-gray-500 italic"
                >
                  Tidak ada data pemasukan.
                </td>
              </tr>
            ) : (
              filteredData.map((income) => (
                <tr key={income.id} className="border-t">
                  <td className="px-4 py-2 capitalize">
                    <div className="flex items-center space-x-2">
                      {iconMap["income"]}
                      <span>{income.category}</span>
                    </div>
                  </td>
                  <td className="px-4 py-2 capitalize">
                    #{income.id.slice(0, 6)}
                  </td>
                  <td className="px-4 py-2 capitalize">
                    {formatRupiah(income.amount)}
                  </td>
                  <td className="px-4 py-2 capitalize">
                    {formatDate(income.createdAt)}
                  </td>
                  <td className="px-4 py-2 capitalize">{income.notes}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export const IncomeHistoryTableLoading = () => {
  return (
    <div className="p-4 bg-white rounded-lg shadow mb-6 animate-pulse">
      <div className="flex justify-between items-center mb-4">
        <div className="w-40 h-6 bg-gray-200 rounded" />
        <div className="w-64 h-10 bg-gray-100 rounded" />
      </div>
      <div className="overflow-x-auto rounded-lg">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-green-300">
            <tr>
              {[...Array(5)].map((_, i) => (
                <th key={i} className="px-4 py-2">
                  <div className="w-24 h-4 bg-green-200 rounded" />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[...Array(5)].map((_, rowIndex) => (
              <tr key={rowIndex} className="border-t">
                {[...Array(5)].map((_, colIndex) => (
                  <td key={colIndex} className="px-4 py-2">
                    <div className="w-full h-4 bg-gray-200 rounded" />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default IncomeHistoryTable;
