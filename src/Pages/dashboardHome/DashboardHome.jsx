import { Link } from "react-router-dom";
import RecentlyJoinedUsers from "../users/RecentlyJoinedusers";
import UserGrowthData from "./dashboardHomeComponents/dashboardChart/UserGrowthData";
import OverView from "./dashboardHomeComponents/overViewInformation/OverView";
import Back from "../../components/back/Back";

const DashboardHome = () => {
  return (
    <div className="bg-[#f4f4f5] h-screen overflow-y-auto scrollbar-none p-10 font-poppins">
      <Back name="Dashboard" />
      <div className="mb-20 mt-5">
        <OverView />
        <div className="mt-5   rounded-lg ">
          <UserGrowthData />
        </div>
        <div className="mt-10 p-3 rounded-md flex justify-between bg-white font-poppins">
          <div className="font-semibold">Recently Joined Users</div>
          <Link to="/users" className="text-sm text-[#6C63FF]">
            View All
          </Link>
        </div>
        <div>
          <RecentlyJoinedUsers />
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
