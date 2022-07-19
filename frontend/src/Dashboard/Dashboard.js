import React from "react";
import { useHistory } from "react-router-dom";
import { handleAuth } from "../shared/utils/auth";

const Dashboard = () => {
  const history = useHistory();
  handleAuth();
  const userDetails = JSON.parse(localStorage.getItem("user"));
  if (userDetails.role === "consultant") {
    history.push("/consultantDashboard");
  } else {
    history.push("/clientDashboard");
  }

  return <div>Redirecting</div>;
};

export default Dashboard;
