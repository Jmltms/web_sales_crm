import {
  Card,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import React from "react";
import { PiHandWavingFill, PiSignInBold } from "react-icons/pi";
import { useNavigate } from "react-router-dom";

const HeaderCard = ({ tab, icon }) => {
  const name = JSON.parse(localStorage.getItem("account_detail"));
  const navigate = useNavigate();

  // clear the info to the loca storage and logout
  const handleSignout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <>
      <Card className="flex flex-row w-[110%] md:w-[115%] lg:w-[100%] mx-3 md:mx-0">
        <CardBody className="flex items-center  space-x-3 md:w-[100%] w-[90%]">
          {icon}
          <Typography className=" text-xl md:text-3xl text-blue-800 font-satoshi font-bold">
            {tab}
          </Typography>
        </CardBody>
        <CardFooter className="lg:flex lg:flex-col md:w-[30rem] w-[10rem] items-center justify-center ">
          <Typography className=" md:text-2xl md:text-right text-center text-blue-800 font-bold">
            OOG CRM SYSTEM
          </Typography>
          <div className="flex space-x-2">
            <Typography className=" flex items-center font-medium text-sm">
              <PiHandWavingFill className=" h-4 w-4 mr-2 text-orange-800" />
              <span>{name?.full_name}</span>
            </Typography>
            <Typography>|</Typography>
            <Typography className=" flex items-center font-medium text-sm">
              <PiSignInBold className=" h-4 w-4 mr-2 text-orange-800" />
              <span
                className=" hover:text-blue-800 cursor-pointer hover:font-semibold"
                onClick={handleSignout}
              >
                Sign Out
              </span>
            </Typography>
          </div>
        </CardFooter>
      </Card>
    </>
  );
};

export default HeaderCard;
