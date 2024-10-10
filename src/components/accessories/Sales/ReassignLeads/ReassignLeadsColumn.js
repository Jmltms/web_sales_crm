import React from "react";
import { Droppable } from "react-beautiful-dnd";
import { Card } from "@material-tailwind/react";
import ReassignLeadsCard from "./ReassignLeadsCard";

const ReassignLeadsColumn = ({ color, title, lead, id }) => {
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
              {lead?.map((lead, index) => (
                <ReassignLeadsCard key={index} index={index} lead={lead} />
              ))}
              {provided.placeholder}
            </Card>
          </div>
        )}
      </Droppable>
    </div>
  );
};
export default ReassignLeadsColumn;
