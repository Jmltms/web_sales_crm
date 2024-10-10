import { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Typography,
  Chip,
} from "@material-tailwind/react";
import { useFetchRevenueQuery, useAddRevenueMutation } from "../../../../store";
import { ScaleLoader } from "react-spinners";
import DatePicker from "react-datepicker";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";

const monthList = [
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
];

const CloseDealRevenueModal = ({ leadServices, status }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);
  const revenueData = useFetchRevenueQuery({ id: leadServices });
  console.log(revenueData);
  const revenueInfo = revenueData.data?.data;
  const [fee, setFee] = useState({
    otf: 0,
    msf: 0,
  });
  const [postRevenue] = useAddRevenueMutation();
  // fetch the info of the cuurent user
  const account_info = JSON.parse(localStorage.getItem("account_detail"));
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  // convert start month into int
  const startIntMonth = moment(startDate).month() + 1;
  // convert end month into int
  const endIntMonth = moment(endDate).month() + 1;
  // compute the revenue
  const rangeMonth =
    parseInt(fee.msf) * (parseInt(endIntMonth) - parseInt(startIntMonth)) +
    parseInt(fee.otf);
  // effect for rendering callback
  useEffect(() => {
    // mutate the state
    setFee({
      otf: parseInt(revenueInfo?.otf),
      msf: parseInt(revenueInfo?.msf),
    });
    // conditioning if date are null or not
    if (revenueInfo?.date_start === null && revenueInfo?.date_end === null) {
      setEndDate();
      setStartDate(new Date());
    } else {
      setEndDate(revenueInfo?.date_end);
      setStartDate(revenueInfo?.date_start);
    }
  }, [revenueInfo]);
  // handle change of input
  const handleChange = (e) => {
    setFee({ ...fee, [e.target.name]: e.target.value });
  };
  let monthsTerm = [];
  // loop to mutate the month to display
  for (
    let index = parseInt(startIntMonth);
    index <= parseInt(endIntMonth);
    index++
  ) {
    const element = monthList[index - 1];
    monthsTerm.push(element);
  }

  // handle save data to api
  const handleUpdate = () => {
    // map the month ranges
    const monthLen = monthsTerm.map((obj) => obj.month);
    fee.month_start = parseInt(startIntMonth);
    fee.month_end = parseInt(endIntMonth);
    fee.months = monthLen;
    fee.prevenue = rangeMonth;
    fee.session = account_info.full_name;
    fee.id = leadServices;
    fee.date_start = moment(startDate).format("YYYY-MM-DD");
    fee.date_end = moment(endDate).format("YYYY-MM-DD");
    console.log(fee);

    const addRevenue = postRevenue(fee).unwrap();
    if (addRevenue.success === true) {
      toast.success(addRevenue.message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        progress: undefined,
      });
    } else {
      toast.error(addRevenue.message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        progress: undefined,
      });
    }
    setOpen(!open);
  };

  let revenueDisplay;
  if (isNaN(rangeMonth)) {
    revenueDisplay = 0;
  } else if (parseInt(rangeMonth) === parseInt(revenueInfo?.revenue)) {
    revenueDisplay = 0;
  } else {
    revenueDisplay = rangeMonth;
  }
  let content;
  if (revenueData.isLoading) {
    content = (
      <div className=" flex flex-col items-center my-20">
        <ScaleLoader color="#1565C0" />
        <Typography className=" text-sm text-blue-800 mt-5">Loading</Typography>
      </div>
    );
  } else if (revenueData.error) {
    content = <Typography>Refresh the page..</Typography>;
  } else {
    content = (
      <>
        <div>
          <div className=" py-3 px-8 space-y-3">
            <div className=" flex items-center justify-end">
              <Typography>
                Service Offered:{" "}
                <span className=" font-bold">{revenueInfo.service}</span>
              </Typography>
            </div>
            <div>
              <Typography>
                {status === 8 ? "Actual Revenue:" : "Projected Revenue:"}
                <span className=" text-xl font-bold text-green-700">
                  {revenueInfo.revenue === null
                    ? " ₱ 0"
                    : ` ₱ ${parseInt(revenueInfo.revenue)}`}
                </span>
              </Typography>
              <Typography>
                Adjusted Revenue:
                <span className=" text-xl font-bold text-green-700">
                  {` ₱ ${revenueDisplay}`}
                </span>
              </Typography>
            </div>
            <Input
              label="One Time Fee"
              defaultValue={
                !revenueInfo.otf ? "0" : `${parseFloat(revenueInfo.otf)}`
              }
              name="otf"
              onChange={handleChange}
            />
            <Input
              label="Monthly Service Fee"
              defaultValue={
                !revenueInfo.msf ? "0" : `${parseFloat(revenueInfo.msf)}`
              }
              name="msf"
              onChange={handleChange}
            />
            <Typography className=" pt-3">Contract Duration</Typography>
            <div className="flex justify-between items-center">
              <div className=" block items-center">
                <Typography className=" text-sm">Start:</Typography>
                <DatePicker
                  selected={startDate}
                  className=" border border-blue-gray-400 pl-2 rounded-md"
                  onChange={(date) => setStartDate(date)}
                  selectsEnd
                  startDate={startDate}
                  endDate={endDate}
                  placeholderText="Start"
                />
              </div>
              <div className="block items-center">
                <Typography className="text-sm">End:</Typography>
                <DatePicker
                  selected={endDate}
                  className=" border border-blue-gray-400 pl-2 rounded-md"
                  onChange={(date) => setEndDate(date)}
                  selectsEnd
                  startDate={startDate}
                  endDate={endDate}
                  placeholderText="End"
                />
              </div>
            </div>
            <Typography className=" pt-3">Breakdown in Months</Typography>
            <div className="  flex flex-wrap gap-2">
              {monthsTerm?.map((obj) => (
                <Chip
                  variant="ghost"
                  key={obj?.id}
                  value={obj?.name}
                  size="lg"
                />
              ))}
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Button
        onClick={handleOpen}
        // className=" bg-orange-800"
        className=" bg-blue-700"
        size="sm"
        disabled={status === 1}
      >
        View
      </Button>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>
          <Typography className=" text-cyan-700 text-2xl">
            Service Revenue Information
          </Typography>
        </DialogHeader>
        <DialogBody className="overflow-auto max-h-[60vh] lg:max-h-[70vh] container ">
          {content}
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
          <Button onClick={handleUpdate} className="mr-1 bg-orange-700">
            <span>Update</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};
export default CloseDealRevenueModal;
