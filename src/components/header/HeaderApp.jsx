export const HeaderApp = () => {
  return (
    <>
      <header className="flex flex-row justify-between py-5 items-center">
        {/* Left Side */}
        <div className="flex flex-row">
          <h2 className="font-bold">Dashboard</h2>
        </div>

        {/* Right Side */}
        <div className="flex flex-row">
          <div className="flex flex-row gap-3 items-center cursor-pointer">
            <img src="user/default-user.png" className="w-7" />
            <small className="font-bold text-base">John Doe</small>
          </div>
        </div>
      </header>
    </>
  );
};
