import { Avatar, Card } from "@material-tailwind/react";
import { useState } from "react";
import { AiFillFunnelPlot } from "react-icons/ai";
import { FaPhoneAlt } from "react-icons/fa";
import { FaHandshakeSimple, FaPhoneSlash } from "react-icons/fa6";
import { IoPeopleCircleSharp, IoPersonAddSharp } from "react-icons/io5";
import { MdAssignmentReturn, MdDashboard } from "react-icons/md";
import { PiPresentationChartFill } from "react-icons/pi";
import { Link } from "react-router-dom";
const NavigationTabSm = () => {
  const [openNav, setOpenNav] = useState(false);
  const [show, setShow] = useState("hidden");
  const subNavigation = [
    {
      id: 1,
      path: "sales/uncontacted_list",
      icon: <FaPhoneAlt size={15} className="h-4 w-4 text-white" />,
      name: "Uncontacted Leads",
    },
    {
      id: 2,
      path: "sales/contacted_list",
      icon: <FaPhoneSlash size={19} className="h-5 w-5 text-white" />,
      name: "Contacted Leads",
    },
    {
      id: 3,
      path: "sales/pipeline",
      icon: <AiFillFunnelPlot size={19} className="h-5 w-5 text-white" />,
      name: "Pipeline",
    },
    {
      id: 4,
      path: "sales/close_deals",
      icon: <FaHandshakeSimple size={19} className="h-5 w-5 text-white" />,
      name: "Close Deals",
    },
    {
      id: 5,
      path: "sales/reassign_leads",
      icon: <MdAssignmentReturn size={19} className="h-5 w-5 text-white" />,
      name: "Re-assigned Leads",
    },
  ];

  // function for opening the sub nav
  const handleOpen = () => {
    setOpenNav(!openNav);
    openNav ? setShow("block") : setShow("hidden");
  };
  return (
    <div className="container">
      <Card className="rounded-s-none rounded-e-none w-[100vw] p-3 bg-[#131618]">
        <ul className=" flex justify-center space-x-8 items-center">
          <Link to="dashboard">
            <li className=" flex flex-col justify-center items-center space-y-1 text-blue-gray-300">
              <MdDashboard className="h-8 w-8 text-white" />
              <span className=" text-[.70rem] font-medium">Dashboard</span>
            </li>
          </Link>
          <Link to="all_leads">
            <li className=" flex flex-col justify-center items-center space-y-1 text-blue-gray-300">
              <IoPeopleCircleSharp className="h-8 w-8 text-white" />
              <span className=" text-[.70rem] font-medium">All Leads</span>
            </li>
          </Link>
          <Link to="sales">
            <li
              className="relative flex flex-col justify-center items-center space-y-1 text-blue-gray-300"
              onClick={handleOpen}
            >
              <PiPresentationChartFill className="h-8 w-8 text-white" />
              <span className=" text-[.70rem] font-medium">Sales</span>
            </li>
            <div className={show}>
              <div className=" absolute bottom-20 right-[6.5rem] z-10 bg-[#131618] rounded-lg px-2">
                {subNavigation.map((item) => (
                  <ul key={item.id}>
                    <Link to={item.path}>
                      <li
                        className=" flex space-x-3 items-center space-y-1 p-3 text-blue-gray-300"
                        onClick={handleOpen}
                      >
                        {item.icon}
                        <span className=" text-xs font-medium">
                          {item.name}
                        </span>
                      </li>
                    </Link>
                  </ul>
                ))}
              </div>
            </div>
          </Link>
          <li className=" flex flex-col justify-center items-center space-y-1 text-blue-gray-300">
            <IoPersonAddSharp className="h-8 w-8 text-white" />
            <span className=" text-[.70rem] font-medium">Add User</span>
          </li>
          <li className=" flex flex-col justify-center items-center space-y-1 text-blue-gray-300">
            <Avatar
              variant="circular"
              alt="user 1"
              className="border-2 border-white hover:z-10 focus:z-10"
              src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
            />
          </li>
        </ul>
      </Card>
    </div>
  );
};
export default NavigationTabSm;
