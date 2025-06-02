const RencanaCardEmptyState = () => {
  return (
    <div className="flex flex-col items-center justify-center  text-center py-12 px-4 bg-white rounded-md shadow-sm">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-16 w-16 text-primary mb-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-6a2 2 0 00-2-2H5l7-7 7 7h-2a2 2 0 00-2 2v6m-6 4h6" />
      </svg>
      <h3 className="text-lg font-semibold text-text_dark">Belum ada rencana</h3>
      <p className="text-sm text-gray-500 mt-2">
        Tambahkan rencana baru untuk memulai aktivitas kamu.
      </p>
    </div>
  );
};

export default RencanaCardEmptyState;
