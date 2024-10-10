import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  CardFooter,
} from "@material-tailwind/react";
import { IoIosSearch } from "react-icons/io";
import { useState } from "react";
import { ScaleLoader } from "react-spinners";
import { useFetchFilterLeadsQuery } from "../../../../store";
import UncontactedLeadsCardModal from "./UncontactedLeadCardModal";
import AddLeadsBtn from "../../AllLeads/AllLeadsAddLeadsModal";
import UncontactedLeadsExcelAddBtn from "./UncontactedLeadsExcelAddBtn";

const TABLE_HEAD = ["Name", "Company", "Email", "Cellphone", "Landline"];

const UncontactedLeadTable = () => {
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [search, setSearch] = useState("");
  const status = 1;

  const account_detail = JSON.parse(localStorage.getItem("account_detail"));
  const ownerInfo = account_detail.employee_id;

  const uncontactedLeads = useFetchFilterLeadsQuery({
    page: page,
    pageSize: pageSize,
    status: status,
    search: search,
    session: ownerInfo,
  });
  const totalPage = Math.ceil(uncontactedLeads.data?.count / pageSize);
  const leadsData = uncontactedLeads.data?.results;
  console.log(uncontactedLeads.data);

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

  // handle searching of data from table
  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  let content;
  if (uncontactedLeads.isLoading) {
    content = (
      <div className=" flex flex-col items-center my-20">
        <ScaleLoader color="#1565C0" />
        <Typography className=" text-sm text-blue-800 mt-5">Loading</Typography>
      </div>
    );
  } else if (uncontactedLeads.error) {
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
          {leadsData?.map((obj, index) => {
            const isLast = index === leadsData.length - 1;
            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

            return (
              <tr key={index}>
                <td className={classes}>
                  <div className="flex items-center gap-3">
                    <div className="flex flex-col">
                      <UncontactedLeadsCardModal
                        name={obj.full_name}
                        email={obj.email}
                        cellphone={obj.phone_num}
                        job={obj.job_title}
                        company={obj.company}
                        address={obj.address}
                        leadId={obj.id}
                        remarks={obj.remarks}
                        status={obj.lead_status}
                      />
                    </div>
                  </div>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal opacity-70"
                  >
                    {obj.company}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal opacity-70"
                  >
                    {obj.email}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal opacity-70"
                  >
                    {obj.phone_num}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal opacity-70"
                  >
                    {obj.tel_num}
                  </Typography>
                </td>
                {/* <td className={classes}>
                  <UncontactedLeadsEditModal />
                </td> */}
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }

  return (
    <Card className="h-full lg:w-full w-[108%]">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-8 flex items-center justify-between gap-8"></div>
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center space-x-2">
            <AddLeadsBtn uncontactedRefetch={uncontactedLeads.refetch} />
            <UncontactedLeadsExcelAddBtn
              csvLeadsRefetch={uncontactedLeads.refetch}
            />
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
            disabled={page === totalPage || totalPage === 0}
          >
            Next
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default UncontactedLeadTable;
