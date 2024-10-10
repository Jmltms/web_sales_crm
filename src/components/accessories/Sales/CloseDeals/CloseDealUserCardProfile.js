import {
  Card,
  CardFooter,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import { FaRegBuilding, FaUserLarge } from "react-icons/fa6";
import { FaMobileAlt } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { GrLocation } from "react-icons/gr";
import { useFetchLeadServiceQuery } from "../../../../store";
import CloseDealRevenueModal from "./CloseDealRevenueModal";
import LeadInformationModal from "../../Reuseables/LeadInformationModal";

const UserCardProfile = ({
  name,
  email,
  cellphone,
  job,
  company,
  address,
  leadId,
  remarks,
  status,
}) => {
  const leadService = useFetchLeadServiceQuery({
    id: leadId,
  });
  const serviceApi = leadService.data?.data;

  const listService = [
    {
      id: 1,
      label: "Back Office",
    },
    {
      id: 2,
      label: "RPO",
    },
    {
      id: 3,
      label: "Market Research",
    },
    {
      id: 4,
      label: "App Development	",
    },
    {
      id: 5,
      label: "Consultancy",
    },
  ];

  return (
    <>
      <div>
        <Card className="mt-2 w-96 shadow-none">
          <div className="flex items-center justify-center">
            <FaUserLarge className="border-2 rounded-full border-blue-600 lg:ml-2 w-20 h-20 text-blue-gray-900 p-1" />
          </div>
          <Typography
            className="mt-3 font-bold text-center text-xl"
            color="blue-gray"
          >
            {name}
          </Typography>
          <Typography className="text-center text-[#454545] text-sm ">
            {job}
          </Typography>
          <CardBody className="pt-3 overflow-auto max-h-[75vh] container ">
            <div>
              <div>
                <ul className=" space-y-3 mt-4">
                  <li className=" flex  space-x-3">
                    <MdOutlineEmail className=" text-cyan-700" />
                    <Typography className=" text-center text-[#454545] text-sm ">
                      <a href={`mailto:${email}`} className="hover:text-black">
                        {email}
                      </a>
                    </Typography>
                  </li>
                  <li className=" flex  space-x-3">
                    <FaMobileAlt className="text-cyan-700" />
                    <Typography className=" text-center text-[#454545] text-sm ">
                      <a
                        href={`tel:+${cellphone}`}
                        className="hover:text-black"
                      >
                        {cellphone}
                      </a>
                    </Typography>
                  </li>
                  <li className=" flex  space-x-3">
                    <FaRegBuilding className=" text-cyan-800" />
                    <Typography className=" text-[#454545] text-sm ">
                      {company}
                    </Typography>
                  </li>
                  <li className=" flex  space-x-3">
                    <GrLocation className=" text-cyan-800 h-5 w-5" />
                    <Typography className=" text-[#454545] text-sm ">
                      {address}
                    </Typography>
                  </li>
                </ul>
              </div>
            </div>
            <Typography className="mt-7 text-left text-base font-medium text-[#454545]">
              Remarks
            </Typography>
            <Typography className="mt-2 text-sm text-blue-gray-400 ">
              {remarks}
            </Typography>
          </CardBody>
          <CardFooter className="pt-0 flex gap-2 justify-center">
            <LeadInformationModal leadId={leadId} />
          </CardFooter>
          <Typography className=" font-bold text-[#252525] ml-5">
            View Revenue Information
          </Typography>
          <div>
            {serviceApi?.map((obj) => {
              const serviceLabel = listService.find(
                (item) => item.id === obj.service
              );
              return (
                <div
                  key={obj.id}
                  className="grid grid-cols-2 items-center mt-2"
                >
                  <Typography className="text-center">
                    {serviceLabel ? serviceLabel.label : ""}
                  </Typography>
                  <div className=" px-2">
                    {/* <ViewRevenueModal leadId  /> */}
                    <CloseDealRevenueModal
                      leadServices={obj?.id}
                      status={status}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </>
  );
};

export default UserCardProfile;
