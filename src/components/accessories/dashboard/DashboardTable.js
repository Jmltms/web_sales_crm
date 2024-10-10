import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Input,
  Typography,
} from "@material-tailwind/react";
import {
  useFetchTableDashboardDataQuery,
  useFetchTotalQuery,
} from "../../../store";
import { useState } from "react";
import DashboardMonthList from "./DashboadMonthList";
import { ScaleLoader } from "react-spinners";
import { IoIosSearch } from "react-icons/io";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";

const TABLE_HEAD = [
  "Client",
  "Company Detail",
  "Source",
  "Service",
  "Status",
  "OTF",
  "MSF",
];
const TABLE_FOOT = ["", "", "", "", "", "", "Total:"];

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

const DashboardTable = () => {
  const [page, setPage] = useState(1);
  const [pageSize] = useState(100);
  const [search, setSearch] = useState("");
  const [startDate, setStartDate] = useState(moment(new Date()).format("YYYY"));
  const [monthsHead] = useState([
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
  ]);
  const [defaultMonth, setDefaultMonth] = useState([
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,
  ]);

  const getMonth = (arr) => {
    if (parseInt(arr) === null) {
      setDefaultMonth([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
    }
    if (parseInt(arr) === 0) {
      setDefaultMonth([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
    }
    if (parseInt(arr) !== 0) {
      setDefaultMonth([parseInt(arr)]);
    }
  };

  const dashboardTable = useFetchTableDashboardDataQuery({
    page,
    pageSize,
    search,
    startDate,
  });
  const arrDashboard = dashboardTable.data?.results;
  const totalPage = Math.ceil(dashboardTable.data?.count / pageSize);
  const totalRevenues = useFetchTotalQuery({ startDate });
  const mapRevenues = totalRevenues.data?.data.months || [];
  const otf_msf = totalRevenues.data?.data.otf_msf || [];

  const combinedArr = mapRevenues.concat(otf_msf);
  let totRevenue = {};
  // Iterate through the combined array
  for (let i = 0; i < combinedArr.length; i++) {
    const item = combinedArr[i];

    if (totRevenue[item.id]) {
      // If the item ID already exists in totRevenue, add the month value
      totRevenue[item.id].month += item.month;
    } else {
      // If the item ID does not exist, create a new entry
      totRevenue[item.id] = {
        id: item.id,
        month: item.month,
      };
    }
  }
  // Convert totRevenue object back to an array
  const resultArray = Object.values(totRevenue);

  const newHead = monthsHead.filter((arr) =>
    defaultMonth.includes(parseInt(arr.id))
  );

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
  };

  // let totalRevenue = 0; //ui computation of total revenue
  // const mapRevenue = arrDashboard?.map((item) => item.revenue);
  const sortedMonths = defaultMonth.sort((a, b) => a - b);

  // const mapTotalRevenue = mapRevenues?.filter(
  //   (revenue) => parseInt(revenue.id) === parseInt(sortedMonths)
  // );
  const mapTotalRevenue = sortedMonths.map((obj) =>
    resultArray?.find((item) => parseInt(item.id) === parseInt(obj))
  );
  // mapTotalRevenue.shift();
  // const filterRevenue = mapRevenue?.filter((item) => item !== "");
  // filterRevenue?.forEach((item) => {
  //   totalRevenue += item;
  // }); //ui computation of total revenue

  let totalAnnualRevenue = 0;
  const mapAnnualRevenue = arrDashboard?.map((item) => item.annual_revenue);

  const filterAnnualRevenue = mapAnnualRevenue?.filter((item) => item !== "-");
  filterAnnualRevenue?.forEach((item) => {
    totalAnnualRevenue += item;
  });

  let content;
  if (dashboardTable.isLoading) {
    content = (
      <div className=" flex flex-col justify-center items-center my-20">
        <ScaleLoader color="#1565C0" />
        <Typography className=" text-sm text-blue-800 mt-5">Loading</Typography>
      </div>
    );
  } else if (dashboardTable.error) {
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
      <>
        {arrDashboard.map((obj, index) => {
          const isLast = index === arrDashboard.length - 1;
          const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
          const statusName = leadStatus.find((item) => item.id === obj.status);
          const sortedMonths = defaultMonth.sort((a, b) => a - b);
          // create empty obj
          let newObj = {};
          for (let i = 0; i < sortedMonths.length; i++) {
            // find if the month is existed in sortedmonths
            const monthArrs = obj.months.find(
              (item) => item.month === sortedMonths[i]
            );
            if (monthArrs) {
              monthArrs.msf
                ? (newObj[i] = {
                    months: i,
                    msf: monthArrs.msf,
                  })
                : (newObj[i] = {
                    months: i,
                    msf: 0,
                  });
            } else {
              newObj[i] = {
                months: i,
                msf: 0,
              };
            }
          }
          const newArr = Object.values(newObj);
          console.log(newArr);
          // const month = obj.months?.map((item) => item.month);
          // const monthTerm = sortedMonths.map((item) => month.includes(item));
          const monthInt = moment(obj.otf_payment).month() + 1;
          // console.log(monthTerm);

          return (
            <tr key={obj.id}>
              <td className={classes}>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  {obj.client}
                </Typography>
              </td>
              <td className={classes}>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  {obj.industry}
                </Typography>
              </td>
              <td className={classes}>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  {obj.source}
                </Typography>
              </td>
              <td className={classes}>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  {obj.service}
                </Typography>
              </td>
              <td className={classes}>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className={`font-normal text-center p-1 rounded-md ${statusName.color}`}
                >
                  {statusName.label}
                </Typography>
              </td>
              <td className={classes}>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal text-green-700"
                >
                  {/* {`₱ ${obj.otf}`} */}
                  {obj.otf
                    ? `₱ ${obj.otf
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`
                    : "-"}
                </Typography>
              </td>
              <td className={classes}>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal text-green-700"
                >
                  {obj.msf
                    ? `₱ ${obj.msf
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`
                    : "-"}
                </Typography>
              </td>
              {newArr.map((item, index) => (
                <td className={classes} key={index}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal text-green-700"
                  >
                    {item.msf !== 0
                      ? `₱ ${item.msf
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`
                      : "-"}
                  </Typography>
                  {index + 1 === monthInt ? (
                    new Date(startDate).getFullYear() ===
                    new Date(obj.otf_payment).getFullYear() ? (
                      <Typography className=" text-xs text-blue-800">
                        {obj.otf
                          ? `₱
                        ${obj.otf
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`
                          : ""}
                      </Typography>
                    ) : (
                      ""
                    )
                  ) : (
                    ""
                  )}
                </td>
              ))}
              <td className={classes}>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal text-green-700"
                >
                  {obj.annual_revenue
                    ? `₱ ${obj.annual_revenue
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`
                    : "-"}
                </Typography>
              </td>
              <td className={classes}>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal text-green-700"
                >
                  {obj.revenue
                    ? `₱ ${obj.revenue
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`
                    : "-"}
                </Typography>
              </td>
            </tr>
          );
        })}
      </>
    );
  }

  return (
    <>
      <div>
        <Card>
          <CardBody className="h-full max-w-[100%] overflow-auto px-0">
            <div className=" flex justify-between h-full items-center p-3">
              <div>
                <Typography className=" text-xl font-bold text-cyan-800">
                  Projected and Actual Revenue Report YTD
                </Typography>
              </div>
              <div className="flex items-center space-x-8 ml-3">
                <DashboardMonthList getMonth={getMonth} />
                <div className="container flex items-center space-x-2  max-h-32 overflow-y-auto">
                  <Typography className=" text-sm">Filter Year</Typography>
                  <DatePicker
                    selected={startDate}
                    onChange={(date) =>
                      setStartDate(moment(date).format("YYYY"))
                    }
                    yearItemNumber={6}
                    showYearPicker
                    dateFormat="yyyy"
                    className=" border border-blue-gray-400 pl-2 rounded-md w-32"
                  />
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
            <table className="w-full min-w-max table-auto text-left">
              <thead>
                <tr>
                  {TABLE_HEAD.map((head) => (
                    <th
                      key={head}
                      className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
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
                  {newHead.map((head) => {
                    return (
                      <th
                        key={head.id}
                        className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                      >
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal leading-none opacity-70"
                        >
                          {head.label}
                        </Typography>
                      </th>
                    );
                  })}
                  <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70"
                    >
                      Annual Revenue
                    </Typography>
                  </th>
                  <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70"
                    >
                      Total Revenue
                    </Typography>
                  </th>
                </tr>
              </thead>
              <tbody>{content}</tbody>
              <tfoot>
                {TABLE_FOOT.map((foot) => (
                  <th
                    key={foot}
                    className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70"
                    >
                      {foot}
                    </Typography>
                  </th>
                ))}
                {mapTotalRevenue?.map((item, index) => {
                  return (
                    <>
                      <th
                        key={index}
                        className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                      >
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="text-sm text-green-800 font-bold"
                        >
                          {item?.month
                            ? `₱ ${item.month
                                .toString()
                                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`
                            : "-"}
                        </Typography>
                      </th>
                    </>
                  );
                })}
                <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                  <Typography className="text-sm text-green-800 font-bold">
                    {totalAnnualRevenue !== 0
                      ? `₱ ${totalAnnualRevenue
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`
                      : "-"}
                  </Typography>
                </th>
                <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                  <Typography className="text-sm text-green-800 font-bold">
                    {totalRevenues.data?.data?.total_revenue.sum !== 0
                      ? `₱ ${totalRevenues.data?.data?.total_revenue.sum
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`
                      : "-"}
                  </Typography>
                </th>
              </tfoot>
            </table>
          </CardBody>
          <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
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
                disabled={page === totalPage || totalPage === 0}
              >
                Next
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};
export default DashboardTable;
