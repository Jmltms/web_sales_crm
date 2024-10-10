import { useState } from "react";
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
import UserCardProfile from "../Reuseables/UserCardProfile";
import { FaUserTie } from "react-icons/fa6";
import ClientTabNavigation from "../Reuseables/ClientTabNavigation";
import { LuPencil } from "react-icons/lu";

const ArchiveCardModal = ({
  email,
  name,
  cellphone,
  job,
  company,
  address,
  leadId,
  remarks,
  status,
  clientId,
}) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };
  return (
    <>
      <div>
        <div
          className="flex items-center hover:text-cyan-400 space-x-2"
          onClick={handleOpen}
        >
          <LuPencil className=" h-3 w-3" />
          <Typography
            variant="small"
            color="blue-gray"
            className="font-normal cursor-pointer hover:text-cyan-400"
          >
            {name}
          </Typography>
        </div>
        <Dialog open={open} handler={handleOpen} size="xl">
          <DialogHeader className=" border-b border-blue-gray-50 flex justify-center  space-x-3 font-satoshi text-cyan-500">
            <FaUserTie size={24} /> <span>Client Profile</span>
          </DialogHeader>
          <DialogBody className="overflow-auto max-h-[75vh] container">
            <div className="lg:flex block space-y-10 lg:space-y-5 ">
              <div className="flex justify-center ml-2">
                <UserCardProfile
                  name={name}
                  email={email}
                  cellphone={cellphone}
                  job={job}
                  company={company}
                  address={address}
                  leadId={leadId}
                  remarks={remarks}
                  status={status}
                  clientId={clientId}
                />
              </div>
              <div className="">
                <div className=" hidden md:block container ml-8 md:w-[95%]">
                  <ClientTabNavigation leadId={leadId} />
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
      </div>
    </>
  );
};
export default ArchiveCardModal;
