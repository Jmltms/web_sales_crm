import { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
  Input,
  Card,
  Spinner,
} from "@material-tailwind/react";
import DatePicker from "react-datepicker";
import { MdOutlineDelete } from "react-icons/md";
import { useAddRevenueMutation } from "../../../../store";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import { useFetchRevenueQuery } from "../../../../store";

const CloseDealViewRevenueModal = ({ leadId }) => {
  const [open, setOpen] = useState(false);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const revenueData = useFetchRevenueQuery({ id: leadId });
  console.log(revenueData);
  const [month, setMonth] = useState({
    start: undefined,
    end: undefined,
  });
  const [input, setInput] = useState({
    otf: 0,
    msf: 0,
    service: "",
  });
  const [monthList] = useState([
    {
      month: 1,
      name: "January",
    },
    {
      month: 2,
      name: "February",
    },
    {
      month: 3,
      name: "March",
    },
    {
      month: 4,
      name: "April",
    },
    {
      month: 5,
      name: "May",
    },
    {
      month: 6,
      name: "June",
    },
    {
      month: 7,
      name: "July",
    },
    {
      month: 8,
      name: "August",
    },
    {
      month: 9,
      name: "September",
    },
    {
      month: 10,
      name: "October",
    },
    {
      month: 11,
      name: "November",
    },
    {
      month: 12,
      name: "December",
    },
  ]);

  const revenueD = revenueData.data?.data;

  // useEffect for save the int type of month
  useEffect(() => {
    if (startDate && endDate) {
      const startM = moment(startDate).month() + 1;
      const endM = moment(endDate).month() + 1;
      setMonth({ start: startM, end: endM });
    }
  }, [startDate, endDate]);

  // variable for submit the data to api
  const [revenue] = useAddRevenueMutation();

  // function for toggle the modal
  const handleOpen = () => setOpen(!open);

  // handle onchange of the input
  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  // computation to get the total of projectd revenue
  const startMoment = moment(startDate, "MM/YYYY");
  const endMoment = moment(endDate, "MM/YYYY");
  const monthRange = endMoment.diff(startMoment, "months") + 1;
  const projected_revenue = monthRange * input.msf;

  let content;
  let cardContent = [];
  for (
    let index = revenueD?.month_start;
    index <= revenueD?.month_end;
    index++
  ) {
    const element = monthList[index - 1];
    cardContent.push(element);
  }
  // fetch the info of the cuurent user
  const account_info = JSON.parse(localStorage.getItem("account_detail"));

  // handle saving of data and sent to back end
  const handleDate = () => {
    let element;
    let arr = [];
    for (let index = month.start; index <= month.end; index++) {
      element = monthList[index - 1];
      arr.push(element);
    }
    const monthInt = arr.map((obj) => obj.month);
    const contractStart = moment(startDate).format("YYYY-MM-DD");
    const contractEnd = moment(endDate).format("YYYY-MM-DD");
    input.lead = leadId;
    input.date_end = contractEnd;
    input.date_start = contractStart;
    input.month = monthInt;
    input.month_start = month.start;
    input.month_end = month.end;
    input.prevenue = projected_revenue;
    input.session = account_info.full_name;

    console.log(input);
    const postRevenue = revenue(input).unwrap();
    if (postRevenue.success === true) {
      toast.success(postRevenue.message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        progress: undefined,
      });
    } else {
      toast.error(postRevenue.message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        progress: undefined,
      });
    }
  };

  if (revenueData.isLoading) {
    content = (
      <Button size="sm" className="flex items-center bg-orange-800">
        <Spinner color="white" className=" w-4 h-4" />
        <Typography className=" text-xs font-semibold text-white ml-1">
          View Revenue
        </Typography>
      </Button>
    );
  } else if (revenueData.error) {
    content = (
      <>
        <Button onClick={handleOpen} className=" bg-orange-800" size="sm">
          View Revenue
        </Button>
        <Dialog open={open} handler={handleOpen}>
          <DialogHeader className=" flex justify-center">
            <Typography className=" text-cyan-700 text-2xl font-bold">
              Revenue Information
            </Typography>
          </DialogHeader>
          <DialogBody className="overflow-auto max-h-[60vh] lg:max-h-[70vh] container">
            <div className="relative mb-5">
              <select
                className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-gray-900 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                onChange={handleChange}
                name="service"
              >
                <option selected disabled>
                  Select Sevice Offered - - -
                </option>
                <option value="Back Office">Back Office</option>
                <option value="RPO">RPO</option>
                <option value="Market Research">Market Research</option>
                <option value="App Development">App Development</option>
                <option value="Consultancy">Consultancy</option>
              </select>
              <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                Service Offered
              </label>
            </div>
            <div className="flex space-x-2 mb-4">
              <Input
                label="One Time Fee"
                name="otf"
                type="number"
                onChange={handleChange}
              />
              <Input
                label="Monthly Service Fee"
                name="msf"
                type="number"
                onChange={handleChange}
              />
            </div>
            <Typography className=" text-center text-blue-gray-800 my-3">
              ---Contract---
            </Typography>
            <div className="flex justify-between items-center mx-11">
              <div className=" flex items-center space-x-2">
                <Typography className=" text-sm">Start:</Typography>
                <DatePicker
                  selected={startDate}
                  className=" border border-blue-gray-400 pl-2 rounded-md"
                  onChange={(date) => setStartDate(date)}
                  selectsEnd
                  startDate={startDate}
                  endDate={endDate}
                  dateFormat="MM/yyyy"
                  showMonthYearPicker
                />
              </div>
              <div className="flex items-center space-x-2">
                <Typography className="text-sm">End:</Typography>
                <DatePicker
                  selected={endDate}
                  className=" border border-blue-gray-400 pl-2 rounded-md"
                  onChange={(date) => setEndDate(date)}
                  selectsEnd
                  startDate={startDate}
                  endDate={endDate}
                  dateFormat="MM/yyyy"
                  showMonthYearPicker
                />
              </div>
            </div>
            <div className="ml-10 mt-6">
              <Typography>
                Projected Revenue:{" "}
                <span className=" font-bold">
                  {!projected_revenue ? "" : `₱ ${projected_revenue}`}
                </span>
              </Typography>
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
            <Button variant="gradient" color="green" onClick={handleDate}>
              <span>Confirm</span>
            </Button>
          </DialogFooter>
        </Dialog>
      </>
    );
  } else {
    content = (
      <>
        <Button onClick={handleOpen} className=" bg-orange-800" size="sm">
          View Revenue
        </Button>
        <Dialog open={open} handler={handleOpen}>
          <DialogHeader className=" flex justify-center">
            <Typography className=" text-cyan-700 text-2xl font-bold">
              Revenue Information
            </Typography>
          </DialogHeader>
          <DialogBody className="overflow-auto max-h-[60vh] lg:max-h-[70vh] container">
            <div className="flex space-x-2 mb-4">
              <Input
                label="One Time Fee"
                name="otf"
                type="number"
                value={parseInt(revenueD.otf)}
                onChange={handleChange}
              />
              <Input
                label="Monthly Service Fee"
                name="msf"
                type="number"
                value={parseInt(revenueD.msf)}
                onChange={handleChange}
              />
            </div>
            <Typography className=" text-center text-blue-gray-800 my-3">
              ---Contract---
            </Typography>
            <div className="flex justify-between items-center mx-11">
              <div className=" flex items-center space-x-2">
                <Typography className=" text-sm">Start:</Typography>
                <Typography>
                  {moment(revenueD.date_start).format("YYYY-MM")}
                </Typography>
              </div>
              <div className="flex items-center space-x-2">
                <Typography className="text-sm">End:</Typography>
                <Typography>
                  {moment(revenueD.date_end).format("YYYY-MM")}
                </Typography>
              </div>
            </div>
            <div className="ml-10 mt-6">
              <Typography>
                Projected Revenue:{" "}
                <span className=" font-bold">
                  {parseInt(revenueD?.projected_revenue)}
                </span>
              </Typography>
            </div>
            <div className=" grid grid-cols-2 mx-10 gap-3">
              {cardContent?.map((obj) => (
                <Card className=" border-t-2" key={obj?.month}>
                  <div className=" flex justify-end">
                    <MdOutlineDelete className=" w-6 h-6 text-orange-800 mr-2 mt-2" />
                  </div>
                  <div className=" flex justify-center items-center space-x-1">
                    <Typography className=" text-2xl font-bold text-blue-800">
                      {`₱ ${parseInt(revenueD.msf)}`}
                    </Typography>
                    <Typography className=" text-sm">/month</Typography>
                  </div>
                  <Typography className="text-sm text-center mb-5 font-bold">
                    {obj?.name}
                  </Typography>
                </Card>
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
              <span>Cancel</span>
            </Button>
          </DialogFooter>
        </Dialog>
      </>
    );
  }
  return <>{content}</>;
};

export default CloseDealViewRevenueModal;
