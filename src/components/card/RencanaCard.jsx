import {
  AdsClickOutlined,
  BorderColorOutlined,
  CheckOutlined,
  HourglassBottomOutlined,
  SavingsOutlined,
  TrendingDownOutlined,
  TrendingUpOutlined,
} from "@mui/icons-material";
import { Line } from "../line/Line";
import { ActionButton } from "../button/ActionButton";
import { formatRupiah } from "../../utils/FormatRupiah";

export const RencanaCardContainer = ({ children }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-5">
      {children}
    </div>
  );
};

const Item = ({ icon, label = "Label", value = "Value" }) => {
  return (
    <div className="flex flex-row gap-4 items-center">
      <div className="bg-gray-100 p-1.5 rounded-full text-primary">{icon}</div>
      <div className="flex flex-col">
        <h4 className="text-xs text-text-dark">{label}</h4>
        <h3 className="font-bold text-base text-text-dark">{value}</h3>
      </div>
    </div>
  );
};

export const RencanaCard = ({ data, onEdit, onComplete }) => {
  const isCompleted = data?.isCompleted;

  return (
    <div
      className={`relative bg-white min-w-60 w-auto px-6 py-4 rounded-lg shadow-md flex flex-col gap-3 justify-between transition-all ${
        isCompleted ? "opacity-60 backdrop-blur-sm border border-green-400" : ""
      }`}
    >
      {/* Badge indikator selesai */}
      {isCompleted && (
        <div className="absolute top-2 right-2 bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full shadow-sm flex items-center gap-1 animate-fadeIn">
          <CheckOutlined fontSize="small" />
          Selesai
        </div>
      )}

      <h2 className="font-bold text-xl">{data.name}</h2>
      <Line />
      <div className="flex flex-col gap-4">
        <Item
          icon={<HourglassBottomOutlined color="inherit" />}
          label="Durasi Menabung"
          value={data?.duration || "-"}
        />
        <Item
          icon={<SavingsOutlined color="inherit" />}
          label="Tabungan Awal"
          value={formatRupiah(data?.initialSaving ?? 0)}
        />
        <Item
          icon={<TrendingUpOutlined color="inherit" />}
          label="Pemasukan Tetap"
          value={formatRupiah(data?.fixedIncome ?? 0)}
        />
        <Item
          icon={<TrendingDownOutlined color="inherit" />}
          label="Pengeluaran Tetap"
          value={formatRupiah(data?.fixedOutcome ?? 0)}
        />
        <Item
          icon={<AdsClickOutlined color="inherit" />}
          label="Target Tercapai"
          value={formatRupiah(data?.targetAmount ?? 0)}
        />
      </div>
      <Line />
      <ActionButton onClick={onEdit}>
        <BorderColorOutlined fontSize="inherit" /> Ubah
      </ActionButton>
      <ActionButton
        variant={`bg-green-400 ${isCompleted ? "cursor-not-allowed opacity-50" : ""}`}
        isDisabled={isCompleted}
        onClick={onComplete}
      >
        <CheckOutlined fontSize="inherit" /> Selesaikan
      </ActionButton>
    </div>
  );
};

export const RencanaCardLoading = ({ cardTotal = 4, isShow = false }) => {
  return (
    <>
      {Array(cardTotal)
        .fill(0)
        .map((_, index) => (
          <div
            key={index}
            className="bg-white min-w-60 w-auto px-6 py-4 rounded-lg shadow-md flex flex-col gap-3 justify-between"
          >
            <div className="h-6 w-3/4 rounded bg-gray-200 shimmer" />

            <div className="border-t border-gray-200 my-2" />

            <div className="flex flex-col gap-4">
              {Array(5)
                .fill(0)
                .map((_, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="h-5 w-5 rounded bg-gray-200 shimmer" />
                    <div className="flex flex-col gap-1 w-full">
                      <div className="h-3 w-1/2 rounded bg-gray-200 shimmer" />
                      <div className="h-4 w-3/4 rounded bg-gray-200 shimmer" />
                    </div>
                  </div>
                ))}
            </div>

            <div className="border-t border-gray-200 my-2" />

            <div className="h-9 w-1/3 rounded bg-gray-200 shimmer self-start" />
          </div>
        ))}
    </>
  );
};

// CARA KERJA UBAH RENCANA:
// Ketika ubah diklik, maka data akan disimpan dalam sessionStorage dan kemudian openModalFormrencana akan mengecek key EDIT_RENCANA dan fetching
