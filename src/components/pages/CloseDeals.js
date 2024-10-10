// import { useState } from "react";
import { FaHandshakeSimple } from "react-icons/fa6";
import HeaderCard from "../../components/accessories/Reuseables/HeaderCard";
import CloseDealsTable from "../accessories/Sales/CloseDeals/CloseDealsTable";
// import CloseDealsBoard from "../accessories/Sales/CloseDeals/CloseDealsBoard";
// import { Typography, Button } from "@material-tailwind/react";

const CloseDeals = () => {
  const icon = <FaHandshakeSimple className="w-8 h-8 text-blue-900" />;
  // const [hide, setHide] = useState("hidden");

  // const handleListType = () => {
  //   setHide("hidden");
  // };
  // const handleCardType = () => {
  //   setHide("block");
  // };
  return (
    <div className="container lg:w-full">
      <div>
        <HeaderCard tab={"Closed Deals"} icon={icon} />
        {/* <div className=" flex items-center space-x-3 mt-10">
          {" "}
          <Typography>View As:</Typography>
          <div className=" flex space-x-3">
            <Button
              size="sm"
              variant="outlined"
              disabled={hide === "hidden"}
              onClick={handleListType}
            >
              List Type
            </Button>
            <Button
              size="sm"
              variant="outlined"
              color="orange"
              onClick={handleCardType}
              disabled={hide === "block"}
            >
              Card Type
            </Button>
          </div>
        </div>
        <div className=" mb-3">
          {hide === "hidden" && <CloseDealsTable />}
          {hide === "block" && <CloseDealsBoard />}
        </div> */}
        <div>
          <CloseDealsTable />
        </div>
      </div>
    </div>
  );
};

export default CloseDeals;
