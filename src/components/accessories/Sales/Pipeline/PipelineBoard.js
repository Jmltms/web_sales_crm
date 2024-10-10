import { useEffect, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { Button, Input, Typography } from "@material-tailwind/react";
import { IoIosSearch } from "react-icons/io";
import {
  useFetchPrioLeadsQuery,
  useUpdataLeadStatusMutation,
} from "../../../../store";
import PipelineColumn from "./PipelineColumn";
import { toast } from "react-toastify";
import PipelineAddModal from "./PipelineAddModal";
import PipelineExcelAddLeads from "./PipelineExcelLeads";

const PipelineBoard = () => {
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [search, setSearch] = useState();
  const status = 3;
  const account_detail = JSON.parse(localStorage.getItem("account_detail"));
  const ownerInfo = account_detail.employee_id;
  const [updateStatus] = useUpdataLeadStatusMutation();

  //state for each lead status
  const [proposal, setProposal] = useState();
  const [presentation, setPresentation] = useState();
  const [negotiation, setNegotiation] = useState();

  // variaable for fetching data from api
  const pipelineData = useFetchPrioLeadsQuery({
    page: page,
    pageSize: pageSize,
    statusLabel: status,
    session: ownerInfo,
    search: search,
  });
  let totalRevenue = 0;
  const revenue = pipelineData.data?.results.map((obj) => obj.rev);
  revenue?.forEach((num) => (totalRevenue += num));
  useEffect(() => {
    // condition for fetching of data from api
    if (!pipelineData.isLoading && pipelineData.data) {
      // filtering data based from state data
      const pipelineInfo = pipelineData.data?.results;
      const pre = pipelineInfo?.filter((obj) => obj.lead_status === 5);
      const prop = pipelineInfo?.filter((obj) => obj.lead_status === 6);
      const neg = pipelineInfo?.filter((obj) => obj.lead_status === 7);

      setProposal(prop);
      setPresentation(pre);
      setNegotiation(neg);
    }
  }, [pipelineData]);
  console.log(pipelineData.data);

  // total page of data came from api
  const totalPage = Math.ceil(pipelineData.data?.count / pageSize);

  console.log(totalPage);

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
      status = 5;
    }
    if (destination.droppableId === "2") {
      status = 6;
    }
    if (destination.droppableId === "3") {
      status = 7;
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
    pipelineData.refetch();
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className=" flex justify-between mt-4 mr-10">
        <div className="flex items-center space-x-10">
          <div className=" flex items-center">
            <PipelineAddModal pipelineRefetch={pipelineData.refetch} />
            <PipelineExcelAddLeads csvLeadsRefetch={pipelineData.refetch} />
          </div>
          <Typography>
            Total Revenue:{" "}
            <span className=" text-green-800 font-bold">
              ₱ {totalRevenue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </span>
          </Typography>
        </div>
        <div className=" w-72 flex">
          <Input
            label="Search"
            icon={<IoIosSearch className="h-5 w-5" />}
            onKeyUp={handleSearch}
          />
        </div>
      </div>

      <div className=" grid grid-cols-3 space-x-4 mt-5">
        <PipelineColumn
          title={"PRESENTATION"}
          lead={presentation}
          id={"1"}
          color={"bg-light-green-700 p-2 text-white rounded-md text-center"}
        />
        <PipelineColumn
          title={"PROPOSAL"}
          lead={proposal}
          id={"2"}
          color={" bg-blue-800 p-2 text-white rounded-md text-center"}
        />

        <PipelineColumn
          title={"NEGOTIATION"}
          lead={negotiation}
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
export default PipelineBoard;
