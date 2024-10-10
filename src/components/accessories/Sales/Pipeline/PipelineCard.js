import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { Card, CardBody, Typography } from "@material-tailwind/react";
import { BiLogoGmail } from "react-icons/bi";
import { RiPhoneFill, RiQrCodeLine } from "react-icons/ri";
import PipelineCardModal from "./PipelineCardModal";

const ContactedLeadsCard = ({ lead, index }) => {
  console.log(lead);
  // color distinguish for every status
  const color = [
    {
      status: 5,
      color: "text-green-700",
    },
    {
      status: 6,
      color: "text-blue-800",
    },
    {
      status: 7,
      color: "text-orange-700",
    },
  ];
  // variable for searching the designated color
  const classColor = color.find((obj) => obj.status === lead.lead_status);
  return (
    <Draggable draggableId={`${lead.id}`} key={lead.id} index={index}>
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
                      <PipelineCardModal lead={lead} />
                      <Typography className=" text-sm text-left text-blue-gray-700">
                        {lead.job_title}
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
                        <a href={`mailto:${lead.email}`}>{lead.email}</a>
                      </Typography>
                      <div className="flex items-center space-x-3 text-blue-gray-700">
                        <Typography className=" text-[13px] pr-3   border-r border-blue-gray-700">
                          {lead.phone_num}
                        </Typography>
                        <Typography className=" text-[13px]">
                          {lead.tel_num}
                        </Typography>
                      </div>
                    </div>
                  </div>
                  <hr className=" border border-b-black mt-5 mb-3" />
                  <Typography className="text-[13px] text-center">
                    {lead.company}
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
export default ContactedLeadsCard;
