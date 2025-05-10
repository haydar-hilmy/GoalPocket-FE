import { getPasswordStrengthLevel } from "../../utils/passwordStrength";

const PasswordStrengthBar = ({ password }) => {
  const { level, score } = getPasswordStrengthLevel(password);

  const strengthStyles = [
    { width: "25%", background: "#dc2626" }, // merah
    { width: "50%", background: "#f59e0b" }, // oranye
    { width: "100%", background: "#16a34a" }, // hijau
  ];

  const barStyle =
    score > 0
      ? strengthStyles[score - 1]
      : { width: "0%", background: "#d1d5db" };

  return (
    <div className="mt-[1px] flex justify-center">
      <div className={`${score <= 0 ? "" : "bg-gray-200"} w-[95%] h-[0.2rem] rounded`}>
        <div
          className="h-[0.2rem] rounded transition-all duration-200 ease-in-out"
          style={barStyle}
        ></div>
      </div>
    </div>
  );
};

export default PasswordStrengthBar;
