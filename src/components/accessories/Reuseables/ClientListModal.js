import { useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
  Input,
  Radio,
} from "@material-tailwind/react";
import { PiNotebookFill } from "react-icons/pi";
import { IoIosSearch } from "react-icons/io";
import {
  useFetchClientListQuery,
  useAddExisitingLeadsMutation,
} from "../../../store";
import { ScaleLoader } from "react-spinners";
import { toast } from "react-toastify";
import DropdownService from "./DropdownService";

const TABLE_HEAD = ["Name", "Email", "Job Title", "Company", "Select"];
const TABLE_ROWS = [{}];

export function CLientListModal({ allLeadsRefetch }) {
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [search, setSearch] = useState("");
  const [client, setClient] = useState(0);
  const [service, setService] = useState(0);

  const clientList = useFetchClientListQuery({
    page: page,
    pageSize: pageSize,
    search: search,
  });

  const [postLeads] = useAddExisitingLeadsMutation();

  console.log(clientList);
  const handleOpen = () => setOpen(!open);

  const totalPage = Math.ceil(clientList.data?.count / pageSize);
  const clientArr = clientList.data?.results;

  const account_detail = JSON.parse(localStorage.getItem("account_detail"));

  // handle next page
  const handlePreviousPage = () => {
    if (page === 1) return;
    setPage(page - 1);
  };

  // handle next page
  const handleNextPage = () => {
    if (totalPage === page) return;
    setPage(page + 1);
  };

  // handle search function
  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };
  // handle onchage of the data
  const handleChange = (e) => {
    setClient(e.target.value);
  };
  const getService = (val) => {
    setService(val);
  };

  //handle save of the data
  const handleSave = async () => {
    const input = {
      client,
      service,
      session: account_detail.full_name,
      lead_owner: account_detail.employee_id,
    };

    console.log(input);

    const existingLeads = await postLeads(input).unwrap();
    if (existingLeads.success === true) {
      toast.success(existingLeads.message, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        progress: undefined,
      });
    } else {
      toast.error(existingLeads.message, {
        position: "bottom-right",
        autoClose: 3000,
        theme: "colored",
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        progress: undefined,
      });
    }
    setClient(0);
    setService(0);
    // setOpen(!open);
    allLeadsRefetch();
  };
  let content;

  if (clientList.isLoading) {
    content = (
      <div className=" flex flex-col items-center my-20">
        <ScaleLoader color="#1565C0" />
        <Typography className=" text-sm text-blue-800 mt-5">Loading</Typography>
      </div>
    );
  } else if (clientList.error) {
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
      <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            {TABLE_HEAD.map((head) => (
              <th
                key={head}
                className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
              >
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {clientArr.map((obj, index) => {
            const isLast = index === TABLE_ROWS.length - 1;
            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

            return (
              <tr key={obj.id}>
                <td className={classes}>
                  <div className="flex items-center gap-3">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-bold"
                    >
                      {obj.full_name}
                    </Typography>
                  </div>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {obj.email}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {obj.job_title}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {obj.company}
                  </Typography>
                </td>
                <td className={classes}>
                  <Radio value={obj.id} name="client" onChange={handleChange} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }

  return (
    <>
      <Button
        onClick={handleOpen}
        color="teal"
        size="sm"
        className=" flex items-center"
      >
        Duplicate leads
        <PiNotebookFill className=" h-4 w-4 ml-2" />
      </Button>
      <Dialog open={open} handler={handleOpen} size="lg">
        <DialogHeader>
          <Typography className=" text-cyan-700 font-bold text-2xl">
            Client List
          </Typography>
        </DialogHeader>
        <DialogBody className="overflow-auto max-h-[60vh] lg:max-h-[70vh] container">
          <div className=" flex justify-between mb-3">
            <DropdownService getService={getService} />
            <div className=" w-72">
              <Input
                label="Search"
                icon={<IoIosSearch className="h-5 w-5" />}
                onKeyUp={handleSearch}
              />
            </div>
          </div>
          <div>{content}</div>
          <div className="flex items-center justify-between border-t border-blue-gray-50 p-4 mt-2">
            <Typography
              variant="small"
              color="blue-gray"
              className="font-normal"
            >
              Page {page} of {totalPage}
            </Typography>
            <div className="flex gap-2">
              <Button
                variant="outlined"
                size="sm"
                onClick={handlePreviousPage}
                disabled={page === 1}
              >
                Previous
              </Button>
              <Button
                variant="outlined"
                size="sm"
                onClick={handleNextPage}
                disabled={page === totalPage}
              >
                Next
              </Button>
            </div>
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
          <Button
            className=" bg-orange-700"
            onClick={handleSave}
            disabled={service === 0}
          >
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
