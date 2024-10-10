import React from "react";
import { Droppable } from "react-beautiful-dnd";
import ContactedLeadsCard from "./ContactedLeadsCard";
import { Card } from "@material-tailwind/react";

const ContactedLeadsColumn = ({ color, title, lead, id }) => {
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
                <ContactedLeadsCard key={index} index={index} lead={lead} />
              ))}
              {provided.placeholder}
            </Card>
          </div>
        )}
      </Droppable>
    </div>
  );
};
export default ContactedLeadsColumn;
