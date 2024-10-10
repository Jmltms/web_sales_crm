import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import Chart from "react-apexcharts";
import { useFetchTotalPipelineDashboardQuery } from "../../../store";

// If you're using Next.js please use the dynamic import for react-apexcharts and remove the import from the top for the react-apexcharts
// import dynamic from "next/dynamic";
// const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const DashboardPieGraph = () => {
  const pieGraphData = useFetchTotalPipelineDashboardQuery();
  console.log(pieGraphData);

  const presentation = pieGraphData.data?.data.presentation.sum
    ? parseFloat(pieGraphData.data?.data.presentation.sum)
    : 0;
  const proposal = pieGraphData.data?.data.proposal.sum
    ? parseFloat(pieGraphData.data?.data.proposal.sum)
    : 0;
  const negotiation = pieGraphData.data?.data.negotiation.sum
    ? parseFloat(pieGraphData.data?.data.negotiation.sum)
    : 0;
  const closed_deal = pieGraphData.data?.data.closed_deal.sum
    ? parseFloat(pieGraphData.data?.data.closed_deal.sum)
    : 0;

  const leadStatus = [presentation, proposal, negotiation, closed_deal];
  console.log(leadStatus);

  const chartConfig = {
    type: "pie",
    width: 350,
    height: 300,
    series: leadStatus,
    options: {
      chart: {
        toolbar: {
          show: false,
        },
      },
      title: {
        show: "",
      },
      dataLabels: {
        enabled: false,
      },
      colors: ["#b91d47", "#00aba9", "#2b5797", "#e8c3b9"],
      labels: ["Presentation", "Proposal", "Negotiation", "Closed Deals"],
      legend: {
        show: true,
      },
    },
  };
  return (
    <Card className="container w-[400px]">
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="flex gap-4 rounded-none"
      >
        <Typography
          color="blue-gray"
          className="text-center text-lg text-cyan-800 font-bold"
        >
          Opportunity Stage
        </Typography>
      </CardHeader>
      <CardBody className="grid place-items-center ">
        <Chart {...chartConfig} />
      </CardBody>
    </Card>
  );
};
export default DashboardPieGraph;
