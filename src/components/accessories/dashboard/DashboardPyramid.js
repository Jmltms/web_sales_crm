import React from "react";
import ReactApexChart from "react-apexcharts";
import { useFetchStatusLabelDashboardQuery } from "../../../store";
import { Card, Spinner, Typography } from "@material-tailwind/react";

const DashboardPyramid = () => {
  const pyramidDataApi = useFetchStatusLabelDashboardQuery();
  console.log(pyramidDataApi);

  let content;
  const apiDataLabel = pyramidDataApi.data?.data.status;
  const mapArrCount = apiDataLabel?.map((item) => item.count);
  const mapArrLabel = apiDataLabel?.map((item) => item.label);
  if (pyramidDataApi.isLoading) {
    content = (
      <div>
        <Spinner />
      </div>
    );
  } else if (pyramidDataApi.error) {
    content = (
      <div>
        <Typography>Refresh the page...</Typography>
      </div>
    );
  } else {
    const pyramidData = {
      series: [
        {
          name: "",
          data: mapArrCount,
        },
      ],
      options: {
        chart: {
          type: "bar",
          height: 300,
          toolbar: {
            show: false,
          },
        },
        plotOptions: {
          bar: {
            borderRadius: 0,
            horizontal: true,
            distributed: true,
            barHeight: "70%",
            isFunnel: true,
          },
        },
        colors: [" #FBD38D", "#8B5CF6", "#3B82F6", "#4ADE80", "#8B4513"],
        dataLabels: {
          enabled: true,
          formatter: function (val, opt) {
            return opt.w.globals.labels[opt.dataPointIndex];
          },
          dropShadow: {
            enabled: true,
          },
        },
        title: {
          text: "Deal Funnel",
          align: "left",
          style: {
            fontSize: "18px",
            fontWeight: "bold",
            color: "#0E7490",
          },
        },

        xaxis: {
          categories: mapArrLabel,
        },
        legend: {
          show: true,
          position: "right",
          horizontal: "center",
        },
      },
    };
    content = (
      <ReactApexChart
        options={pyramidData?.options}
        series={pyramidData?.series}
        type="bar"
        height={230}
        width={400}
      />
    );
  }
  return (
    <div>
      <Card className=" container w-[400px] p-2">{content}</Card>
    </div>
  );
};
export default DashboardPyramid;
