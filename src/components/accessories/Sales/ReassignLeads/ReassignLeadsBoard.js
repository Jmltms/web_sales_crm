import { useEffect, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import ReassignLeadsColumn from "./ReassignLeadsColumn";
import { Input } from "@material-tailwind/react";
import { IoIosSearch } from "react-icons/io";
import { useFetchPrioLeadsQuery } from "../../../../store/api/ClientApi";
import { useUpdataLeadStatusMutation } from "../../../../store/api/ClientApi";
import { toast } from "react-toastify";

const ReassignLeadsBoard = () => {
  const [page] = useState(1);
  const [pageSize] = useState(10);
  const status = 5;
  const account_detail = JSON.parse(localStorage.getItem("account_detail"));
  const ownerInfo = account_detail.employee_id;
  const [updateStatus] = useUpdataLeadStatusMutation();

  const reAssignLeads = useFetchPrioLeadsQuery({
    page: page,
    pageSize: pageSize,
    statusLabel: status,
    session: ownerInfo,
  });

  console.log(reAssignLeads);

  const [lostDeals, setlostDeals] = useState();
  const [reAssign, setReAssign] = useState();
  const [doNotCall, setDoNotCall] = useState();

  useEffect(() => {
    // condition for fetching of data from api
    if (!reAssignLeads.isLoading && reAssignLeads.data) {
      // Once data is loaded, update component state
      const leadStatus = reAssignLeads.data?.results;
      const lost = leadStatus?.filter((data) => data.lead_status === 9);
      const reAss = leadStatus?.filter((data) => data.lead_status === 10);
      const dnC = leadStatus?.filter((data) => data.lead_status === 11);

      setlostDeals(lost);
      setReAssign(reAss);
      setDoNotCall(dnC);
    }
  }, [reAssignLeads]);

  // function for implementing drag and drop
  const handleDragEnd = async (result) => {
    const { destination, source, draggableId } = result;
    //condition if destination is not found
    if (!destination || source.droppableId === destination.droppableId) return;

    let status;

    // condition based on the droppable  of the cards
    if (destination.droppableId === "1") {
      status = 9;
    }
    if (destination.droppableId === "2") {
      status = 10;
    }
    if (destination.droppableId === "3") {
      status = 11;
    }

    // condtioning based on the lead status need to update
    const updateLead = {
      id: draggableId,
      lead_status: status,
      session: account_detail.full_name,
    };

    const leadStatus = await updateStatus(updateLead).unwrap();
    if (leadStatus.success === true) {
      toast.success(leadStatus.message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        progress: undefined,
      });
    } else {
      toast.error(leadStatus.message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        progress: undefined,
      });
    }
    reAssignLeads.refetch();
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className=" flex justify-end mt-4 mr-10">
        <div className=" w-72 flex">
          <Input label="Search" icon={<IoIosSearch className="h-5 w-5" />} />
        </div>
      </div>
      <div className="h-[80vh] grid grid-cols-3 space-x-4 mt-5">
        <ReassignLeadsColumn
          title={"LOST DEALS"}
          lead={lostDeals}
          id={"1"}
          color={"bg-light-green-700 p-2 text-white rounded-md text-center"}
        />
        <ReassignLeadsColumn
          title={"RE-ASSIGN"}
          lead={reAssign}
          id={"2"}
          color={" bg-blue-800 p-2 text-white rounded-md text-center"}
        />
        <ReassignLeadsColumn
          title={"DO NOT CALL"}
          lead={doNotCall}
          id={"3"}
          color={" bg-orange-700 p-2 text-white rounded-md text-center"}
        />
      </div>
    </DragDropContext>
  );
};
export default ReassignLeadsBoard;
