import { Button, Card, CardBody, Typography } from "@material-tailwind/react";
import AttachmentModal from "./AttachmentModal";
import { FaTrash } from "react-icons/fa";
import { useFetchAttachmentQuery } from "../../../store";
import { useState } from "react";
import { ScaleLoader } from "react-spinners";
import moment from "moment";
import { toast } from "react-toastify";
import DeleteAttachment from "./DeleteAttachment";

const AttachmentTab = (leadId) => {
  const domainEnv = process.env.REACT_APP_API_DOMAIN;
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const attachmentApi = useFetchAttachmentQuery({
    page,
    pageSize,
    id: leadId.leadId.leadId,
  });
  const attachmentApiArr = attachmentApi.data?.results;

  const totalPage = Math.ceil(attachmentApi.data?.count / pageSize);

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

  let content;
  if (attachmentApi.isLoading) {
    content = (
      <div className=" flex flex-col items-center my-20">
        <ScaleLoader color="#1565C0" />
        <Typography className=" text-sm text-blue-800 mt-5">Loading</Typography>
      </div>
    );
  } else if (attachmentApi.error) {
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
      <div>
        <div className=" mb-5">
          <AttachmentModal leadId={leadId} />
        </div>
        <div className=" space-y-3">
          {attachmentApiArr.map((obj, index) => {
            const attachmentLink = domainEnv + "" + obj.file;
            const isLabel = attachmentApiArr.find(
              (item) => item.label === undefined
            );
            return (
              <div className=" flex justify-between items-center" key={index}>
                <div>
                  <div className="flex space-x-2 text-blue-gray-400">
                    <Typography className=" text-xs">Details:</Typography>
                    <div className="flex items-center space-x-1 text-blue-gray-400">
                      <Typography className=" text-xs">{obj.label}</Typography>
                      <Typography className=" text-xs">-</Typography>
                      <Typography className=" text-xs">
                        {moment(obj.date_inserted).format("MM-DD-YYYY")}
                      </Typography>
                    </div>
                  </div>
                  <div className=" flex items-center space-x-3">
                    <Typography className=" text-sm">Attachment:</Typography>
                    <a
                      href={attachmentLink}
                      target="_blank"
                      rel="noreferrer"
                      className=" text-blue-600 text-sm"
                    >
                      {attachmentLink}
                    </a>
                  </div>
                </div>
                <div>
                  <DeleteAttachment
                    id={obj.id}
                    attachmentRefetch={attachmentApi.refetch}
                  />
                </div>
              </div>
            );
          })}
        </div>
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
      </div>
    );
  }
  return (
    <>
      <Card className="w-full">
        <CardBody>{content}</CardBody>
      </Card>
    </>
  );
};
export default AttachmentTab;
