import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Tooltip,
  Button,
} from "@material-tailwind/react";
import { FaRegBookmark } from "react-icons/fa";
import HeaderCard from "../accessories/Reuseables/HeaderCard";
import { IoIosNotifications } from "react-icons/io";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { FaBookmark, FaUserGroup } from "react-icons/fa6";
import {
  useFetchNotificationQuery,
  useSeenNotificationMutation,
} from "../../store";
import { useState } from "react";
import { ScaleLoader } from "react-spinners";
import { DeleteModal } from "../accessories/Reuseables/DeleteModal";
import moment from "moment";

const Notifications = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const account_detail = JSON.parse(localStorage.getItem("account_detail"));

  const notificationApi = useFetchNotificationQuery({
    page,
    pageSize,
    employeeId: account_detail.employee_id,
  });
  const [seenNotification] = useSeenNotificationMutation();

  const notification = notificationApi.data?.results;
  const totalPage = Math.ceil(notificationApi.data?.count / pageSize);
  const icon = (
    <IoIosNotifications className=" w-8 h-8 font-normal text-center text-blue-900" />
  );

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

  // function to set seen the notification
  const handleSeen = (val) => {
    seenNotification(val);
  };

  let content;
  if (notificationApi.isLoading) {
    content = (
      <div className=" flex flex-col items-center my-20">
        <ScaleLoader color="#1565C0" />
        <Typography className=" text-sm text-blue-800 mt-5">Loading</Typography>
      </div>
    );
  } else if (notificationApi.error) {
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
        <div className="mt-5 space-y-3">
          {notification.map((obj) => {
            const borderStyle = obj.is_seen
              ? "flex justify-between items-center border p-4 border-brown-800 rounded-md"
              : "flex justify-between items-center p-4 bg-blue-100 rounded-md";
            return (
              <div className={borderStyle}>
                <div className=" flex items-center space-x-5">
                  <Tooltip content="Mark as read" placement="top-center">
                    <div className=" border-r-2 border-black pr-4 ">
                      <button
                        className="cursor-pointer hover:text-black"
                        disabled={obj.is_seen}
                        onClick={() => handleSeen(obj.id)}
                      >
                        {obj.is_seen ? <FaBookmark /> : <FaRegBookmark />}
                      </button>
                    </div>
                  </Tooltip>
                  <div>
                    <div className=" flex items-center space-x-3">
                      <FaUserGroup />
                      <Typography>-</Typography>
                      <Typography className="text-xs">
                        {moment(obj.date_deliver).format("MM-DD-YYYY HH:mm A")}
                      </Typography>
                      {obj.is_seen ? <IoCheckmarkDoneSharp /> : ""}
                    </div>
                    <Typography className=" text-base text-blue-gray-700">
                      {obj.message}
                    </Typography>
                  </div>
                </div>
                <div>
                  <DeleteModal
                    notifId={obj.id}
                    message={"Are you sure you want to delete this message?"}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </>
    );
  }
  return (
    <>
      <div className="container lg:w-full pb-2">
        <div className="">
          <HeaderCard tab={"Notifications"} icon={icon} />
          <div className=" w-full mx-4 lg:mx-0 my-2">
            <Card className="">
              <CardBody>{content}</CardBody>
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
                    disabled={page === totalPage || totalPage === 0}
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
export default Notifications;
