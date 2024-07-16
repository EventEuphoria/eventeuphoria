import ProtectedRouteDashboard from "@/components/ProtectedRouteDashboard";
import DashboardChart from "./components/DashboardChart";
import TotalRevenueDashboard from "./components/TotalRevenueChart";
import TotalTicketsDashboard from "./components/TotalTicketsChart";
import WelcomeBack from "./components/WelcomeBack";

const Dashboard: React.FC = () => {
  return (
    <>
    <ProtectedRouteDashboard>
      <div className="w-full flex gap-5">
        <div className="flex flex-col gap-5 w-[70%] ">
          <WelcomeBack />
          <div className=" flex flex-col gap-3 w-full h-fit bg-white shadow-boxed shadow-gray-300 p-5 rounded-xl text-tMd">
            <h1 className="text-tXxl font-bold">Sales Visualization</h1>
            <hr />
            <div className="w-full">
              <select className="text-black py-1 px-5 rounded-xl ">
                <option value="">Yearly Sales</option>
                <option value="">Montly Sales</option>
                <option value="">Daily Sales</option>
              </select>
            </div>
            <DashboardChart />
          </div>
        </div>
        <div className="flex flex-col gap-5 w-[30%]">
          <div className="bg-white flex flex-col gap-3 shadow-boxed shadow-gray-300 rounded-xl p-5">
            <h2 className="font-bold text-tLg">Total Revenue</h2>
            <hr />
            <TotalRevenueDashboard />
            <p className="text-tMd font-semibold text-center">Rp50,000,000</p>
          </div>
          <div className="bg-white flex flex-col gap-3 shadow-boxed shadow-gray-300  rounded-xl p-5">
            <h2 className="font-bold text-tLg">Total Tickets Sold</h2>
            <hr />
            <TotalTicketsDashboard />
            <div className="flex justify-between items-center">
              <div>
                <p>Total Seat</p>
                <p className="text-tMd font-semibold">3500</p>
              </div>
              <div>
                <p>Sold Seat</p>
                <p className="text-tMd font-semibold">3350</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      </ProtectedRouteDashboard>
    </>
  );
};

export default Dashboard;
