import { Spinner, Typography } from "@material-tailwind/react";
import React from "react";
import { AiFillFunnelPlot } from "react-icons/ai";
import { FaPhoneAlt } from "react-icons/fa";
import { FaHandshakeSimple, FaPhoneSlash } from "react-icons/fa6";
import { MdAssignmentReturn } from "react-icons/md";
import { useFetchStatusLabelDashboardQuery } from "../../../store";
const DashboardLeadCard = () => {
  const dashboardStatusCount = useFetchStatusLabelDashboardQuery();
  const dashboardStatusCountMap = dashboardStatusCount.data?.data.status;

  console.log(dashboardStatusCountMap);
  const mapData = dashboardStatusCountMap?.map((item) => item);
  const uncontacted = mapData?.find((item) => item.label === "Uncontacted");
  const contacted = mapData?.find((item) => item.label === "Contacted");
  const pipeline = mapData?.find((item) => item.label === "Pipeline");
  const closeDeal = mapData?.find((item) => item.label === "Close Deal");
  const coldLeads = mapData?.find((item) => item.label === "Cold Leads");
  let content;

  if (dashboardStatusCount.isLoading) {
    content = (
      <div>
        <Spinner />
      </div>
    );
  } else if (dashboardStatusCount.error) {
    content = (
      <div>
        <Typography>Refresh...</Typography>
      </div>
    );
  } else {
    content = (
      <div className="flex space-x-4 mx-1">
        <div className=" flex items-center justify-center space-x-5 rounded-lg p-3 border-blue-gray-100 border shadow-md w-64">
          <div className=" bg-brown-400 p-2 rounded-full">
            <MdAssignmentReturn className=" h-7 w-7" />
          </div>
          <div>
            <Typography className=" text-center text-sm">
              {uncontacted.label}
            </Typography>{" "}
            <Typography className=" text-center">
              {uncontacted.count}
            </Typography>
          </div>
        </div>
        <div className=" flex items-center justify-center space-x-5 rounded-lg p-3 border-blue-gray-100 border shadow-md w-64">
          <div className=" bg-light-blue-500 p-2 rounded-full">
            <FaPhoneAlt className=" h-6 w-6" />
          </div>
          <div>
            <Typography className=" text-center text-sm">
              {contacted.label}
            </Typography>{" "}
            <Typography className=" text-center">{contacted.count}</Typography>
          </div>
        </div>
        <div className=" flex items-center justify-center space-x-5 rounded-lg p-3 border-blue-gray-100 border shadow-md w-64">
          <div className=" bg-green-200 p-2 rounded-full">
            <AiFillFunnelPlot className=" h-7 w-7" />
          </div>
          <div>
            <Typography className=" text-center text-sm">
              {pipeline.label}
            </Typography>{" "}
            <Typography className=" text-center">{pipeline.count}</Typography>
          </div>
        </div>
        <div className=" flex justify-center items-center space-x-10 rounded-lg p-3 border-blue-gray-100 border shadow-md w-64">
          <div className=" bg-orange-300 p-2 rounded-full">
            <FaHandshakeSimple className=" h-7 w-7" />
          </div>
          <div>
            <Typography className=" text-center text-sm">
              {closeDeal.label}
            </Typography>{" "}
            <Typography className=" text-center">{closeDeal.count}</Typography>
          </div>
        </div>
        <div className=" flex items-center justify-center space-x-5 rounded-lg p-3 border-blue-gray-100 border shadow-md w-64">
          <div className=" bg-purple-200 p-2 rounded-full">
            <FaPhoneSlash className=" h-7 w-7" />
          </div>
          <div>
            <Typography className=" text-center text-sm">
              {coldLeads.label}
            </Typography>{" "}
            <Typography className=" text-center">{coldLeads.count}</Typography>
          </div>
        </div>
      </div>
    );
  }
  return <>{content}</>;
};

export default DashboardLeadCard;
