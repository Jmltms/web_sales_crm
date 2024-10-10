import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Typography,
} from "@material-tailwind/react";
import IndustryListModal from "../Reuseables/IndustryListModal";
import { toast } from "react-toastify";
import { IoMdPersonAdd } from "react-icons/io";
import { FaAddressCard, FaUser } from "react-icons/fa6";
import { RiFileUserFill } from "react-icons/ri";
import { useAddNewLeadsMutation } from "../../../store";
import AllLeadsServiceOffered from "./AllLeadsServiceOffered";

const AddLeadsBtn = ({ allLeadsRefetch, uncontactedRefetch }) => {
  const [open, setOpen] = React.useState(false);
  const [industry, setIndustry] = useState("");
  const [service, setService] = useState();
  const [input, setInput] = useState({
    first_name: "",
    last_name: "",
    phone_num: "",
    tel_num: "",
    email: "",
    job_title: "",
    company: "",
    address: "",
    remarks: "",
    company_size: "",
    department: "",
    type: "",
    source: "",
  });
  const [postData] = useAddNewLeadsMutation();
  const account_info = JSON.parse(localStorage.getItem("account_detail"));
  // const account_type = account_info.type;
  const currentSession =
    account_info.full_name + "-" + account_info.employee_id;

  // handle disable if these fields are empty
  const requiredFields =
    input.email === "" || input.first_name === "" || input.last_name === "";

  // handle opening of modal
  const handleOpen = () => setOpen(!open);

  // function for get the data from child modal component
  const getIndustry = (value) => {
    setIndustry(value);
  };

  // function to fetch service offered
  const getService = (data) => {
    setService(data);
  };

  // handle onchange value of input field
  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  // function for saving the data to api
  const handleSave = async () => {
    const employee_id = currentSession.split("-");
    input.lead_owner = parseInt(employee_id[1]);
    input.industry = industry;
    input.session = account_info.full_name;
    input.service = parseInt(service);
    console.log(input);

    // variable for post data to api
    const leads = await postData(input).unwrap();
    if (leads.success === true) {
      toast.success(leads.message, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        progress: undefined,
      });
    } else {
      toast.error(leads.message, {
        position: "bottom-right",
        autoClose: 3000,
        theme: "colored",
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        progress: undefined,
      });
    }
    if (allLeadsRefetch) {
      allLeadsRefetch();
    }
    if (uncontactedRefetch) {
      uncontactedRefetch();
    }
    setOpen(!open);
    setIndustry("");
    setInput({
      first_name: "",
      last_name: "",
      phone_num: "",
      tel_num: "",
      email: "",
      job_title: "",
      company: "",
      address: "",
      remarks: "",
      company_size: "",
      department: "",
      type: "",
      source: "",
    });
  };
  return (
    <>
      <Button
        onClick={handleOpen}
        className="lg:flex items-center gap-3 bg-orange-800 mr-3 hidden "
        size="sm"
      >
        add new leads
        <span>
          <FaAddressCard className=" w-4 h-4" />
        </span>
      </Button>

      <FaAddressCard
        className=" w-6 h-6 lg:hidden text-orange-800"
        onClick={handleOpen}
      />
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader className=" flex justify-center  space-x-3 font-satoshi text-cyan-500">
          <IoMdPersonAdd size={24} /> <span>Add new leads</span>
        </DialogHeader>
        <DialogBody className="overflow-auto max-h-[60vh] lg:max-h-[70vh] container">
          <div className=" flex justify-between mb-2 mr-2">
            <div className=" flex items-center space-x-2">
              <FaUser size={16} className=" text-blue-700" />
              <Typography className=" text-xl text-blue-gray-800">
                Client information
              </Typography>
            </div>
          </div>
          <hr className=" border-blue-gray-100 mb-5" />
          <div className="grid grid-cols-1 lg:grid-cols-2 grid-flow-row gap-2">
            <Input
              label="First name"
              onChange={handleChange}
              name="first_name"
              required
            />
            <Input
              label="Last name"
              onChange={handleChange}
              name="last_name"
              required
            />
            <Input
              label="Mobile Number"
              onChange={handleChange}
              name="phone_num"
            />
            <Input
              label="Telephone Number"
              onChange={handleChange}
              name="tel_num"
            />
            <Input
              label="Email"
              onChange={handleChange}
              name="email"
              required
            />
            <Input label="Job Title" onChange={handleChange} name="job_title" />
            <Input
              label="Company"
              onChange={handleChange}
              name="company_name"
            />
            <Input
              label="Department"
              onChange={handleChange}
              name="department"
            />
          </div>
          <div className="mt-3">
            <IndustryListModal getIndustry={getIndustry} />
          </div>
          <div className="mt-3">
            <div className="relative w-full ">
              <textarea
                className="peer h-full min-h-[30px] w-full resize-none rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50"
                placeholder=""
                name="address"
                onChange={handleChange}
                required
              ></textarea>
              <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                Address
              </label>
            </div>
          </div>
          <div className="mt-3">
            <div className="relative w-full ">
              <textarea
                className="peer h-full min-h-[100px] w-full resize-none rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50"
                placeholder=""
                name="remarks"
                required
                onChange={handleChange}
              ></textarea>
              <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                Remarks
              </label>
            </div>
          </div>
          <div className="flex justify-between mt-5 mb-2 mr-2">
            <div className=" flex items-center space-x-2 ">
              <RiFileUserFill size={20} className=" text-blue-700" />
              <Typography className=" text-xl text-blue-gray-800">
                Lead information
              </Typography>
            </div>
          </div>
          <hr className=" border-blue-gray-100 mb-5" />
          <div className="grid grid-cols-1 lg:grid-cols-2 grid-flow-row gap-2">
            <Input
              label="Company Size"
              onChange={handleChange}
              name="company_size"
            />
            <Input
              label="Lead Owner"
              value={currentSession}
              readOnly
              name="lead_owner"
            />
            <div className="relative">
              <select
                className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-gray-900 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                onChange={handleChange}
                name="source"
              >
                <option selected disabled>
                  Select Source - - -
                </option>
                <option value="Email">Email</option>
                <option value="Facebook">Facebook</option>
                <option value="LinkedIn">LinkedIn</option>
                <option value="Outbound">Outbound</option>
                <option value="Referral">Referral</option>
                <option value="Website">Website</option>
              </select>
              <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                Lead Source
              </label>
            </div>
            <AllLeadsServiceOffered getService={getService} />
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
          <Button
            className=" bg-orange-800"
            onClick={handleSave}
            disabled={requiredFields}
          >
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};
export default AddLeadsBtn;
