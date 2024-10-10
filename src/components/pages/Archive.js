import React, { useEffect, useState } from "react";
import HeadeCard from "../../components/accessories/Reuseables/HeaderCard";
import { MdArchive } from "react-icons/md";
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
import { useNavigate } from "react-router-dom";
import { useFetchDeletedLeadsQuery } from "../../store";
import { ScaleLoader } from "react-spinners";
import ArchiveCardModal from "../accessories/Archive/ArchiveCardModal";

const TABLE_HEAD = ["Name", "Email", "Owner", "Date Deleted"];

const Archive = () => {
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [search, setSearch] = useState("");

  // variable handle data from api
  const deletedLeads = useFetchDeletedLeadsQuery({
    page: page,
    pageSize: pageSize,
    search: search,
  });

  const totalPage = Math.ceil(deletedLeads.data?.count / pageSize);
  console.log(deletedLeads);
  const delLeads = deletedLeads.data?.results;
  // fetech session detail
  const account_detail = JSON.parse(localStorage.getItem("account_detail"));
  const navigate = useNavigate();
  useEffect(() => {
    if (account_detail?.type !== 1) {
      navigate("/index/home");
    }
  }, [account_detail, navigate]);

  const icon = <MdArchive className=" w-8 h-8 text-blue-900" />;

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

  // handle search
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  let content;
  if (deletedLeads.isLoading) {
    content = (
      <div className=" flex flex-col items-center my-20">
        <ScaleLoader color="#1565C0" />
        <Typography className=" text-sm text-blue-800 mt-5">Loading</Typography>
      </div>
    );
  } else if (deletedLeads.error) {
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
        <tbody>
          {delLeads?.map((obj, index) => {
            const isLast = index === delLeads.length - 1;
            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
            return (
              <tr key={obj.id}>
                <td className={classes}>
                  <div className="flex items-center gap-3">
                    <ArchiveCardModal
                      name={obj.name}
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
                      className="font-normal  "
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
                      className="font-normal  "
                    >
                      {obj.owner}
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
                      {obj.date_deleted}
                    </Typography>
                  </div>
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
      <div className="container lg:w-full">
        <div className="">
          <HeadeCard tab={"Archive"} icon={icon} />
          <div className=" w-full mx-4 lg:mx-0 my-2">
            <Card className="h-full w-full">
              <CardHeader
                floated={false}
                shadow={false}
                className="rounded-none"
              >
                <div className="flex items-center justify-end  mr-5">
                  <div className="w-full md:w-72 mt-3">
                    <Input
                      label="Search"
                      icon={<FaMagnifyingGlass className="h-5 w-5" />}
                      onKeyUp={handleSearch}
                    />
                  </div>
                </div>
              </CardHeader>
              <CardBody className="overflow-scroll px-0">{content}</CardBody>
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
                    disabled={page === totalPage}
                  >
                    Next
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default Archive;
