import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  Typography,
} from "@material-tailwind/react";
import React from "react";
import { useWindowSize } from "react-use";
import Confetti from "react-confetti";

const CongratsEffect = ({ congrats }) => {
  console.log(congrats);
  const [open, setOpen] = React.useState(congrats);
  const handleOpen = () => setOpen(!open);
  console.log(open);
  const { height } = useWindowSize();

  return (
    <>
      {" "}
      {/* <Button onClick={handleOpen} variant="gradient" size="sm">
        Submit
      </Button> */}
      <Dialog open={open} handler={handleOpen}>
        <Confetti width={1000} height={height} />
        <DialogBody className="container h-[40vh]">
          {/* <div className="flex justify-center items-center">
            <img
              src={myGif}
              alt="gif"
              className=" object-contain aspect-auto"
            />
          </div> */}
          <Typography className=" text-lg text-center">
            "Congratulations on closing the deal! Your hard work, dedication,
            and strategic thinking have paid off tremendously. Job well done!
          </Typography>
        </DialogBody>
        <DialogFooter>
          <Button variant="outlined" onClick={handleOpen} className="mr-1">
            <span>Close</span>
          </Button>
          {/* <Button variant="gradient" color="green" onClick={handleOpen}>
            <span>Confirm</span>
          </Button> */}
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default CongratsEffect;
