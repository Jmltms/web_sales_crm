import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
  Select,
  Option,
} from "@material-tailwind/react";
import UserCardProfile from "./../../Reuseables/UserCardProfile";
import { FaUserTie } from "react-icons/fa6";
import ClientTabNavigation from "./../../Reuseables/ClientTabNavigation";

const PipelineCardModal = ({ task }) => {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(!open);

  return (
    <>
      <Typography
        className=" text-xl text-black font-bold cursor-pointer"
        onClick={handleOpen}
      >
        {task.name}
      </Typography>
      <Dialog open={open} handler={handleOpen} size="xl">
        <DialogHeader className="border-b border-blue-gray-50 flex justify-center  space-x-3 font-satoshi text-cyan-500">
          <FaUserTie size={24} /> <span>Client Profile</span>
        </DialogHeader>
        <DialogBody className="overflow-auto max-h-[75vh] container ">
          <div className="lg:flex block space-y-10 ">
            <div className="flex justify-center ml-2">
              <UserCardProfile
                name={task.name}
                email={task.email}
                cellphone={task.cellphone}
                job={task.position}
              />
            </div>
            <div className="">
              <div className=" hidden md:block container ml-8 mt-4 md:w-[95%]">
                <ClientTabNavigation />
              </div>
              <div className="md:hidden ml-5 flex  w-72">
                <Select label="Select Navigation">
                  <Option>Activity</Option>
                  <Option>Notes</Option>
                  <Option>Emails</Option>
                  <Option>Calls</Option>
                  <Option>Meetings</Option>
                  <Option>Task</Option>
                </Select>
              </div>
            </div>
          </div>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Close</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};
export default PipelineCardModal;
