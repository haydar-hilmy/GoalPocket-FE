import { Button } from "../../components/button/Button";
import AppLayout from "../../layouts/AppLayout";
import { useState } from "react";
import RencanaFormModal from "../../components/modal/RencanaFormModal";

const RencanaPage = () => {
    const [isOpenFormModal, setIsOpenFormModal] = useState(false);

    return (
        <AppLayout page="Rencana Penabungan" subtitle="Investment Plan" title="Rencana Penabungan">
            <div className="w-full flex flex-col items-end">
                <Button onclick={() => setIsOpenFormModal(true)} variant={"py-1.5"} text={"Buat Rencana"} />
            </div>
            <RencanaFormModal isShow={isOpenFormModal} onClose={() => setIsOpenFormModal(false)} />
        </AppLayout>
    );
};

export default RencanaPage;