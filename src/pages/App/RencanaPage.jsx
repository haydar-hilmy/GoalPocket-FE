import { Button } from "../../components/button/Button";
import AppLayout from "../../layouts/AppLayout";
import { useState } from "react";
import RencanaFormModal from "../../components/modal/RencanaFormModal";

const RencanaPage = () => {
    const [isOpenFormModal, setIsOpenFormModal] = useState(false);

    return (
        <AppLayout page="Rencana Penabungan" subtitle="Investment Plan" title="Rencana Penabungan">
            <div className="w-full flex flex-col items-end">
                <Button onclick={() => setIsOpenFormModal(prev => !prev)} variant={"py-1.5"} text={"Buat Rencana"} />
            </div>
            <div>
            {isOpenFormModal && ( <RencanaFormModal /> )}
                {/* Konten tambahan bisa di sini */}
            </div>
        </AppLayout>
    );
};

export default RencanaPage;