import { useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
} from "@material-tailwind/react";
import { MdEditNote } from "react-icons/md";
import { useAddNotesMutation } from "../../../store";
import { CiStickyNote } from "react-icons/ci";
import { toast } from "react-toastify";

const NotesModal = ({ leadId, noteDataRefetch }) => {
  const [open, setOpen] = useState(false);
  const [note, setNote] = useState("");

  // variable use to add note to api
  const [notes] = useAddNotesMutation();

  const handleOpen = () => setOpen(!open);

  // handle onchage of the text input
  const handleChange = (e) => {
    setNote(e.target.value);
  };

  const handleSave = () => {
    const notesInfo = {
      lead_id: leadId?.leadId,
      message: note,
    };
    const noteData = notes(notesInfo).unwrap();
    if (noteData.success === true) {
      toast.success(noteData.message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        progress: undefined,
      });
    } else {
      toast.error(noteData.message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        progress: undefined,
      });
    }
    noteDataRefetch();
    setNote("");
    setOpen(!open);
  };
  return (
    <>
      <Button
        onClick={handleOpen}
        variant="gradient"
        size="sm"
        className="flex justify-center items-center"
      >
        <MdEditNote className=" w-5 h-5 mr-2" />
        Your Note
      </Button>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader className="flex items-center space-x-2 justify-center">
          <CiStickyNote className=" text-cyan-700 h-7 w-7" />
          <Typography className=" text-cyan-600 text-xl font-bold">
            Write something.
          </Typography>
        </DialogHeader>
        <DialogBody>
          <div className="w-full">
            <div className="relative w-full">
              <textarea
                className="peer h-full min-h-[100px] w-full resize-none rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50"
                placeholder=" "
                defaultValue={note}
                onChange={handleChange}
              ></textarea>
              <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                Your Note
              </label>
            </div>
          </div>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="blue" onClick={handleSave}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};
export default NotesModal;
