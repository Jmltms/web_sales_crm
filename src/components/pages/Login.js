import { useState } from "react";
import {
  Card,
  CardBody,
  Typography,
  Button,
  Input,
  Checkbox,
  CardHeader,
  Alert,
} from "@material-tailwind/react";
import { RiLockPasswordLine } from "react-icons/ri";
import { FaRegAddressCard } from "react-icons/fa";
import { RxCrossCircled } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import bg from "./../../img/ssscribbleBg.png";
import passLogo from "./../../img/passLogo.png";
import Logo from "../../img/Logo.png";

const Login = () => {
  const apiDomain = process.env.REACT_APP_API_DOMAIN;
  const [passwordType, setPasswordType] = useState("password");
  const [input, setInput] = useState({
    username: "",
    password: "",
  });
  const [errorAlert, setErrorAlert] = useState("hidden");
  const navigate = useNavigate();

  //function for toggle the password
  const togglePassword = (e) => {
    e.target.checked ? setPasswordType("text") : setPasswordType("password");
  };

  // handle onchage of the input
  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  // handle fetching account detail in local storage
  const fetchAccountDetailed = async (id, token) => {
    await axios
      .get(`${apiDomain}/api/account/${id}/fetch_detailed_account/`, {
        headers: {
          Authorization: "token " + token,
        },
      })
      .then((result) => {
        localStorage.setItem(
          "account_detail",
          JSON.stringify(result.data.data)
        );

        navigate("/index/home");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // handle login function
  const handleLogin = async (event) => {
    event.preventDefault();
    await axios
      .post(`${apiDomain}/api/user/login/`, {
        username: input.username,
        password: input.password,
      })
      .then(function (response) {
        localStorage.setItem("user_token", response.data.token);
        localStorage.setItem("user_info", JSON.stringify(response.data.user));
        navigate("/index/home");
        fetchAccountDetailed(response.data.user.id, response.data.token);
      })
      .catch(function (error) {
        errorAlert ? setErrorAlert("block") : setErrorAlert("hidden");
      });
  };

  return (
    <>
      <div className="relative h-[100vh]">
        <img
          src={bg}
          alt="bg"
          className=" absolute inset-0  aspect-square object-fill w-full h-full"
        />
        <div className="flex justify-center">
          <Card className="w-full max-w-[23rem] lg:max-w-[55rem] lg:flex-row mt-28 lg:mt-16">
            <CardHeader className="hidden m-0 w-[20rem] lg:w-[23rem] rounded-r-none lg:flex">
              <div className="flex flex-col items-center justify-center mx-2">
                <img src={passLogo} alt="pass" className=" w-44 h-44 mt-5" />
                <Typography className="mt-2 text-center text-lg text-cyan-500 font-bold ">
                  "Welcome back! Please enter your credentials to continue."
                </Typography>
                <Typography className="mx-7 mt-3 text-sm text-left">
                  Protecting passwords is crucial for maintaining the security
                  of user accounts and sensitive information.
                </Typography>
              </div>
            </CardHeader>
            <CardBody className=" lg:w-[32rem] mb-5">
              <div className=" flex justify-center items-center space-x-4">
                <img src={Logo} alt="logo" className=" h-16 w-16" />
                <div>
                  <Typography
                    variant="h4"
                    color="blue-gray"
                    className=" text-blue-700"
                  >
                    OOG CRM System
                  </Typography>
                  <Typography className=" text-sm">
                    One Outsource Direct Corporation
                  </Typography>
                </div>
              </div>
              <form onSubmit={handleLogin}>
                <div className={`mx-10 mt-5 ${errorAlert}`}>
                  <Alert variant="ghost" color="red" icon={<RxCrossCircled />}>
                    <Typography className=" text-sm">
                      Login failed, please double-check your credentials and try
                      again.
                    </Typography>
                  </Alert>
                </div>
                <Typography className="mt-10 text-xl text-blue-700 ml-1 lg:ml-8 font-bold">
                  Hello, User!
                </Typography>
                <Typography className="text-sm ml-1 lg:ml-8 text-blue-gray-500">
                  Sign in to continue.
                </Typography>
                <div className="flex items-center space-x-4 mx-2 md:mx-10 mt-10 lg:mt-5">
                  <FaRegAddressCard className=" w-6 h-6 text-blue-700" />
                  <Input
                    variant="standard"
                    label="Username/Email"
                    color="blue"
                    name="username"
                    defaultValue={input.id}
                    onChange={handleChange}
                    placeholder="Enter your username/email"
                  />
                </div>
                <div className=" mt-7 lg:mt-10 flex items-center space-x-4 mx-2 md:mx-10">
                  <RiLockPasswordLine className=" w-6 h-6 text-blue-700" />
                  <Input
                    variant="standard"
                    name="password"
                    type={passwordType}
                    defaultValue={input.password}
                    onChange={handleChange}
                    label="Password"
                    color="blue"
                    placeholder="Enter your password"
                  />
                </div>
                <div className="flex items-center justify-end mr-3 lg:mr-8 mt-2">
                  <Typography className="text-xs lg:text-sm">
                    Show password
                  </Typography>
                  <Checkbox onClick={togglePassword} color="blue" />
                </div>
                <div className=" flex justify-center mt-16  md:mt-8">
                  <Button
                    className=" bg-blue-700 w-[18rem]"
                    type="submit"
                    // onClick={}
                  >
                    Login
                  </Button>
                </div>
              </form>
            </CardBody>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Login;
