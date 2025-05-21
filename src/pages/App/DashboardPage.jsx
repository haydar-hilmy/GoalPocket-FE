import { InOutComeBox } from "../../components/box/InOutComeBox";
import AppLayout from "../../layouts/AppLayout"

const DashboardPage = () => {



    return (
        <AppLayout title="Dashboard App" page="dashboard">
            <div className="flex justify-center gap-10">
                <InOutComeBox title="Total Pemasukan" number="Rp 500.000" />
                <InOutComeBox title="Total Pengeluaran" number="Rp 500.000" />
            </div>
        </AppLayout>
    )
}

export default DashboardPage;