import { Spinner, Typography } from "@material-tailwind/react";
import React from "react";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { useFetchTotalRevQuery } from "../../../store";

const DashboardRevCard = () => {
  const totalRevApi = useFetchTotalRevQuery();
  console.log(totalRevApi);
  const totalRev = totalRevApi.data?.data.total_revenue;

  let content;
  if (totalRevApi.isLoading) {
    content = (
      <div>
        <Spinner />
      </div>
    );
  } else if (totalRevApi.error) {
    content = (
      <div>
        <Typography>Refresh...</Typography>
      </div>
    );
  } else {
  }
  return (
    <>
      <div className=" flex space-x-10">
        <div className=" flex items-center justify-center space-x-5 rounded-lg p-3 border-blue-gray-100 border shadow-md w-64">
          <div className=" bg-yellow-700 p-2 rounded-full">
            <RiMoneyDollarCircleLine className=" h-6 w-6" />
          </div>
          <div>
            <Typography className=" text-center text-sm">
              Projected Revenue
            </Typography>
            <Typography className="text-center font-bold text-yellow-800">
              {"₱ " +
                totalRev?.pipeline_rev
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </Typography>
          </div>
        </div>
        <div className=" flex items-center justify-center space-x-5 rounded-lg p-3 border-blue-gray-100 border shadow-md w-64">
          <div className=" bg-green-500 p-2 rounded-full">
            <RiMoneyDollarCircleLine className=" h-6 w-6" />
          </div>
          <div>
            <Typography className=" text-center text-sm">
              Actual Revenue
            </Typography>{" "}
            <Typography className="text-center font-bold text-green-700">
              {totalRev?.actual_rev
                ? "₱ " +
                  totalRev?.actual_rev
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                : "₱ 0"}
            </Typography>
          </div>
        </div>
        <div className=" flex items-center justify-center space-x-5 rounded-lg p-3 border-blue-gray-100 border shadow-md w-64">
          <div className=" bg-blue-800 p-2 rounded-full">
            <RiMoneyDollarCircleLine className=" h-6 w-6" />
          </div>
          <div>
            <Typography className=" text-center text-sm">
              Total Revenue
            </Typography>{" "}
            <Typography className="text-center font-bold text-green-700">
              {"₱ " +
                totalRev?.total_rev
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </Typography>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardRevCard;
