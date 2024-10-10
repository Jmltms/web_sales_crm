import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { Card, CardBody, Typography } from "@material-tailwind/react";
import { BiLogoGmail } from "react-icons/bi";
import { RiPhoneFill, RiQrCodeLine } from "react-icons/ri";
import PipelineCardModal from "./PipelineCardModal";
// import ContactedLeadsStatusModal from "./ContactedLeadsStatusModal";

const CloseDealsCard = ({ task, index }) => {
  console.log(task);
  // color distinguish for every status
  const color = [
    {
      status: "proposal",
      color: "text-green-700",
    },
    {
      status: "presentation",
      color: "text-blue-800",
    },
    {
      status: "negotiation",
      color: "text-orange-700",
    },
  ];
  // variable for searching the designated color
  const classColor = color.find((obj) => obj.status === task.status);
  return (
    <Draggable draggableId={`${task.id}`} key={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
        >
          <Card className="shadow-md mx-5 my-3">
            <div>
              <CardBody>
                <div>
                  <div className="flex justify-between space-x-32">
                    <div>
                      {/* <Typography className=" text-xl text-black font-bold ">
                        {task.name}
                      </Typography> */}
                      <PipelineCardModal task={task} />
                      <Typography className=" text-sm text-left text-blue-gray-700">
                        {task.position}
                      </Typography>
                    </div>
                    <div>
                      <RiQrCodeLine
                        className={`${classColor.color} h-11 w-11`}
                      />
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 justify-center mt-5">
                    <div className={`${classColor.color} space-y-3`}>
                      <BiLogoGmail />
                      <RiPhoneFill />
                    </div>
                    <div className=" space-y-3">
                      <Typography className=" text-[13px] text-left text-blue-gray-700">
                        <a href={`mailto:${task.email}`}>
                          JimuelTomas@gmail.com
                        </a>
                      </Typography>
                      <div className="flex items-center space-x-3 text-blue-gray-700">
                        <Typography className=" text-[13px] pr-3   border-r border-blue-gray-700">
                          09631538259
                        </Typography>
                        <Typography className=" text-[13px]">
                          634-135-244
                        </Typography>
                      </div>
                    </div>
                  </div>
                  <hr className=" border border-b-black mt-5 mb-3" />
                  <Typography className="text-[13px] text-center">
                    One Outsource Direct Corporation
                  </Typography>
                </div>
              </CardBody>
            </div>
          </Card>
        </div>
      )}
    </Draggable>
  );
};
export default CloseDealsCard;
