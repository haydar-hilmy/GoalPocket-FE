import React, { useState } from "react";
import { formatRupiah } from "../../utils/FormatRupiah";
import { formatDate } from "../../utils/FormatDate";
import { SearchInput } from "../input/Input";
import CallMadeIcon from "@mui/icons-material/CallMade";
import { CONFIG } from "../../config/Config";
import Swal from "sweetalert2";

const iconMap = {
  expense: (
    <div className="flex items-center justify-center w-6 h-6 rounded-full bg-red-200">
      <CallMadeIcon className="text-red-500" fontSize="small" />
    </div>
  ),
};

const ExpenseHistoryTable = ({ data, onDeleteSuccess }) => {
  const [search, setSearch] = useState("");

  const [isDeleting, setIsDeleting] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const token = localStorage.getItem(CONFIG.LS_KEY);

  const filteredData = data.filter((expense) =>
    expense.category.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async (id) => {
      if (isDeleting) return;
      
      try {
        setIsDeleting(true);
        setDeletingId(id);
        
        const response = await fetch(`${CONFIG.BASE_URL}/trackings/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
  
        if (!response.ok) {
          throw new Error("Gagal menghapus data");
        }
  
        // Panggil callback jika berhasil
        if (onDeleteSuccess) {
          onDeleteSuccess(id);
        }
  
        Swal.fire({
          icon: "success",
          title: "Berhasil",
          text: "Data pengeluaran berhasil dihapus",
        });
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Gagal",
          text: error.message || "Terjadi kesalahan saat menghapus data",
        });
      } finally {
        setIsDeleting(false);
        setDeletingId(null);
      }
    };

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-2">
        <h2 className="text-xl font-semibold mb-2">Pengeluaran</h2>
        <div className="w-64">
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Cari Pengeluaran..."
          />
        </div>
      </div>
      <div className="overflow-x-auto rounded-lg shadow mb-2">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-red-300">
            <tr>
              <th className="px-4 py-2">Nama Pengeluaran</th>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Nominal</th>
              <th className="px-4 py-2">Tanggal</th>
              <th className="px-4 py-2">Catatan</th>
              <th className="px-4 py-2">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length === 0 ? (
              <tr>
                <td
                  colSpan="5"
                  className="text-center py-4 text-gray-500 italic"
                >
                  Tidak ada data pengeluaran.
                </td>
              </tr>
            ) : (
              filteredData.map((expense) => (
                <tr key={expense.id} className="border-t">
                  <td className="px-4 py-2 capitalize">
                    <div className="flex items-center space-x-2">
                      {iconMap["expense"]}
                      <span>{expense.category}</span>
                    </div>
                  </td>
                  <td className="px-4 py-2 capitalize">
                    #{expense.id.slice(0, 6)}
                  </td>
                  <td className="px-4 py-2 capitalize">
                    {formatRupiah(expense.amount)}
                  </td>
                  <td className="px-4 py-2 capitalize">
                    {formatDate(expense.createdAt)}
                  </td>
                  <td className="px-4 py-2 capitalize">{expense.notes}</td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => handleDelete(expense.id)}
                      disabled={isDeleting && deletingId === expense.id}
                      className={`flex items-center justify-center px-3 py-1.5 rounded-md transition-all 
                        ${
                          isDeleting && deletingId === expense.id
                            ? "bg-gray-300 cursor-not-allowed"
                            : "bg-red-500 hover:bg-red-600 text-white"
                        }`}
                    >
                      {isDeleting && deletingId === expense.id ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Menghapus...
                        </>
                      ) : (
                        <>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                          Hapus
                        </>
                      )}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export const ExpenseHistoryTableLoading = () => {
  return (
    <div className="p-4 bg-white rounded-lg shadow mb-6 animate-pulse">
      <div className="flex justify-between items-center mb-4">
        <div className="w-40 h-6 bg-gray-200 rounded" />
        <div className="w-64 h-10 bg-gray-100 rounded" />
      </div>
      <div className="overflow-x-auto rounded-lg">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-red-300">
            <tr>
              {[...Array(5)].map((_, i) => (
                <th key={i} className="px-4 py-2">
                  <div className="w-24 h-4 bg-red-200 rounded" />
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

export default ExpenseHistoryTable;
