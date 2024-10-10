import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  CardFooter,
} from "@material-tailwind/react";
import { useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { useFetchClosedLeadsQuery } from "../../../../store";
import { ScaleLoader } from "react-spinners";
import CloseDealsCardModal from "./CloseDealsCardModal";
import DropdownSortService from "../../Reuseables/DropdownSortService";

const TABLE_HEAD = [
  "Name",
  "Email",
  "Cellphone",
  "Company",
  "Service",
  "Revenue",
];

// const service = [
//   { id: 1, label: "Back Office" },
//   { id: 2, label: "RPO" },
//   { id: 3, label: "Market Research" },
//   { id: 4, label: "App Development" },
//   { id: 5, label: "Consultancy" },
// ];

const Tables = () => {
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [search, setSearch] = useState("");
  const [service, setService] = useState([]);
  const [searchService] = useState(0);

  const account_detail = JSON.parse(localStorage.getItem("account_detail"));
  const ownerInfo = account_detail.employee_id;

  const closeDeals = useFetchClosedLeadsQuery({
    page: page,
    pageSize: pageSize,
    search: search,
    session: ownerInfo,
    search_service: searchService,
  });

  const totalPage = Math.ceil(closeDeals.data?.count / pageSize);
  const closeLeads = closeDeals.data?.results;
  console.log(closeLeads);

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

  //handle onchage of dropdown
  // const handleChangeDropdown = (e) => {
  //   setSearchService(e.target.value);
  // };
  // handle search
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleFilterService = (val) => {
    setService(val);
  };

  console.log(service);

  let totalRevenue = 0;
  const revenue = closeLeads?.map((obj) => obj.rev);
  revenue?.forEach((num) => (totalRevenue += num));

  let content;
  if (closeDeals.isLoading) {
    content = (
      <div className=" flex flex-col items-center my-20">
        <ScaleLoader color="#1565C0" />
        <Typography className=" text-sm text-blue-800 mt-5">Loading</Typography>
      </div>
    );
  } else if (closeDeals.error) {
    content = <Typography>Refresh the page</Typography>;
  } else {
    content = (
      <>
        {closeLeads?.map((obj, index) => {
          const isLast = index === closeLeads.length - 1;
          const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
          const serviceName = service.find(
            (item) => parseInt(item.id) === parseInt(obj.service)
          );
          // console.log(obj.service + "sdsdsd" + service);

          return (
            <tr key={obj.id}>
              <td className={classes}>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-3">
                    <CloseDealsCardModal
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
                </div>
              </td>
              <td className={classes}>
                <div className="flex items-center gap-3">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal  "
                  >
                    {obj.email}
                  </Typography>
                </div>
              </td>
              <td className={classes}>
                <div className="flex flex-col">
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
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  {obj.company}
                </Typography>
              </td>
              <td className={classes}>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  {serviceName ? serviceName?.name : ""}
                </Typography>
              </td>
              <td className={classes}>
                <Typography
                  variant="small"
                  className="font-normal text-green-800"
                >
                  ₱ {obj.rev.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </Typography>
              </td>
            </tr>
          );
        })}{" "}
      </>
    );
  }

  return (
    <Card className="h-full lg:w-full w-[107%] lg:mt-3">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-8 flex items-center justify-between gap-8">
          {/* <div className="flex shrink-0 gap-2 flex-row"></div> */}
        </div>
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className=" flex  items-center space-x-2">
            <Typography className=" text-sm">Sort By:</Typography>
            <DropdownSortService handleFilterService={handleFilterService} />
          </div>
          <Typography>
            Total Revenue:{" "}
            <span className=" text-green-800 font-bold">
              ₱ {totalRevenue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </span>
          </Typography>
          <div className="w-full md:w-72 lg:mr-3 mt-3 lg:mt-0">
            <Input
              label="Search"
              icon={<IoIosSearch className="h-5 w-5" />}
              onKeyUp={handleSearch}
            />
          </div>
        </div>
      </CardHeader>
      <CardBody className="overflow-scroll px-0">
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
          <tbody>{content}</tbody>
        </table>
      </CardBody>
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
            disabled={page === totalPage || totalPage === 0}
          >
            Next
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default Tables;
