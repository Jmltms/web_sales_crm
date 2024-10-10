// import React, { useState } from "react";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
  Typography,
} from "@material-tailwind/react";
import { MdOutlineWorkHistory } from "react-icons/md";
import { CgAttachment, CgNotes } from "react-icons/cg";
import { GrGroup } from "react-icons/gr";
import { BiTask } from "react-icons/bi";
import ActivityTab from "../Reuseables/ActivityTab";
import NotesTab from "./NotesTab";
import AttachmentTab from "./AttachmentTab";

const ClientTabNavigation = (leadId) => {
  console.log(leadId);
  const data = [
    {
      label: "Activity",
      value: "activity",
      icon: <MdOutlineWorkHistory />,
      desc: <ActivityTab leadId={leadId} />,
    },
    {
      label: "Notes",
      value: "notes",
      icon: <CgNotes />,
      desc: <NotesTab leadId={leadId} />,
    },
    {
      label: "Attachment",
      value: "attachment",
      icon: <CgAttachment />,
      desc: <AttachmentTab leadId={leadId} />,
    },
    {
      label: "Meetings",
      value: "meetings",
      icon: <GrGroup />,
    },
    {
      label: "Tasks",
      value: "tasks",
      icon: <BiTask />,
    },
  ];
  // const [defaultValue] = data[0].value;
  return (
    <div>
      <Tabs value={data[0].value}>
        <TabsHeader className=" space-x-5">
          {data?.map(({ label, value, icon }) => (
            <Tab key={value} value={value}>
              <div className="flex items-center gap-3">
                <Typography className=" text-cyan-800">{icon}</Typography>
                {label}
              </div>
            </Tab>
          ))}
        </TabsHeader>
        <TabsBody>
          {data?.map(({ value, desc }) => (
            <TabPanel key={value} value={value}>
              {desc}
            </TabPanel>
          ))}
        </TabsBody>
      </Tabs>
    </div>
  );
};

export default ClientTabNavigation;
