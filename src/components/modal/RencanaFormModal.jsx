import { Icon } from "../icons/icons";

const RencanaFormModal = ({
  isShow = true,
  onClose,
  onSubmit,
  title = "Modal Title",
}) => {
  return (
    <div className={`${isShow ? "block" : "hidden"} absolute top-0 left-0 w-screen h-screen overflow-y-auto flex flex-col justify-center items-center z-[200] bg-[rgba(0,0,0,0.3)] duration-200`}>
      <div className="">
        <div className="flex flex-row">
          <div className="flex-1">
            <h3>{title}</h3>
          </div>
          <div>
            <div className="p-2.5 cursor-pointer bg-white w-fit h-fit">
              <Icon.Cross />
            </div>
          </div>
        </div>

        {/* FORM CONTENT */}
        <div></div>
      </div>
    </div>
  );
};

export default RencanaFormModal;
