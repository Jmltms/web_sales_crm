import HeaderCard from "../../components/accessories/Reuseables/HeaderCard";
import ReassignLeadsBoard from "../accessories/Sales/ReassignLeads/ReassignLeadsBoard";
import { MdAssignmentReturn } from "react-icons/md";

const ReassignLeads = () => {
  const icon = <MdAssignmentReturn className="w-8 h-8 text-blue-900" />;

  return (
    <div className="container lg:w-full">
      <div>
        <HeaderCard tab={"Reassign Leads"} icon={icon} />
        <ReassignLeadsBoard />
      </div>
    </div>
  );
};

export default ReassignLeads;
