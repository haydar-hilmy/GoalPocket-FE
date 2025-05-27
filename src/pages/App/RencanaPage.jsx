import Swal from "sweetalert2";
import { Button } from "../../components/button/Button";
import AppLayout from "../../layouts/AppLayout";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const RencanaPage = () => {
    const showFormModal = async () => {
        const { value: formValues, isConfirmed } = await MySwal.fire({
            title: 'Buat Rencana',
            html:
                `<input id="target" class="swal2-input" placeholder="Target" />
                 <input id="harga" class="swal2-input" placeholder="Harga (Rp)" oninput="this.value = this.value.replace(/[^0-9]/g, '')" />`,
            showCancelButton: false,
            showCloseButton: true,
            confirmButtonText: 'Submit',
            focusConfirm: false,
            preConfirm: () => {
                const target = document.getElementById('target').value;
                const harga = document.getElementById('harga').value;

                if (!target || !harga) {
                    Swal.showValidationMessage('Semua field harus diisi');
                    return;
                }

                return { target, harga };
            }
        });

        if (isConfirmed && formValues) {
            await MySwal.fire({
                icon: 'success',
                title: 'Berhasil!',
                text: 'Form berhasil dikirim',
                confirmButtonText: 'OK'
            });
        }
    };

    return (
        <AppLayout page="Rencana Penabungan" subtitle="Investment Plan" title="Rencana Penabungan">
            <div className="w-full flex flex-col items-end">
                <Button onclick={showFormModal} variant={"py-1.5"} text={"Buat Rencana"} />
            </div>
            <div>
                {/* Konten tambahan bisa di sini */}
            </div>
        </AppLayout>
    );
};

export default RencanaPage;