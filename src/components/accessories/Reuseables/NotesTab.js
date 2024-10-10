import { Button, Card, CardBody, Typography } from "@material-tailwind/react";
import NotesModal from "./NotesModal";
import { useFetchleadNotesQuery } from "../../../store";
import { useState } from "react";
import { ScaleLoader } from "react-spinners";
import moment from "moment";
import { FaRegTrashAlt } from "react-icons/fa";

const NotesTab = ({ leadId }) => {
  const [page] = useState(1);
  const [pageSize] = useState(3);
  const leadNote = useFetchleadNotesQuery({
    page: page,
    pageSize: pageSize,
    leadId: leadId.leadId,
  });

  console.log(leadNote);
  const noteData = leadNote.data?.results;

  let content;

  if (leadNote.isLoading) {
    content = (
      <div className=" flex flex-col items-center my-20">
        <ScaleLoader color="#1565C0" />
        <Typography className=" text-sm text-blue-800 mt-5">Loading</Typography>
      </div>
    );
  } else if (leadNote.error) {
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
      <div className=" space-y-5">
        <div>
          {noteData.map((obj) => (
            <div key={obj.id}>
              <div className="flex  space-x-2">
                <Typography variant="h6" color="blue-gray">
                  Noted on:{" "}
                  {moment(obj.date_noted).format("MM-DD-YYYY, h:mm:ss a")}
                </Typography>
              </div>
              <div className=" flex justify-between text-black">
                <Typography>{obj.message}</Typography>
                <div>
                  <FaRegTrashAlt className=" h-5 w-5 cursor-pointer" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return (
    <Card className="w-full">
      <CardBody>
        <div className=" mb-5">
          <NotesModal leadId={leadId} noteDataRefetch={leadNote.refetch} />
        </div>
        {content}
      </CardBody>
    </Card>
  );
};
export default NotesTab;
