import { MainInput } from "../../components/input/Input";
import AppLayout from "../../layouts/AppLayout";

export const ProfilePage = () => {
  const handleSubmit = (e) => {
    e.preventDefault();

    alert("Submited");
  };

  return (
    <AppLayout title="Profil" page="Profil Saya">
      <div className="flex flex-row w-full gap-5">
        <div>
          <img className="w-16" src="/user/default-user.png" alt="" />
        </div>
        <div className="w-full">
          <form className="bg-[#F5F5FC] p-5 rounded-md">
            <MainInput />
          </form>
        </div>
      </div>
    </AppLayout>
  );
};
