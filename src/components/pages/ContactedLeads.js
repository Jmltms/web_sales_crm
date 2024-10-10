import HeaderCard from "../../components/accessories/Reuseables/HeaderCard";
import ContactedLeadsBoard from "../accessories/Sales/ContactedLeads/ContactedLeadsBoard";
import { FaPhoneAlt } from "react-icons/fa";

const ContactedLeads = () => {
  const icon = <FaPhoneAlt className="w-8 h-8 text-blue-900" />;

  return (
    <div className="container lg:w-full">
      <div>
        {/* <HeaderCard tab={"Contacted Leads"} icon={icon} />
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="h-[80vh] grid grid-cols-3 space-x-4 mt-5">
            <Droppable droppableId="leadCards">
              {(provided, snapshot) => (
                <Card
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="bg-blue-gray-50"
                  isDraggingOver={snapshot.isDraggingOver}
                >
                  {cardData.map((cd, index) => (
                    <Draggable key={cd.id} draggableId={cd.id} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <Card className="shadow-md mx-5 mt-3">
                            <CardBody>
                              <Typography
                                variant="h5"
                                className="mb-2 text-[#272727]"
                              >
                                {cd.title}
                              </Typography>
                              <Typography>{cd.body}</Typography>
                            </CardBody>
                            <CardFooter className="pt-0"></CardFooter>
                          </Card>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </Card>
              )}
            </Droppable>
            <Card className="bg-blue-gray-50"></Card>
            <Card className="bg-blue-gray-50"></Card>
          </div>
        </DragDropContext> */}
        <HeaderCard tab={"Contacted Leads"} icon={icon} />
        <ContactedLeadsBoard />
      </div>
    </div>
  );
};

export default ContactedLeads;
