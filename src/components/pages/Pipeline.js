import HeaderCard from "../../components/accessories/Reuseables/HeaderCard";
import PipelineBoard from "../accessories/Sales/Pipeline/PipelineBoard";
import { AiFillFunnelPlot } from "react-icons/ai";

const Pipeline = () => {
  const icon = <AiFillFunnelPlot className="w-8 h-8 text-blue-900" />;

  return (
    <div className="container lg:w-full">
      <div>
        <HeaderCard tab={"Pipeline"} icon={icon} />
        <PipelineBoard />
      </div>
    </div>
  );
};

export default Pipeline;
