import {
  AdsClickOutlined,
  BorderColorOutlined,
  DateRangeOutlined,
  HourglassBottomOutlined,
  SavingsOutlined,
  TrendingUpOutlined,
} from "@mui/icons-material";
import { Line } from "../line/Line";
import { ActionButton } from "../button/ActionButton";
import { formatRupiah } from "../../utils/FormatRupiah";

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

export const RencanaCard = ({ data }) => {
  return (
    <div className="bg-white min-w-60 w-auto px-6 py-4 rounded-lg shadow-md flex flex-col gap-3 justify-between">
      <h2 className="font-bold text-xl">{data.name}</h2>
      <Line />
      <div className="flex flex-col gap-4">
        <Item
          icon={<DateRangeOutlined color="inherit" />}
          label="Tercapai Dalam"
          value="2 Tahun"
        />
        <Item
          icon={<HourglassBottomOutlined color="inherit" />}
          label="Durasi Menabung"
          value={data.duration}
        />
        <Item
          icon={<SavingsOutlined color="inherit" />}
          label="Tabungan Awal"
          value={formatRupiah(data.initialSaving)}
        />
        <Item
          icon={<TrendingUpOutlined color="inherit" />}
          label="Pemasukan Tetap"
          value={formatRupiah(data.fixedIncome)}
        />
        <Item
          icon={<AdsClickOutlined color="inherit" />}
          label="Target Tercapai"
          value={formatRupiah(data.targetAmount)}
        />
      </div>
      <Line />
      <ActionButton>
        <BorderColorOutlined fontSize="inherit" /> Ubah
      </ActionButton>
    </div>
  );
};
