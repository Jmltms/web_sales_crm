import { useState } from "react";
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Input,
  Typography,
} from "@material-tailwind/react";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { ScaleLoader } from "react-spinners";
import { useFetchDetailLeadsQuery } from "../../../store";
import { useUpdataLeadStatusMutation } from "../../../store";
import "./../../../App.css";
import { toast } from "react-toastify";
import IndustryListModal from "./IndustryListModal";
import "react-toastify/dist/ReactToastify.css";
import { LuPencil } from "react-icons/lu";
import ServiceName from "./ServiceName";

const LeadInformationModal = ({ leadId, clientId }) => {
  const [leadInformation, setLeadInformation] = useState(false);
  const [dropDownStatus, setDropdownStatus] = useState();
  const [industry, setIndustry] = useState("");
  const [forms, setForms] = useState({
    first_name: "",
    last_name: "",
    phone_num: "",
    tel_num: "",
    email: "",
    job_title: "",
    company: "",
    department: "",
    address: "",
    remarks: "",
    service: "",
  });
  const [serviceName, setServiceName] = useState("");

  // handle opening of lead information modal
  const handleOpenLead = () => setLeadInformation(!leadInformation);

  // variable to handle data from api
  const detailLeadInfo = useFetchDetailLeadsQuery(leadId);
  console.log(detailLeadInfo);

  // variable for post method to api
  const [updateLeads] = useUpdataLeadStatusMutation();

  // condition based on the status of request from api
  const detailLead = detailLeadInfo.data?.data;

  // dropdown option based on lead status
  let leadStatus = [
    { id: 1, label: "Untouched" },
    { id: 2, label: "Qualification" },
    { id: 3, label: "Follow Up" },
    { id: 4, label: "Cold Leads" },
    { id: 5, label: "Presentation" },
    { id: 6, label: "Proposal" },
    { id: 7, label: "Negotiation" },
    { id: 8, label: "Closed Deal" },
    { id: 9, label: "Lost Deal" },
    { id: 10, label: "Re-assign" },
    { id: 11, label: "Do Not Call" },
  ];

  // get credentials from local storage
  const account_info = JSON.parse(localStorage.getItem("account_detail"));

  //handle onchange of input fields
  const handleChange = (e) => {
    setForms({ ...forms, [e.target.name]: e.target.value });
  };

  // handle onchage of dropdown (status)
  const handleChangeStatus = (e) => {
    setDropdownStatus(e.target.value);
  };
  // fetch industry from child component
  const getIndustry = (value) => {
    setIndustry(value);
  };

  // handle add dynamic dropdown for service offered
  const fetchService = (val) => {
    if (detailLead.service === val) {
      setServiceName("");
    } else {
      setServiceName(val);
    }
  };

  // handle save for updating the status of leads
  const handleSave = () => {
    forms.lead_status = dropDownStatus;
    forms.id = leadId;
    forms.industry_name = industry;
    forms.session = account_info.full_name;
    forms.service = serviceName;
    forms.clientId = clientId;
    console.log(forms);
    const updateLeadStatus = updateLeads(forms).unwrap();
    if (updateLeadStatus.success === true) {
      toast.success(updateLeadStatus.message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        progress: undefined,
      });
    } else {
      toast.error(updateLeadStatus.message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        progress: undefined,
      });
    }
    setLeadInformation(!leadInformation);
    detailLeadInfo.refetch();
    setServiceName("");
  };

  // conditioning for fetching data from api
  let content;
  if (detailLeadInfo.isLoading) {
    content = (
      <div className=" flex flex-col items-center my-20">
        <ScaleLoader color="#1565C0" />
        <Typography className=" text-sm text-blue-800 mt-5">Loading</Typography>
      </div>
    );
  } else if (detailLeadInfo.error) {
    content = (
      <div className=" flex justify-center">
        <Button
          variant="outlined"
          color="blue"
          size="sm"
          onClick={() => window.location.reload()}
        >
          Refresh
        </Button>
      </div>
    );
  } else {
    content = (
      <>
        <div className=" grid grid-cols-2 gap-2 space-x-2">
          <div className="space-y-2">
            <Input label="Lead Owner" readOnly value={detailLead?.owner} />
            <div className="relative">
              <select
                label="Lead Status"
                defaultValue={detailLead?.lead_status}
                onChange={handleChangeStatus}
                className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-gray-900 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
              >
                {leadStatus.map((obj) => (
                  <option key={obj.id} value={obj.id}>
                    {obj.label}
                  </option>
                ))}
              </select>
              <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                Lead Status
              </label>
            </div>
            <Input
              onChange={handleChange}
              label="First Name"
              name="first_name"
              defaultValue={detailLead.first_name}
            />
            <Input
              onChange={handleChange}
              label="Mobile Number"
              name="phone_num"
              defaultValue={detailLead.phone_num}
            />
            <Input
              onChange={handleChange}
              label="Email"
              type="email"
              name="email"
              defaultValue={detailLead.email}
            />
            <Input
              onChange={handleChange}
              label="Company"
              name="company"
              defaultValue={detailLead.company}
            />
            <Input
              type="number"
              label="Company Size"
              defaultValue={detailLead?.company_size}
              className=" border border-blue-gray-700 w-16 px-1"
            />
          </div>
          <div className="space-y-2">
            <Input label="Lead Score" />
            <Input
              label="Lead Type"
              value={detailLead.lead_type === 1 ? "B2B" : "B2C"}
            />
            <Input
              onChange={handleChange}
              label="Last Name"
              name="last_name"
              defaultValue={detailLead.last_name}
            />
            <Input
              onChange={handleChange}
              label="Telephone Number"
              name="tel_num"
              defaultValue={detailLead.tel_num}
            />
            <Input
              onChange={handleChange}
              label="Job Title"
              name="job_title"
              defaultValue={detailLead.job_title}
            />
            <Input
              onChange={handleChange}
              label="Department"
              name="department"
              defaultValue={detailLead.department}
            />
            <Input readOnly label="Source" defaultValue={detailLead.source} />
          </div>
        </div>
        <div className="relative w-full mt-2">
          <textarea
            className="peer h-full min-h-[30px] w-full resize-none rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50"
            placeholder=""
            name="address"
            onChange={handleChange}
            defaultValue={detailLead.address}
            required
          ></textarea>
          <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
            Address
          </label>
        </div>
        <div className="relative w-full mt-2">
          <textarea
            className="peer h-full min-h-[30px] w-full resize-none rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50"
            placeholder=""
            name="remarks"
            onChange={handleChange}
            defaultValue={detailLead.remarks}
            required
          ></textarea>
          <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
            remarks
          </label>
        </div>
        <div className=" mt-2">
          {detailLead.industry === null ? (
            <IndustryListModal getIndustryName={getIndustry} />
          ) : (
            <Input
              label="Industry"
              readOnly
              defaultValue={detailLead.industry}
            />
          )}
        </div>
        <ServiceName
          fetchService={fetchService}
          serviceDefault={detailLead.service}
        />
      </>
    );
  }
  return (
    <>
      <div>
        <Button
          onClick={handleOpenLead}
          variant="outlined"
          color="orange"
          size="sm"
          className=" flex"
        >
          <LuPencil className=" mr-2" />
          Lead information
        </Button>

        <Dialog open={leadInformation} handler={handleOpenLead}>
          <DialogHeader className=" flex justify-center  space-x-3 font-satoshi text-cyan-500">
            <IoMdInformationCircleOutline size={24} />{" "}
            <span>Lead information</span>
          </DialogHeader>
          <DialogBody className="overflow-auto max-h-[60vh] lg:max-h-[70vh] container ">
            {content}
          </DialogBody>
          <DialogFooter>
            <Button
              variant="text"
              color="red"
              onClick={handleOpenLead}
              className="mr-1"
            >
              <span>Cancel</span>
            </Button>
            {detailLead?.condition === 1 ? (
              <Button className=" bg-orange-800" onClick={handleSave}>
                <span>Confirm</span>
              </Button>
            ) : (
              ""
            )}
          </DialogFooter>
        </Dialog>
      </div>
    </>
  );
};

export default LeadInformationModal;
