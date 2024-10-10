import { useEffect, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import ContactedLeadsColumn from "./ContactedLeadsColumn";
import { Button, Input, Typography } from "@material-tailwind/react";
import { IoIosSearch } from "react-icons/io";
// import { ScaleLoader } from "react-spinners";
import { useFetchPrioLeadsQuery } from "../../../../store/api/ClientApi";
import { useUpdataLeadStatusMutation } from "../../../../store/api/ClientApi";
import { toast } from "react-toastify";
import ContactedLeadsAddModal from "./ContactedLeadsAddModal";
import ContactedExcelAddLeads from "./ContactedExcelAddLeads";

const ContactedLeadsBoard = () => {
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [search, setSearch] = useState();
  const status = 2;
  const account_detail = JSON.parse(localStorage.getItem("account_detail"));
  const ownerInfo = account_detail.employee_id;
  const [updateStatus] = useUpdataLeadStatusMutation();

  const contactedLeads = useFetchPrioLeadsQuery({
    page: page,
    pageSize: pageSize,
    statusLabel: status,
    session: ownerInfo,
    search: search,
  });
  console.log(contactedLeads);

  const [qualification, setQualification] = useState();
  const [followUp, setFollowUp] = useState();
  const [coldLeads, setColdLeads] = useState();

  useEffect(() => {
    // condition for fetching of data from api
    if (!contactedLeads.isLoading && contactedLeads.data) {
      // Once data is loaded, update component state
      const leadStatus = contactedLeads.data?.results;
      const qua = leadStatus?.filter((data) => data.lead_status === 2);
      const follow = leadStatus?.filter((data) => data.lead_status === 3);
      const cold = leadStatus?.filter((data) => data.lead_status === 4);

      setQualification(qua);
      setFollowUp(follow);
      setColdLeads(cold);
    }
  }, [contactedLeads]);

  // total page of data came from api
  const totalPage = Math.ceil(contactedLeads.data?.count / pageSize);

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

  // handle search
  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };
  // function for implementing drag and drop
  const handleDragEnd = async (result) => {
    const { destination, source, draggableId } = result;
    //condition if destination is not found
    if (!destination || source.droppableId === destination.droppableId) return;

    let status;

    // condition based on the droppable  of the cards
    if (destination.droppableId === "1") {
      status = 2;
    }
    if (destination.droppableId === "2") {
      status = 3;
    }
    if (destination.droppableId === "3") {
      status = 4;
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
    contactedLeads.refetch();
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className=" flex justify-between mt-4 mr-10">
        <div className="flex space-x-2 items-center">
          <ContactedLeadsAddModal contactedRefetch={contactedLeads.refetch} />
          <ContactedExcelAddLeads csvLeadsRefetch={contactedLeads.refetch} />
        </div>
        <div className=" w-72 flex">
          <Input
            label="Search"
            icon={<IoIosSearch className="h-5 w-5" />}
            onKeyUp={handleSearch}
          />
        </div>
      </div>
      <div className=" w-[100vw] lg:w-full grid grid-cols-3 space-x-4 mt-3">
        <ContactedLeadsColumn
          title={"QUALIFICATION"}
          lead={qualification}
          id={"1"}
          color={"bg-light-green-700 p-2 text-white rounded-md text-center"}
        />
        <ContactedLeadsColumn
          title={"FOLLOW-UP"}
          lead={followUp}
          id={"2"}
          color={" bg-blue-800 p-2 text-white rounded-md text-center"}
        />
        <ContactedLeadsColumn
          title={"COLD LEADS"}
          lead={coldLeads}
          id={"3"}
          color={" bg-orange-700 p-2 text-white rounded-md text-center"}
        />
      </div>
      <div className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <Typography variant="small" color="blue-gray" className="font-normal">
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
      </div>
    </DragDropContext>
  );
};
export default ContactedLeadsBoard;
