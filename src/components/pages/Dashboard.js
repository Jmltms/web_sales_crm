// import  { useState } from "react";
import HeaderCard from "../../components/accessories/Reuseables/HeaderCard";
import { MdDashboard } from "react-icons/md";
// import DashboardBardGraph from "../accessories/dashboard/DashboardBarGraph";
// import DashboardLineGraph from "../accessories/dashboard/DashboardLineGraph";
import DashboardTable from "../accessories/dashboard/DashboardTable";
import DashboardLeadCard from "../accessories/dashboard/DashboardLeadCard";
import DashboardPyramid from "../accessories/dashboard/DashboardPyramid";
import DashboardPieGraph from "../accessories/dashboard/DashboardPieGraph";
import DashboardSalesAgent from "../accessories/dashboard/DashboardSalesAgentTable";
import DashboardRevCard from "../accessories/dashboard/DashboardRevCard";
// import moment from "moment";
// import DashboardTimeline from "../accessories/dashboard/DashboardTimeline";
// import DashboardBarGraph from "../accessories/dashboard/DashboardBarGraph";

function Dashboard() {
  const icon = <MdDashboard className=" w-8 h-8 text-blue-900" />;

  return (
    <div className="container">
      <div className=" space-y-7">
        <HeaderCard tab={"Dashboard"} icon={icon} />
        {/* <DashboardTimeline /> */}
        <DashboardLeadCard />
        <div className="pt-3">
          <div className="flex space-x-3">
            <div className=" block space-y-5 mt-3">
              <DashboardRevCard />
              <DashboardSalesAgent />
            </div>
            <div className="space-y-4">
              <DashboardPyramid />
              <DashboardPieGraph />
            </div>
          </div>
        </div>
        <div className="pb-5">
          <DashboardTable />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
