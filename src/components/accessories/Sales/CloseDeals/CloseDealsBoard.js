import { useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import CloseDealsColumn from "./CloseDealsColumn";
import { Input } from "@material-tailwind/react";
import { IoIosSearch } from "react-icons/io";

const CloseDealsBoard = () => {
  const CardData = [
    {
      id: "1",
      name: "Jimuel P. Tomas",
      email: "Jimueltomas@gmail.com",
      cellphone: "0926453877",
      status: "proposal",
      position: "Programmer",
    },
    {
      id: "2",
      name: "John A. Doe",
      email: "Johndoe@gmail.com",
      cellphone: "0926453877",
      status: "proposal",
      position: "Manager",
    },
    {
      id: "3",
      name: "Smith D. Fox",
      email: "Smithfox@gmail.com",
      cellphone: "0926453877",
      status: "proposal",
      position: "Senior Developer",
    },
  ];
  //sorting of data based on status
  const inc = CardData.filter((data) => data.status === "proposal");
  const com = CardData.filter((data) => data.status === "presentation");
  const inr = CardData.filter((data) => data.status === "negotiation");

  const [completed, setCompleted] = useState(com);
  const [incomplete, setIncomplete] = useState(inc);
  const [inReview, setInReview] = useState(inr);

  console.log(completed);

  const handleDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination || source.droppableId === destination.droppableId) return;

    deletePreviousState(source.droppableId, draggableId);

    const task = findItemById(draggableId, [
      ...incomplete,
      ...completed,
      ...inReview,
    ]);

    setNewState(destination.droppableId, task);
  };

  function deletePreviousState(sourceDroppableId, taskId) {
    if (sourceDroppableId === "1") {
      setIncomplete(removeItemById(taskId, incomplete));
    }
    if (sourceDroppableId === "2") {
      setCompleted(removeItemById(taskId, completed));
    }
    if (sourceDroppableId === "3") {
      setInReview(removeItemById(taskId, inReview));
    }
  }
  function setNewState(destinationDroppableId, task) {
    let updatedTask;
    if (destinationDroppableId === "1") {
      updatedTask = { ...task, status: "proposal" };
      setIncomplete([updatedTask, ...incomplete]);
    }
    if (destinationDroppableId === "2") {
      updatedTask = { ...task, status: "presentation" };
      setCompleted([updatedTask, ...completed]);
    }
    if (destinationDroppableId === "3") {
      updatedTask = { ...task, status: "negotiation" };
      setInReview([updatedTask, ...inReview]);
    }
  }
  function findItemById(id, array) {
    return array.find((item) => item.id === id);
  }

  function removeItemById(id, array) {
    return array.filter((item) => item.id !== id);
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className=" flex justify-end mt-4 mr-10">
        <div className=" w-72 flex">
          <Input label="Search" icon={<IoIosSearch className="h-5 w-5" />} />
        </div>
      </div>
      <div className="h-[80vh] grid grid-cols-3 space-x-4 mt-5">
        <CloseDealsColumn
          title={"BACK OFFICE"}
          tasks={incomplete}
          id={"1"}
          color={"bg-light-green-700 p-2 text-white rounded-md text-center"}
        />
        <CloseDealsColumn
          title={"RPO"}
          tasks={completed}
          id={"2"}
          color={" bg-blue-800 p-2 text-white rounded-md text-center"}
        />
        <CloseDealsColumn
          title={"MARKET RESEARCH"}
          tasks={inReview}
          id={"3"}
          color={" bg-orange-700 p-2 text-white rounded-md text-center"}
        />
      </div>
    </DragDropContext>
  );
};
export default CloseDealsBoard;
