import React, { useEffect } from "react";
import AllLeadsTables from "../accessories/AllLeads/AllLeadsTables";
import HeadeCard from "../../components/accessories/Reuseables/HeaderCard";
import { HiMiniUserGroup } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";

const AllLeads = () => {
  const icon = <HiMiniUserGroup className=" w-8 h-8 text-blue-900" />;
  // fetech session detail
  const account_detail = JSON.parse(localStorage.getItem("account_detail"));
  console.log(account_detail);
  const navigate = useNavigate();

  useEffect(() => {
    if (![1, 2].includes(account_detail?.type)) {
      navigate("/index/home");
    }
  }, [account_detail, navigate]);
  return (
    <>
      <div className="container lg:w-full">
        <div className="">
          <HeadeCard tab={"All Leads"} icon={icon} />
          <div className=" w-full mx-4 lg:mx-0 my-2">
            <AllLeadsTables />
          </div>
        </div>
      </div>
    </>
  );
};

export default AllLeads;
