import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Typography,
} from "@material-tailwind/react";
import { IoMdPersonAdd } from "react-icons/io";
import { FaUser } from "react-icons/fa6";
import { RiEdit2Line, RiFileUserFill } from "react-icons/ri";

const UncontactedLeadsEditModal = () => {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(!open);

  return (
    <>
      <RiEdit2Line
        onClick={handleOpen}
        className=" text-orange-800 h-5 w-5 cursor-pointer hover:text-deep-orange-900"
      />
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader className=" flex justify-center  space-x-3 font-satoshi text-cyan-500">
          <IoMdPersonAdd size={24} /> <span>Add new leads</span>
        </DialogHeader>
        <DialogBody className="overflow-auto max-h-[60vh] lg:max-h-[70vh] container">
          <div className=" flex items-center space-x-2 mb-2">
            <FaUser size={16} className=" text-blue-700" />
            <Typography className=" text-xl text-blue-gray-800">
              Client information
            </Typography>
          </div>
          <hr className=" border-blue-gray-100 mb-5" />
          <div className="grid grid-cols-1 lg:grid-cols-2 grid-flow-row gap-2">
            <Input label="First name" />
            <Input label="Last name" />
            <Input label="Company" />
            <Input label="Industry" />
            <Input label="Lead Source" />
            <Input label="Projected OTF" />
            <Input label="Projected MSF" />
            <Input label="Contract Month" />
            <Input label="Service Offered" />
            <Input label="Email" />
            <Input label="Mobile" />
            <Input label="Department" />
            <Input label="Job Title" />
            <Input label="Remaks" />
          </div>
          <div className="mt-3">
            <div className="relative w-full ">
              <textarea
                className="peer h-full min-h-[100px] w-full resize-none rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50"
                placeholder=""
              ></textarea>
              <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                Remarks
              </label>
            </div>
          </div>
          <div className=" flex items-center space-x-2 mt-5 mb-2">
            <RiFileUserFill size={20} className=" text-blue-700" />
            <Typography className=" text-xl text-blue-gray-800">
              Lead information
            </Typography>
          </div>
          <hr className=" border-blue-gray-100 mb-5" />
          <div className="grid grid-cols-1 lg:grid-cols-2 grid-flow-row gap-2">
            <Input label="Company Size" />
            <Input label="Lead Owner" />
            <Input label="Lead Type" />
            <Input label="Lead Source" />
          </div>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button className=" bg-orange-800" onClick={handleOpen}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};
export default UncontactedLeadsEditModal;
