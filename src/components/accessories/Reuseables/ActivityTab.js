import { Button, Card, CardBody, Typography } from "@material-tailwind/react";
import { useFetchleadActivityQuery } from "../../../store";
import { useState } from "react";
import { ScaleLoader } from "react-spinners";
import moment from "moment";

const ActivityTab = ({ leadId }) => {
  const [page, setPage] = useState(1);
  const [pageSize] = useState(5);
  const leadActivity = useFetchleadActivityQuery({
    page: page,
    pageSize: pageSize,
    leadId: leadId.leadId,
  });
  console.log(leadId);

  const totalPage = Math.ceil(leadActivity.data?.count / pageSize);

  // const handle previous page
  const handlePrevious = () => {
    if (page === 1) return;
    setPage(page - 1);
  };

  // const handle next page
  const handleNext = () => {
    if (totalPage === page) return;
    setPage(page + 1);
  };

  let leadAct = leadActivity.data?.results;
  let content;
  if (leadActivity.isLoading) {
    content = (
      <div className=" flex flex-col items-center my-20">
        <ScaleLoader color="#1565C0" />
        <Typography className=" text-sm text-blue-800 mt-5">Loading</Typography>
      </div>
    );
  } else if (leadActivity.error) {
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
      <div className=" space-y-4">
        {leadAct.map((obj) => (
          <div key={obj.id} className="">
            <Typography color="blue-gray" className=" text-base font-bold">
              {moment(obj.date_generated).format("MM-DD-YYYY, h:mm:ss a")}
            </Typography>
            <Typography className=" text-sm">{obj.message}</Typography>
          </div>
        ))}
      </div>
    );
  }
  return (
    <Card className="w-full">
      <CardBody>
        {content}
        <div className="flex justify-between items-center mt-8">
          <div className=" flex">
            <Typography>Page: </Typography>
            <Typography className=" ml-2">
              {page} of {totalPage}
            </Typography>
          </div>
          <div className=" flex space-x-2">
            <Button
              size="sm"
              onClick={handlePrevious}
              variant="outlined"
              disabled={page === 1}
            >
              Previous
            </Button>
            <Button
              size="sm"
              onClick={handleNext}
              variant="outlined"
              disabled={page === totalPage || totalPage === 0}
            >
              Next
            </Button>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};
export default ActivityTab;
