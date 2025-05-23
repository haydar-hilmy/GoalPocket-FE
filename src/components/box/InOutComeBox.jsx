export const InOutComeBox = ({ title = "", number = "Rp 0" }) => {
  return (
    <div className="flex flex-col items-center gap-3 bg-bg_base rounded-lg px-10 py-6 shadow-md">
      <h2 className="text-base border-b">{title}</h2>
      <h3 className="text-3xl font-black">{number}</h3>
    </div>
  );
};
