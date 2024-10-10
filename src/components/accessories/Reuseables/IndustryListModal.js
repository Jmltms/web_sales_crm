import { useState } from "react";
import { Button, Typography, Spinner } from "@material-tailwind/react";
import { useFetchIndustryListQuery } from "../../../store";

const IndustryListModal = ({ getIndustry, getIndustryName }) => {
  const [open, setOpen] = useState(false);
  const [industry, setIndustry] = useState();
  const industryList = useFetchIndustryListQuery();
  //function for opening the modal
  const handleOpen = () => setOpen(!open);

  // function for selection of dropbox
  const handleChangeDropDown = (e) => {
    setIndustry(e.target.value);
  };

  // pass the data into function as props back to parent
  if (getIndustry) {
    getIndustry(industry);
  } else {
    getIndustryName(industry);
  }
  // varible to modify the content based on condition
  let content;
  // conditioning for fetching the data
  if (industryList.isLoading) {
    content = (
      <Button
        onClick={handleOpen}
        variant="outlined"
        color="orange"
        size="sm"
        className="flex items-center space-x-2"
      >
        <Spinner color="orange" />{" "}
        <Typography className=" text-xs font-semibold">
          Industry List
        </Typography>
      </Button>
    );
  } else if (industryList.isError) {
    return (
      <>
        <Button
          onClick={() => window.location.reload()}
          variant="outlined"
          color="orange"
          size="sm"
        >
          Refresh
        </Button>
      </>
    );
  } else {
    const industryData = industryList.data.data;
    content = (
      <>
        <div className="relative h-10 w-full">
          <select
            className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-gray-900 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
            onChange={handleChangeDropDown}
          >
            <option disabled selected>
              Select Industry - - -
            </option>
            {industryData.map((obj) => (
              <option key={obj.id} value={obj.name}>
                {obj.name}
              </option>
            ))}
          </select>
          <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
            Industry
          </label>
        </div>
      </>
    );
  }
  return <>{content}</>;
};
export default IndustryListModal;
