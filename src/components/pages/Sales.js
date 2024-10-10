import { Typography } from "@material-tailwind/react";
import React from "react";
import Images from "./../../img/salaesbg.png";
import { TypeAnimation } from "react-type-animation";
const Sales = () => {
  return (
    <>
      <div className="container w-full mx-7 lg:mx-0">
        <div className="flex flex-col justify-center items-center lg:h-[70vh]">
          <img
            src={Images}
            alt="logo"
            className="aspect-auto object-cover w-72 h-72"
          />
          <div className=" w-full lg:w-[70%]">
            <Typography className="text-center text-2xl leading-10 lg:leading-10 font-medium mt-[-20px] z-0">
              <TypeAnimation
                sequence={[
                  "Embrace the journey with unwavering courage and believe in yourself and your product; every 'no' is a stepping stone towards a 'yes', turning rejections into opportunities for growth and eventual success.",
                  3000,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
              />
            </Typography>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sales;
