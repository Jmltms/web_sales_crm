import { useState } from "react";
import { List, Typography, Radio } from "@material-tailwind/react";
import { useFetchServiceQuery } from "../../../store";

const ServiceName = ({ fetchService, serviceDefault }) => {
  const [service, setService] = useState(serviceDefault);
  const [page] = useState(1);
  const [pageSize] = useState(10);
  const serviceApi = useFetchServiceQuery({
    page: page,
    pageSize: pageSize,
  });

  const serviceObj = serviceApi.data?.results;
  console.log(service);
  const handleCheck = (e) => {
    setService(e.target.value);
  };

  fetchService(service);
  console.log(service);

  let content;
  if (serviceApi.isLoading) {
    content = (
      <div>
        <Typography>Loading ...</Typography>
      </div>
    );
  } else if (serviceApi.error) {
    content = (
      <div>
        <Typography>Refresh the page ...</Typography>
      </div>
    );
  } else {
    content = (
      <>
        <div className=" grid grid-cols-2">
          {serviceObj.map((obj) => (
            <div className="p-0" key={obj.id}>
              <label
                htmlFor="vertical-list-react"
                className="flex w-full cursor-pointer items-center px-3 py-2"
              >
                <div className="mr-3">
                  <Radio
                    id="vertical-list-react"
                    name="type"
                    className="hover:before:opacity-0"
                    containerProps={{
                      className: "p-0",
                    }}
                    onChange={handleCheck}
                    value={obj.id}
                    defaultChecked={service === obj.id}
                  />
                </div>
                <Typography color="blue-gray" className="font-medium">
                  {obj.name}
                </Typography>
              </label>
            </div>
          ))}
        </div>
      </>
    );
  }
  console.log(serviceObj);
  return (
    <>
      <div>
        <List className="mt-5">
          <Typography className=" text-lg text-cyan-700">
            List of Service Offered
          </Typography>
          <Typography className=" text-xs mb-3">
            Selected service offered
          </Typography>
          {content}
        </List>
      </div>
    </>
  );
};
export default ServiceName;
