import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaPhoneAlt } from "react-icons/fa";
import { FaHandshakeSimple, FaPhoneSlash } from "react-icons/fa6";
import { MdArchive, MdAssignmentReturn, MdDashboard } from "react-icons/md";
import { AiFillFunnelPlot } from "react-icons/ai";
import {
  Card,
  Typography,
  List,
  ListItemPrefix,
  Tooltip,
  Badge,
} from "@material-tailwind/react";
import { PiPresentationChartFill } from "react-icons/pi";
import Logo from "./../../../img/Logo.png";
import { useLocation } from "react-router-dom";
import { HiMiniUserGroup } from "react-icons/hi2";
import { IoIosNotifications, IoIosPersonAdd } from "react-icons/io";
import { useCountNotificationQuery } from "../../../store";
import "./../../../App.css";

const NavigationTab = () => {
  const [open, setOpen] = useState(false);
  const [classValue, setClasssValue] = useState("hidden");
  const [hideArchive, setHideArchive] = useState("hidden");
  const [hideAllLeads, setHideAllLeads] = useState("hidden");
  const location = useLocation();
  const { pathname } = location;
  // variable to map all of the sub nav
  const subNavigation = [
    {
      id: 1,
      path: "sales/uncontacted_list",
      icon: <FaPhoneSlash size={19} />,
      name: "Uncontacted Leads",
    },
    {
      id: 2,
      path: "sales/contacted_list",
      icon: <FaPhoneAlt size={15} />,
      name: "Contacted Leads",
    },
    {
      id: 3,
      path: "sales/pipeline",
      icon: <AiFillFunnelPlot size={19} />,
      name: "Pipeline",
    },
    {
      id: 4,
      path: "sales/close_deals",
      icon: <FaHandshakeSimple size={19} />,
      name: "Closed Deals",
    },
    {
      id: 5,
      path: "sales/reassign_leads",
      icon: <MdAssignmentReturn size={19} />,
      name: "Re-assigned Leads",
    },
  ];

  // fetech session detail
  const account_detail = JSON.parse(localStorage.getItem("account_detail"));
  console.log(account_detail);

  // variable for set active class in sales sub nav
  const salesClass = subNavigation.find((p) => "/index/" + p.path === pathname);

  // variable for counting the notification
  const notifCountApi = useCountNotificationQuery(account_detail?.employee_id);

  const notifCount = notifCountApi.data?.data;
  useEffect(() => {
    if (account_detail?.type === 1) {
      setHideArchive("block");
    } else {
      setHideArchive("hidden");
    }

    if ([1, 2].includes(account_detail?.type)) {
      setHideAllLeads("block");
    } else {
      setHideAllLeads("hidden");
    }
  }, [account_detail?.type]);

  // function to open the sub nav
  const handleOpen = () => {
    setOpen(!open);
    !open ? setClasssValue("block") : setClasssValue("hidden");
  };
  return (
    <>
      <Card className=" container py-1 h-[100vh] w-[6rem] border border-[#0156d3] ring-offset-2 ring-2 shadow-lg shadow-blue-gray-100 rounded-none border-s-blue-gray-100">
        <div className=" flex justify-center items-center mb-5 mt-2">
          <img
            src={Logo}
            alt="brand"
            className="h-20 w-20 aspect-square object-contain"
          />
        </div>
        <div className="mt-8 mx-auto space-y-3">
          <Tooltip content="Dashboard" placement="left" className="ml-3">
            <div
              className={
                pathname === "/index/dashboard"
                  ? "p-3 bg-blue-50 text-[#0156d3] flex justify-center rounded-full "
                  : "p-3 text-blue-gray-600 hover:text-[#0156d3] flex flex-col rounded-full"
              }
            >
              <Link to="dashboard">
                <MdDashboard className="w-7 h-7 font-normal text-center" />
              </Link>
            </div>
          </Tooltip>
          <div className={hideAllLeads}>
            <Tooltip content="All Leads" placement="left" className="ml-3">
              <div
                className={
                  pathname === "/index/all_leads"
                    ? "p-3 bg-blue-50 text-[#0156d3] flex justify-center rounded-full"
                    : "p-3 text-blue-gray-600 hover:text-[#0156d3] flex flex-col rounded-full"
                }
              >
                <Link to="all_leads">
                  <HiMiniUserGroup className=" w-7 h-7 font-normal text-center" />
                </Link>
              </div>
            </Tooltip>
          </div>
          <div className="parent relative">
            <div>
              <Link to="sales">
                <Tooltip
                  content="Sales Status"
                  placement="top"
                  className="ml-3"
                >
                  <div
                    className={
                      pathname === "/index/sales" ||
                      pathname === "/index/" + salesClass?.path
                        ? " bg-blue-50 text-[#0156d3] p-3 flex flex-col rounded-full"
                        : "p-3 text-blue-gray-600 hover:text-[#0156d3] flex flex-col rounded-full"
                    }
                  >
                    <PiPresentationChartFill className=" w-7 h-7 font-normal" />
                  </div>
                </Tooltip>
              </Link>
            </div>
            <div className="child">
              <div className="absolute left-[3rem] top-0 z-10 rounded-md bg-white border border-blue-gray-100">
                {subNavigation.map((nav, i) => (
                  <Link key={nav.id} to={nav.path}>
                    <div className="py-1" onClick={handleOpen}>
                      <List className="p-0">
                        <div className=" rounded-s-none flex p-2 text-blue-gray-600 hover:text-[#0156d3]">
                          <ListItemPrefix>{nav.icon}</ListItemPrefix>
                          <Typography className=" text-sm">
                            {nav.name}
                          </Typography>
                        </div>
                      </List>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="pt-1">
            <Tooltip content="Notification" placement="left" className="ml-3">
              <div
                className={
                  pathname === "/index/notification"
                    ? "p-3 bg-blue-50 text-[#0156d3] flex justify-center rounded-full"
                    : "p-3 text-blue-gray-600 hover:text-[#0156d3] flex flex-col rounded-full"
                }
              >
                {notifCount === 0 ? (
                  <Link to="notification">
                    <IoIosNotifications className=" w-7 h-7 font-normal text-center" />
                  </Link>
                ) : (
                  <Badge content={notifCount} withBorder>
                    <Link to="notification">
                      <IoIosNotifications className=" w-7 h-7 font-normal text-center" />
                    </Link>
                  </Badge>
                )}
              </div>
            </Tooltip>
          </div>
          <Tooltip content="Add user" placement="left" className="ml-3">
            <div className="p-3 text-blue-gray-600 hover:text-[#0156d3] flex flex-col rounded-full">
              <IoIosPersonAdd className=" w-7 h-7 font-normal text-center" />
            </div>
          </Tooltip>
          <div className={hideArchive}>
            <Tooltip content="Archive" placement="left" className="ml-3">
              <div
                className={
                  pathname === "/index/archive"
                    ? "p-3 bg-blue-50 text-[#0156d3] flex justify-center rounded-full "
                    : "p-3 text-blue-gray-600 hover:text-[#0156d3] flex flex-col rounded-full"
                }
              >
                <Link to="archive">
                  <MdArchive className="w-7 h-7 font-normal text-center" />
                </Link>
              </div>
            </Tooltip>
          </div>
        </div>
      </Card>
    </>
  );
};

export default NavigationTab;
