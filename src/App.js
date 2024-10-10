import { Routes, Route } from "react-router-dom";
import Dashboard from "./components/pages/Dashboard";
import AllLeads from "./components/pages/AllLeads";
import Index from "./components/pages/Index";
import UncontactedLeads from "./components/pages/UncontactedLeads";
import Login from "./components/pages/Login";
import ContactedLeads from "./components/pages/ContactedLeads";
import Sales from "./components/pages/Sales";
import Pipeline from "./components/pages/Pipeline";
import CloseDeals from "./components/pages/CloseDeals";
import ReassignLeads from "./components/pages/ReassignLeads";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./components/pages/Home";
import Notifications from "./components/pages/Notification";
import Archive from "./components/pages/Archive";

function App() {
  const token = localStorage.getItem("user_token");
  let navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/");
      return;
    }
  }, [token, navigate]);
  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/index" element={<Index />}>
          <Route path="home" element={<Home />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="all_leads" element={<AllLeads />} />
          <Route path="sales" element={<Sales />} />
          <Route path="sales/uncontacted_list" element={<UncontactedLeads />} />
          <Route path="sales/contacted_list" element={<ContactedLeads />} />
          <Route path="sales/pipeline" element={<Pipeline />} />
          <Route path="sales/close_deals" element={<CloseDeals />} />
          <Route path="sales/reassign_leads" element={<ReassignLeads />} />
          <Route path="notification" element={<Notifications />} />
          <Route path="archive" element={<Archive />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
