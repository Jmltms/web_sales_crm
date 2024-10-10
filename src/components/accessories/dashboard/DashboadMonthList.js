import { useState } from "react";
// import {
//   Button,
//   Dialog,
//   DialogHeader,
//   DialogBody,
//   DialogFooter,
//   Typography,
//   Checkbox,
// } from "@material-tailwind/react";
// import moment from "moment";

const DashboardMonthList = ({ getMonth }) => {
  const [open, setOpen] = useState(false);
  const month = [
    {
      id: 1,
      label: "January",
    },
    {
      id: 2,
      label: "February",
    },
    {
      id: 3,
      label: "March",
    },
    {
      id: 4,
      label: "April",
    },
    {
      id: 5,
      label: "May",
    },
    {
      id: 6,
      label: "June",
    },
    {
      id: 7,
      label: "July",
    },
    {
      id: 8,
      label: "August",
    },
    {
      id: 9,
      label: "September",
    },
    {
      id: 10,
      label: "October",
    },
    {
      id: 11,
      label: "November",
    },
    {
      id: 12,
      label: "December",
    },
  ];

  // get the previous,current,next month number
  // const currentMonth = moment(new Date()).month() + 1;
  // let lastMonth;
  // if (currentMonth === 1) {
  //   lastMonth = 12;
  // } else {
  //   lastMonth = parseInt(currentMonth) - 1;
  // }
  // const nexMonth = parseInt(currentMonth) + 1;

  // const [selectedMonth, setSelectedMonth] = useState([
  //   lastMonth,
  //   currentMonth,
  //   nexMonth,
  // ]);
  // // onchange of checkbox
  // const handleCheck = (e) => {
  //   const { checked, value } = e.target;

  //   if (checked) {
  //     setSelectedMonth([...selectedMonth, parseInt(value)]);
  //   } else {
  //     const unselectedMonth = selectedMonth.filter(
  //       (arr) => arr !== parseInt(value)
  //     );
  //     setSelectedMonth(unselectedMonth);
  //   }
  // };

  // handle open/close function for modal
  const handleChange = (e) => {
    getMonth(e.target.value);
  };

  return (
    <>
      <div class="relative h-10 w-44">
        <select
          onChange={handleChange}
          class="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-gray-900 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
        >
          <option selected value={0}>
            All Months
          </option>
          {month.map((obj) => (
            <option value={obj.id}>{obj.label}</option>
          ))}
        </select>
        <label class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
          Filter Month
        </label>
      </div>
      {/* <Button onClick={handleOpen} variant="outlined" color="orange" size="sm">
        Select Months
      </Button>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader className=" text-2xl text-cyan-700">
          Select Month to Display
        </DialogHeader>
        <DialogBody>
          <div className=" grid grid-cols-2">
            {month.map((obj) => (
              <div className=" flex items-center justify-between mx-5">
                <div key={obj.id}>
                  <Typography className=" font-medium">{obj.label}</Typography>
                </div>
                <div className="">
                  <Checkbox
                    value={obj.id}
                    onChange={handleCheck}
                    defaultChecked={selectedMonth.includes(obj.id)}
                  />
                </div>
              </div>
            ))}
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
          <Button variant="outlined" color="cyan" onClick={handleOpen}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog> */}
    </>
  );
};
export default DashboardMonthList;
