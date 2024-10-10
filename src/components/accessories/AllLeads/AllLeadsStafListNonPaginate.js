import React, { useState } from "react";
import { useFetchNonPaginateStaffQuery } from "../../../store";
import { Button, Spinner, Typography } from "@material-tailwind/react";

const AllLeadsStafListNonPaginate = ({ filterOwner }) => {
  const [owner, setOwner] = useState(0);
  const staffList = useFetchNonPaginateStaffQuery();

  const staffData = staffList.data?.data;
  console.log(staffData);

  // handle select of data from dropdown
  const handleSelect = (e) => {
    setOwner(e.target.value);
  };
  console.log(owner);

  // pass the value to parent function
  filterOwner(owner);
  // condition of fetching the data from api
  let content;
  if (staffList.isLoading) {
    content = (
      <div className="flex space-x-2">
        <Spinner />
        <Typography>Loading...</Typography>
      </div>
    );
  } else if (staffList.error) {
    content = (
      <div>
        <Button onClick={() => window.location.reload()}>Refresh</Button>
      </div>
    );
  } else {
    content = (
      <>
        <div class="relative h-10 w-44">
          <select
            class="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-gray-900 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
            onChange={handleSelect}
          >
            <option selected value={0}>
              All Lead Owner
            </option>
            {staffData.map((obj) => {
              const full_name = obj.first_name + " " + obj.last_name;
              return (
                <option key={obj.id} value={obj.employee_id}>
                  {full_name}
                </option>
              );
            })}
          </select>
          <label class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
            Filter Lead Owner
          </label>
        </div>
      </>
    );
  }
  return <div>{content}</div>;
};

export default AllLeadsStafListNonPaginate;
