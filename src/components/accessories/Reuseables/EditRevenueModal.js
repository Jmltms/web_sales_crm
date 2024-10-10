import { useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Typography,
} from "@material-tailwind/react";
import { FiEdit } from "react-icons/fi";
import {
  useFetchMsfBreakdownQuery,
  useUpdateMsfBreakdownMutation,
} from "../../../store";
import { ScaleLoader } from "react-spinners";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditRevenueModal = (props) => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState([
    {
      id: null,
      newMsf: null,
    },
  ]);
  const handleOpen = () => setOpen(!open);
  const [updateMsf, { isLoading, isSuccess }] = useUpdateMsfBreakdownMutation();

  const msfBreakDownApi = useFetchMsfBreakdownQuery(props.leadServices);
  const msfBreakdown = msfBreakDownApi.data?.data;

  // handle change of the input
  const handleChange = (id, value) => {
    const existingIndex = input.findIndex((item) => item.id === id);
    if (existingIndex !== -1) {
      // save the prev state into varible
      const prevInput = [...input];
      // access the index and add new value to the obj
      prevInput[existingIndex] = { ...prevInput[existingIndex], newMsf: value };
      setInput(prevInput);
    } else {
      setInput([...input, { id: id, newMsf: value }]);
    }
  };

  let adjustedRevenue = 0;

  // filtering not null value
  const isInput = input.filter(
    (item) => item.id !== null && item.newMsf !== null
  );
  if (isInput.length !== 0) {
    let modefiedMsf = 0;
    let newMsfArr = [];
    // let newElement
    for (let i = 0; i < msfBreakdown?.payment.length; i++) {
      let sum = 0;
      const element = msfBreakdown.payment[i];
      const mapIsInput = isInput.map((item) => item.id);
      const newElement = element.breakdown.filter(
        (item) => !mapIsInput.includes(item.term_id)
      );
      // map the msf from array
      const msfSum = newElement.map((item) => item.msf);
      msfSum.forEach((item) => (sum += parseInt(item)));
      // then the sum with be push to new arr
      newMsfArr.push(sum);
    }
    // from new msf array add all of it
    newMsfArr.forEach((item) => (modefiedMsf += parseInt(item)));
    // map revenue only and add all of it
    const inputRev = isInput.map((item) => item.newMsf);
    // from existing sum of msf then add the new msf from new input variable
    inputRev.forEach((item) => (modefiedMsf += parseInt(item)));
    // condition if  otf is not empty
    !msfBreakdown.otf
      ? (adjustedRevenue = modefiedMsf)
      : (adjustedRevenue = modefiedMsf + parseInt(msfBreakdown.otf));
  }

  // fetch the info of the cuurent user
  const account_info = JSON.parse(localStorage.getItem("account_detail"));

  // handle submit function to api
  const handleSubmit = () => {
    const newInput = input.filter(
      (item) => item.id !== null && item.newMsf !== null
    );

    // object of data
    const inputData = {
      leadId: props.leadServices,
      revenue: adjustedRevenue,
      session: account_info.full_name,
      newInput,
    };

    // data will be pass on api
    const adRevenue = updateMsf(inputData).unwrap();
    if (adRevenue.success === true) {
      toast.success(adRevenue.message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        progress: undefined,
      });
    } else {
      toast.error(adRevenue.message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        progress: undefined,
      });
    }
  };

  let content;

  if (msfBreakDownApi.isLoading) {
    content = (
      <div className=" flex flex-col items-center my-20">
        <ScaleLoader color="#1565C0" />
        <Typography className=" text-sm text-blue-800 mt-5">Loading</Typography>
      </div>
    );
  } else if (msfBreakDownApi.error) {
    content = <Typography>Refresh the page..</Typography>;
  } else {
    content = (
      <>
        <div>
          <div className=" py-3 px-4">
            <div className="flex mb-2 items-center justify-between">
              <Typography>
                Lead:{" "}
                <span className=" font-bold">{msfBreakdown.lead_name}</span>
              </Typography>
              <Typography>
                Service offered:{" "}
                <span className=" font-bold">{msfBreakdown.service}</span>
              </Typography>
            </div>
            <div className="border-t border-black  border-dashed pt-2 flex justify-between my-5">
              <Typography className=" text-sm">
                One time fee:{" "}
                <span className=" font-bold text-green-800">
                  {msfBreakdown.otf === null
                    ? " ₱ 0"
                    : ` ₱ ${parseInt(msfBreakdown.otf)
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}
                </span>
              </Typography>
              <Typography className=" text-sm">
                Monthly service fee:{" "}
                <span className=" font-bold text-green-800">
                  {msfBreakdown.msf === null
                    ? " ₱ 0"
                    : ` ₱ ${parseInt(msfBreakdown.msf)
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}
                </span>
              </Typography>
            </div>
            {msfBreakdown.payment.map((obj) => {
              return (
                <div className="mt-5" key={obj.year}>
                  <div className="relative border-b border-black pt-2">
                    <div className="absolute left-0 right-0 top-0 bottom-0">
                      <Typography className="text-sm text-center bg-white mx-56">
                        Year: <span className="font-bold">{obj.year}</span>
                      </Typography>
                    </div>
                  </div>
                  {obj.breakdown.map((item, i) => {
                    return (
                      <div className="flex mx-32 mt-7">
                        <Input
                          key={i}
                          type="number"
                          label={item.months_name}
                          defaultValue={item.msf}
                          className="w-44"
                          onChange={(e) =>
                            handleChange(item.term_id, e.target.value)
                          }
                        />
                      </div>
                    );
                  })}
                </div>
              );
            })}
            <div className="border-t border-black  border-dashed pt-2 flex justify-between my-5">
              <Typography className=" text-sm">
                Previous revenue:{" "}
                <span className=" font-bold text-green-800">
                  {msfBreakdown.revenue === null
                    ? " ₱ 0"
                    : ` ₱ ${parseInt(msfBreakdown.revenue)
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}
                </span>
              </Typography>
              <Typography className=" text-sm">
                Adjusted revenue:{" "}
                <span className=" font-bold text-green-800">
                  {isNaN(adjustedRevenue)
                    ? " ₱ 0"
                    : ` ₱ ${adjustedRevenue
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}
                </span>
              </Typography>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <button onClick={handleOpen} disabled={!msfBreakdown?.msf}>
        <FiEdit className=" w-5 h-5 font-bold text-blue-gray-600 cursor-pointer hover:text-blue-gray-900" />
      </button>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>
          <Typography className=" text-cyan-700 text-2xl">
            Update Service Revenue
          </Typography>
        </DialogHeader>
        <DialogBody className="overflow-auto max-h-[60vh] lg:max-h-[70vh] container ">
          {content}
        </DialogBody>
        <DialogFooter className=" flex justify-between items-center">
          <div>
            {isSuccess && (
              <Typography className=" text-green-600">
                Successfully Updated!
              </Typography>
            )}
          </div>
          <div>
            <Button
              variant="text"
              color="red"
              onClick={handleOpen}
              className="mr-1"
            >
              <span>Close</span>
            </Button>
            <Button
              className="mr-1 bg-orange-700"
              onClick={handleSubmit}
              disabled={isLoading || adjustedRevenue === 0}
            >
              <span>Confirm</span>
            </Button>
          </div>
        </DialogFooter>
      </Dialog>
    </>
  );
};
export default EditRevenueModal;
