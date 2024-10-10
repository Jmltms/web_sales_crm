import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  CardFooter,
  Checkbox,
} from "@material-tailwind/react";
import { useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { RiFileExcel2Fill } from "react-icons/ri";
import { useFetchAllLeadsQuery } from "../../../store";
import { ScaleLoader } from "react-spinners";
import AllLeadsAddLeadsModal from "./AllLeadsAddLeadsModal";
import AllLeadsCardModal from "./AllLeadsCardModal";
import AllLeadsExcelAddLeads from "./AllLeadsExcelAddLeads";
import StaffListModal from "../Reuseables/StaffListModal";
import AllLeadsStafListNonPaginate from "./AllLeadsStafListNonPaginate";
import { DeleteModal } from "../Reuseables/DeleteModal";
import { CLientListModal } from "../Reuseables/ClientListModal";
import DropdownSortService from "../Reuseables/DropdownSortService";

const AllLeadsTable = () => {
  const [checkLeads, setCheckLeads] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [status, setStatus] = useState(0);
  const [search, setSearch] = useState("");
  const [ownerId, setOwnerId] = useState(0);
  const [services, setServices] = useState(0);

  const allLeads = useFetchAllLeadsQuery({
    page: page,
    pageSize: pageSize,
    status: status,
    search: search,
    searchOwner: ownerId,
    search_service: services,
  });

  const totalPage = Math.ceil(allLeads.data?.count / pageSize);
  const AllleadsData = allLeads.data?.results;
  console.log(AllleadsData);

  const account_detail = JSON.parse(localStorage.getItem("account_detail"));

  console.log(AllleadsData);
  const TABLE_HEAD = [
    "Name",
    "Email",
    "Mobile",
    "Lead Status",
    "Projected Revenue",
    "Actual Revenue",
    "Lead Owner",
    "Transfer",
  ];

  const leadStatus = [
    { id: 0, color: "", label: "All Status" },
    { id: 1, color: "bg-brown-200", label: "Untouched" },
    { id: 2, color: "bg-lime-200", label: "Qualification" },
    { id: 3, color: "bg-green-200", label: "Follow up" },
    { id: 4, color: "bg-teal-200", label: "Cold leads" },
    { id: 5, color: "bg-cyan-500", label: "Presentation" },
    { id: 6, color: "bg-blue-300", label: "Proposal" },
    { id: 7, color: "bg-indigo-100", label: "Negotiation" },
    { id: 8, color: "bg-yellow-200", label: "Closed deal" },
    { id: 9, color: "bg-amber-400", label: "Lost deal" },
    { id: 10, color: "bg-orange-500", label: "Reassign" },
    { id: 11, color: "bg-red-200", label: "Do not call" },
  ];

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

  // handle searching of data
  const handleSearch = (e) => {
    const val = e.target.value;
    setSearch(val);
    setPage(1);
  };

  // handle onchange of checkbox
  const handleChange = (e) => {
    const { checked, value } = e.target;
    if (checked) {
      setCheckLeads([...checkLeads, value]);
    } else {
      const uncheckLeads = checkLeads.filter(
        (leadsName) => leadsName !== value
      );
      setCheckLeads(uncheckLeads);
    }
  };

  //handle onchage of filter service
  const handleService = (value) => {
    setServices(value);
  };

  //handle onchage of dropdown
  const handleChangeDropDown = (e) => {
    setStatus(e.target.value);
  };

  // update the checkbox after click transfer
  const updateCheckbox = () => {
    setCheckLeads([]);
  };

  // filtering the leadowner
  const filterOwner = (value) => {
    setOwnerId(value);
  };

  const handleDropDown = (e) => {
    setPageSize(e.target.value);
  };

  // condition based on the status of request from api
  let content;
  if (allLeads.isLoading) {
    content = (
      <div className=" flex flex-col items-center my-20">
        <ScaleLoader color="#1565C0" />
        <Typography className=" text-sm text-blue-800 mt-5">Loading</Typography>
      </div>
    );
  } else if (allLeads.error) {
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
            {account_detail.type === 1 ? (
              <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  Delete
                </Typography>
              </th>
            ) : (
              ""
            )}
          </tr>
        </thead>
        <tbody>
          {AllleadsData?.map((obj, index) => {
            const isLast = index === AllleadsData.length - 1;
            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
            const findStatus = leadStatus?.find(
              (item) => item.id === obj.lead_status
            );
            return (
              <tr key={obj.id}>
                <td className={classes}>
                  <div className="flex items-center gap-3">
                    <AllLeadsCardModal
                      name={obj.full_name}
                      email={obj.email}
                      cellphone={obj.phone_num}
                      job={obj.job_title}
                      company={obj.company}
                      address={obj.address}
                      leadId={obj.lead_id}
                      remarks={obj.remarks}
                      status={obj.lead_status}
                      clientId={obj.client_id}
                    />
                  </div>
                </td>
                <td className={classes}>
                  <div className="flex items-center gap-3">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {obj.email}
                    </Typography>
                  </div>
                </td>
                <td className={classes}>
                  <div className="flex items-center gap-3">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {obj.phone_num}
                    </Typography>
                  </div>
                </td>
                <td className={classes}>
                  <div className="flex items-center gap-3">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className={` font-medium p-1 rounded-md ${findStatus.color}`}
                    >
                      {findStatus.label}
                    </Typography>
                  </div>
                </td>
                <td className={classes}>
                  <div className="flex items-center gap-3">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal text-green-800"
                    >
                      {obj.lead_status !== 8
                        ? `₱ ${obj.rev
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`
                        : "N/A"}
                    </Typography>
                  </div>
                </td>
                <td className={classes}>
                  <div className="flex items-center gap-3">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal text-green-800"
                    >
                      {obj.lead_status !== 8
                        ? "N/A"
                        : `₱ ${obj.rev
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}
                    </Typography>
                  </div>
                </td>
                <td className={classes}>
                  <div className="flex items-center gap-3">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal  "
                    >
                      {obj.owner}
                    </Typography>
                  </div>
                </td>

                <td className={classes}>
                  <Checkbox
                    value={obj.id}
                    onChange={handleChange}
                    defaultChecked={checkLeads.includes(obj.id)}
                  />
                </td>

                {account_detail.type === 1 ? (
                  <td className={classes}>
                    <DeleteModal
                      leadId={obj.lead_id}
                      allLeadsRefetchDel={allLeads.refetch}
                      message={"Are you sure you want to this lead?"}
                    />
                  </td>
                ) : (
                  ""
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }

  return (
    <Card className="h-full lg:w-full w-[107%]">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-8 flex items-center justify-between gap-8">
          <div className="flex items-center shrink-0 gap-2 flex-row">
            <AllLeadsAddLeadsModal allLeadsRefetch={allLeads.refetch} />
            <div className="hidden lg:flex">
              <AllLeadsExcelAddLeads csvLeadsRefetch={allLeads.refetch} />
            </div>
            <RiFileExcel2Fill className="ml-2 w-6 h-6 text-green-700 lg:hidden" />
            <div className=" ml-2">
              <CLientListModal allLeadsRefetch={allLeads.refetch} />
            </div>
            <StaffListModal
              checkLeads={checkLeads}
              TransferLeadsrefetch={allLeads.refetch}
              updateCheckbox={updateCheckbox}
            />
          </div>
          <div className=" flex items-center space-x-2">
            <Typography>Page Size:</Typography>
            <select
              className="border border-[#454545]"
              onChange={handleDropDown}
            >
              <option value="10">10</option>
              <option value="50">50</option>
              <option value="75">75</option>
              <option value="100">100</option>
            </select>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className=" flex space-x-3">
            <div class="relative h-10 w-36">
              <select
                class="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-gray-900 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                onChange={handleChangeDropDown}
              >
                {leadStatus.map((obj) => (
                  <option key={obj.id} value={obj.id}>
                    {obj.label}
                  </option>
                ))}
              </select>
              <label class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                Filter Lead Status
              </label>
            </div>
            <DropdownSortService handleService={handleService} />
            <div>
              <AllLeadsStafListNonPaginate filterOwner={filterOwner} />
            </div>
          </div>
          <div className="w-full md:w-72 lg:mr-3 mt-3 lg:mt-0">
            <Input
              label="Search"
              icon={<IoIosSearch className="h-5 w-5" />}
              onKeyUp={handleSearch}
            />
          </div>
        </div>
      </CardHeader>
      <CardBody className="overflow-scroll px-0">{content}</CardBody>
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <Typography variant="small" color="blue-gray" className="font-normal">
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
      </CardFooter>
    </Card>
  );
};

export default AllLeadsTable;
