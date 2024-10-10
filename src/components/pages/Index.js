import React from "react";
import { Outlet } from "react-router-dom";
import { Badge } from "@material-tailwind/react";
import { IoMdNotifications } from "react-icons/io";
import NavigationTab from "../accessories/Reuseables/NavigationTab";
import NavigationTabSm from "../accessories/Reuseables/NavigationTabSm";
import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

const Index = () => {
  return (
    <>
      <ToastContainer />
      <div className="relative">
        <div className="grid grid-cols-7 h-full ">
          <div className="hidden lg:block lg:col-span-1 lg:h-full fixed bottom-0 left-0 z-10">
            <NavigationTab />
          </div>
          <div className=" lg:hidden fixed top-2 left-1 z-10">
            <Badge className="mr-2 mt-2">
              <div className=" shadow p-3 flex justify-center items-center rounded-[50%] ">
                <IoMdNotifications className=" text-black h-8 w-8" />
              </div>
            </Badge>
            <div className="lg:hidden fixed bottom-0 left-0 col-span-1">
              <NavigationTabSm />
            </div>
          </div>
          <div className="col-span-6 lg:ml-[10rem] w-full  mt-5 lg:mt-3 mb-24 lg:mb-0 xl:mb-0">
            <div className="">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
