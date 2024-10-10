import React from "react";
import myGif from "./../../img/Marketing-pana.png";
import { Typography } from "@material-tailwind/react";
const Home = () => {
  return (
    <>
      <div>
        <Typography className=" text-4xl font-bold text-center text-blue-800 mt-2">
          One Outsource{" "}
          <span className=" text-light-green-500">Direct Corporation</span>
        </Typography>
        <Typography className=" text-center">
          Welcome, OODC Sales and Marketing CRM System
        </Typography>
        <div className="lg:mt-[-20px]">
          <img
            src={myGif}
            alt="gif"
            className=" aspect-square object-cover w-[50%] mx-auto"
          />
        </div>
      </div>
    </>
  );
};

export default Home;
