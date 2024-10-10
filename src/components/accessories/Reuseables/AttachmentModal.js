import { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
  Input,
} from "@material-tailwind/react";
import { CiStickyNote } from "react-icons/ci";
import { CgAttachment } from "react-icons/cg";
import { FaTrash } from "react-icons/fa";
import { HiDownload } from "react-icons/hi";
import { useAddAttachmentMutation } from "../../../store";
import { toast } from "react-toastify";
// import { upload } from "@testing-library/user-event/dist/upload";
// import { toast } from "react-toastify";

const AttachmentModal = ({ leadId }) => {
  console.log(leadId);
  const [open, setOpen] = useState(false);
  const [addAttachment, { isLoading, isSuccess }] = useAddAttachmentMutation();

  // effect when form submission is success
  useEffect(() => {
    if (isSuccess) {
      setFiles([]);
      setLabel("");
    }
  }, [isSuccess]);

  const handleOpen = () => setOpen(!open);

  const [files, setFiles] = useState([]);
  const [label, setLabel] = useState("");
  const account_detail = JSON.parse(localStorage.getItem("account_detail"));
  console.log(account_detail);

  // handle change of the file
  const handleFileChange = (e) => {
    setFiles([...files, ...e.target.files]);
  };
  // handle delete of file upon selection
  const handleDelete = (index) => {
    setFiles((file) => file.filter((item, i) => i !== index));
  };
  // handle file select
  const handleFileSelect = (e) => {
    e.preventDefault();
    console.log(files);
  };
  // handle submit of file into database
  const handleSubmit = async () => {
    const formData = new FormData();
    for (let x = 0; x < files.length; x++) {
      formData.append("file", files[x]);
    }
    formData.append("lead_info", leadId.leadId.leadId);
    formData.append("label", label);
    formData.append("session", account_detail.full_name);
    formData.append("emp_id", account_detail.employee_id);

    const request = await addAttachment(formData).unwrap();
    // if (request.success === true) {
    //   toast.success(request.message, {
    //     position: "bottom-right",
    //     autoClose: 5000,
    //     hideProgressBar: true,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     progress: undefined,
    //   });
    // } else {
    //   toast.error(request.message, {
    //     position: "bottom-right",
    //     autoClose: 3000,
    //     theme: "colored",
    //     hideProgressBar: true,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     progress: undefined,
    //   });
    // }
    console.log(formData);
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
        <CgAttachment className=" w-4 h-4 mr-2" />
        insert
      </Button>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader className="flex items-center space-x-2 justify-center">
          <CiStickyNote className=" text-cyan-700 h-7 w-7" />
          <Typography className=" text-cyan-600 text-xl font-bold">
            Insert attachment
          </Typography>
        </DialogHeader>
        <DialogBody>
          <div className="container mx-auto p-4">
            <p className="mb-2">Easily upload files with just a few clicks.</p>
            <div className="p-6 rounded-md">
              <Input
                label="Attachment label"
                defaultValue={label}
                onChange={(e) => setLabel(e.target.value)}
                required
              />
              <form onSubmit={handleFileSelect}>
                <div className="my-4 border-dashed border-2 border-gray-300 p-4">
                  <div className="flex flex-col space-y-2 items-center justify-center">
                    <HiDownload className=" w-8 h-8  text-black" />
                    <input
                      type="file"
                      onChange={handleFileChange}
                      multiple
                      className="hidden"
                      id="file-input"
                    />
                    <label
                      htmlFor="file-input"
                      className="cursor-pointer underline text-black font-bold"
                    >
                      Choose a local file
                    </label>
                    <p className="text-gray-500 mt-2">
                      Supported all file formats.
                    </p>
                  </div>
                </div>
                <div>
                  {files.map((obj, index) => (
                    <div key={index} className="flex items-center mb-2">
                      <div>
                        <p className="text-sm">{obj.name}</p>
                        <p className="text-xs text-gray-500">
                          {(obj.size / 1024).toFixed(2)} KB
                        </p>
                      </div>
                      <FaTrash
                        onClick={() => handleDelete(index)}
                        className="ml-auto text-blue-gray-600 hover:text-black cursor-pointer"
                      />
                    </div>
                  ))}
                </div>
              </form>
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
          <Button
            variant="gradient"
            onClick={handleSubmit}
            disabled={isLoading || files.length === 0}
          >
            <span>Submit</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};
export default AttachmentModal;
