import { useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Radio,
  Alert,
  Typography,
  Spinner,
} from "@material-tailwind/react";
import { IoIosSearch } from "react-icons/io";
import { useFetchAccountListQuery } from "../../../store";
import { TbExchange } from "react-icons/tb";
import { useTransferLeadsMutation } from "../../../store";
import { toast } from "react-toastify";

const StaffListModal = ({
  checkLeads,
  TransferLeadsrefetch,
  updateCheckbox,
}) => {
  const [open, setOpen] = useState(false);
  const [pageSize] = useState(5);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState();
  const [select, setSelect] = useState();
  const accountList = useFetchAccountListQuery({
    pageSize: pageSize,
    page: page,
    search_str: search,
  });
  const account_info = JSON.parse(localStorage.getItem("account_detail"));
  // const account_type = account_info.type;

  const totalPage = Math.ceil(accountList.data?.count / pageSize);
  const [transferInfo] = useTransferLeadsMutation();
  //function for opening the modal
  const handleOpen = () => setOpen(!open);
  //function for next the page
  const handleNextPage = () => {
    if (page === totalPage) return;
    setPage(page + 1);
  };
  //function for previous the page
  const handlePreviousPage = () => {
    if (page === 1) return;
    setPage(page - 1);
  };
  // handle searching of the data
  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };
  // function for select of data from radio
  const radioSelect = (e) => {
    setSelect(e.target.value);
  };
  // handle save of data send it to api
  const handleSave = async () => {
    const userId = select.split("-");
    const formData = {
      new_owner: userId[1],
      lead_id: checkLeads,
      session: account_info.full_name,
      sender: account_info.employee_id,
    };
    // console.log(formData);
    const transfer = await transferInfo(formData).unwrap();
    if (transfer.success === true) {
      toast.success(transfer.message, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        progress: undefined,
      });
    } else {
      toast.error(transfer.message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        progress: undefined,
      });
    }
    TransferLeadsrefetch();
    updateCheckbox();
    setOpen(!open);
  };
  // varible to modify the content based on condition
  let content;
  // conditioning for fetching the data
  if (accountList.isLoading) {
    content = (
      <Button
        onClick={handleOpen}
        variant="outlined"
        color="green"
        size="sm"
        className="flex items-center space-x-2"
      >
        <Spinner color="green" />{" "}
        <Typography className=" text-xs font-semibold">
          List of Staff
        </Typography>
      </Button>
    );
  } else if (accountList.isError) {
    return (
      <>
        <Button
          onClick={() => window.location.reload()}
          variant="outlined"
          color="green"
          size="sm"
        >
          Refresh
        </Button>
      </>
    );
  } else {
    const accountListData = accountList.data.results;
    content = (
      <>
        <Button
          size="sm"
          className="ml-2 flex justify-center items-center"
          onClick={handleOpen}
          disabled={checkLeads.length === 0}
        >
          Transfer Leads
          <span>
            <TbExchange className="ml-2 w-4 h-4" />
          </span>
        </Button>
        <Dialog open={open} handler={handleOpen}>
          <DialogHeader>
            <Typography className=" text-2xl font-bold text-orange-800">
              List of Employee
            </Typography>
          </DialogHeader>
          <DialogBody className="">
            <div className=" flex">
              <div className=" w-full mx-10">
                <Input
                  label="Search"
                  icon={<IoIosSearch className="h-5 w-5" />}
                  onKeyUp={handleSearch}
                />
              </div>
            </div>
            <div className="space-y-4 mt-5 mx-10">
              {accountListData.map((obj) => {
                // concat the name and employee id
                const radioValue = obj.full_name + "-" + obj.employee_id;
                return (
                  <Alert
                    variant="outlined"
                    className="py-2 px-1 hover:bg-blue-gray-50 border border-blue-gray-200"
                    key={obj.id}
                  >
                    <div className="flex items-center space-x-3">
                      <Radio
                        name="type"
                        value={radioValue}
                        onChange={radioSelect}
                      />
                      <Typography className="text-sm text-left ml-5">
                        {obj.full_name}
                      </Typography>
                      <Typography>-</Typography>
                      <Typography>{obj.employee_id}</Typography>
                    </div>
                  </Alert>
                );
              })}
            </div>
            <div className=" flex items-center justify-between mx-3 mt-5">
              <div className="flex items-center">
                <Typography className="mr-1">Page</Typography>
                <Typography>
                  {page} <span>of</span> {totalPage}
                </Typography>
              </div>
              <div className=" flex justify-end space-x-2 mr-1">
                <Button
                  size="sm"
                  variant="outlined"
                  onClick={handlePreviousPage}
                  disabled={page === 1}
                >
                  Prev
                </Button>{" "}
                <Button
                  size="sm"
                  variant="outlined"
                  onClick={handleNextPage}
                  disabled={totalPage === page}
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
            <Button variant="gradient" color="green" onClick={handleSave}>
              <span>Confirm</span>
            </Button>
          </DialogFooter>
        </Dialog>
      </>
    );
  }
  return <>{content}</>;
};
export default StaffListModal;
