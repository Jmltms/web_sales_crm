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
import {
  useDeleteLeadMutation,
  useDeleteNotificationMutation,
} from "../../../store";
import { toast } from "react-toastify";

export function DeleteModal({ leadId, allLeadsRefetchDel, message, notifId }) {
  const [open, setOpen] = React.useState(false);
  const [deleteLeads] = useDeleteLeadMutation();
  const [deleteNotification] = useDeleteNotificationMutation();

  const handleOpen = () => setOpen(!open);
  const account_detail = JSON.parse(localStorage.getItem("account_detail"));

  // function for deleting the leads
  const handleDelete = async () => {
    if (leadId) {
      const data = {
        leadId,
        session: account_detail.employee_id,
      };
      console.log(data);

      const delLead = await deleteLeads(data).unwrap();
      if (delLead.success === true) {
        toast.success(delLead.message, {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          progress: undefined,
        });
      } else {
        toast.error(delLead.message, {
          position: "bottom-right",
          autoClose: 3000,
          theme: "colored",
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          progress: undefined,
        });
      }
      handleOpen(!open);
      allLeadsRefetchDel();
    }
    if (notifId) {
      deleteNotification(notifId);
      handleOpen(!open);
    }
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
        <DialogBody>{message}</DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" onClick={handleDelete}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
