// import { useState } from "react";
import UncontactedLeadsTable from "../accessories/Sales/UncontactedLeads/UncontactedLeadsTable";
import HeadeCard from "../accessories/Reuseables/HeaderCard";
import { FaPhoneSlash } from "react-icons/fa6";
const UncontactedLeads = () => {
  const icon = <FaPhoneSlash className=" w-8 h-8 text-blue-900" />;
  return (
    <>
      <div className="container lg:w-full">
        <div className="">
          <HeadeCard tab={"Uncontacted Leads"} icon={icon} />
        </div>
        <div className=" w-full mx-3 lg:mx-0 my-2">
          <UncontactedLeadsTable />
        </div>
      </div>
    </>
  );
};

export default UncontactedLeads;
