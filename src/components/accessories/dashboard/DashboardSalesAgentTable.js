import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  CardFooter,
} from "@material-tailwind/react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { useFetchAgentReportQuery } from "../../../store";
import { useState } from "react";
import { ScaleLoader } from "react-spinners";

const TABLE_HEAD = [
  "Name",
  "No. of Leads",
  "Pipeline",
  "Projected",
  "Actual",
  "Total",
];

const TABLE_ROWS = [];

const DashboardSalesAgent = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState("");
  const agentApi = useFetchAgentReportQuery({
    page,
    pageSize,
    search,
  });

  const agentArr = agentApi.data?.results;
  const totalPage = Math.ceil(agentApi.data?.count / pageSize);

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

  let content;

  if (agentApi.isLoading) {
    content = (
      <div className=" flex flex-col justify-center items-center my-20">
        <ScaleLoader color="#1565C0" />
        <Typography className=" text-sm text-blue-800 mt-5">Loading</Typography>
      </div>
    );
  } else if (agentApi.error) {
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
        {agentArr.map((obj, index) => {
          const isLast = index === TABLE_ROWS.length - 1;
          const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

          return (
            <tr key={index}>
              <td className={classes}>
                <div className="flex items-center gap-3">
                  <div className="flex flex-col">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal opacity-70"
                    >
                      {obj.name}
                    </Typography>
                  </div>
                </div>
              </td>
              <td className={classes}>
                <div className="flex items-center gap-3">
                  <div className="flex flex-col">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal opacity-70"
                    >
                      {obj.total}
                    </Typography>
                  </div>
                </div>
              </td>
              <td className={classes}>
                <div className="flex items-center gap-3">
                  <div className="flex flex-col">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal text-green-700"
                    >
                      {obj.pipeline}
                    </Typography>
                  </div>
                </div>
              </td>
              <td className={classes}>
                <div className="flex items-center gap-3">
                  <div className="flex flex-col">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal text-green-700"
                    >
                      {obj.projected
                        ? `₱ ${obj.projected
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`
                        : "-"}
                    </Typography>
                  </div>
                </div>
              </td>
              <td className={classes}>
                <div className="flex items-center gap-3">
                  <div className="flex flex-col">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal text-green-700"
                    >
                      {obj.actual
                        ? `₱ ${obj.actual
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`
                        : "-"}
                    </Typography>
                  </div>
                </div>
              </td>
              <td className={classes}>
                <div className="flex items-center gap-3">
                  <div className="flex flex-col">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal text-green-700"
                    >
                      {obj.total_rev
                        ? `₱ ${obj.total_rev
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`
                        : "-"}
                    </Typography>
                  </div>
                </div>
              </td>
            </tr>
          );
        })}
      </>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="flex">
          <div className="w-full">
            <Typography className="ml-3 text-xl font-bold text-cyan-800">
              Sales Department Performance Report
            </Typography>
          </div>
        </div>
      </CardHeader>
      <CardBody className="overflow-scroll px-0">
        <table className="mt-4 w-full min-w-max table-auto text-left">
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
export default DashboardSalesAgent;
