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

const ContactedLeadsCardModal = ({ lead }) => {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(!open);

  return (
    <>
      <Typography
        className=" text-xl text-black font-bold cursor-pointer"
        onClick={handleOpen}
      >
        {lead.full_name}
      </Typography>
      <Dialog open={open} handler={handleOpen} size="xl">
        <DialogHeader className="border-b border-blue-gray-50 flex justify-center  space-x-3 font-satoshi text-cyan-500">
          <FaUserTie size={24} /> <span>Client Profile</span>
        </DialogHeader>
        <DialogBody className="overflow-auto max-h-[75vh] container ">
          <div className="lg:flex block space-y-10 ">
            <div className="flex justify-center ml-2">
              <UserCardProfile
                name={lead.full_name}
                email={lead.email}
                cellphone={lead.phone_num}
                job={lead.job_title}
                company={lead.company}
                address={lead.address}
                leadId={lead.lead_id}
                remarks={lead.remarks}
                clientId={lead.client_id}
              />
            </div>
            <div className="">
              <div className=" hidden md:block container ml-8 mt-3">
                <ClientTabNavigation leadId={lead.id} />
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
export default ContactedLeadsCardModal;
