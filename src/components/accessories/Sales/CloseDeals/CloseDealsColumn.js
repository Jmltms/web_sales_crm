import React from "react";
import { Droppable } from "react-beautiful-dnd";
import { Card } from "@material-tailwind/react";
import CloseDealsCard from "./CloseDealsCard";

const CloseDealsColumn = ({ color, title, tasks, id }) => {
  return (
    <div>
      <Droppable droppableId={id}>
        {(provided, snapshot) => (
          <div className="">
            <div className={color}>{title}</div>
            <Card
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="bg-blue-gray-50 mb-3"
              isDraggingOver={snapshot.isDraggingOver}
            >
              {tasks?.map((task, index) => (
                <CloseDealsCard key={index} index={index} task={task} />
              ))}
              {provided.placeholder}
            </Card>
          </div>
        )}
      </Droppable>
    </div>
  );
};
export default CloseDealsColumn;
