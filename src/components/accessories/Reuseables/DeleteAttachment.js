import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
} from "@material-tailwind/react";
import { MdDelete } from "react-icons/md";
import { useDeleteAttachmentMutation } from "../../../store";

const DeleteAttachment = ({ id, attachmentRefetch }) => {
  const [open, setOpen] = React.useState(false);
  const [deleteAttachment] = useDeleteAttachmentMutation();

  const accountDetail = JSON.parse(localStorage.getItem("account_detail"));
  console.log(accountDetail);

  const handleOpen = () => setOpen(!open);

  // function for deleting the leads
  const handleDel = () => {
    deleteAttachment({ id: id, session: accountDetail.full_name });
    attachmentRefetch();
    handleOpen(!open);
  };

  return (
    <>
      <MdDelete
        onClick={handleOpen}
        className="w-5 h-5 text-center cursor-pointer"
      />
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>
          <Typography className=" text-lg font-bold">Confirm Action</Typography>
        </DialogHeader>
        <DialogBody>Are you sure you want to this attachment?</DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" onClick={handleDel}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};
export default DeleteAttachment;
