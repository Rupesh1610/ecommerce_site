import React, { Fragment, useState } from "react";
import "./header.css";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import ListAltIcon from "@mui/icons-material/ListAlt";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { logoutUser } from "../../../redux/user/userSlice";

const UserOptions = ({ user }) => {
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const dashboard = () => {
    navigate("/dashboard");
  };
  const orders = () => {
    navigate("/orders");
  };
  const account = () => {
    navigate("/account");
  };
  const logout = () => {
    dispatch(logoutUser());
    toast.success("logout successfull");
  };

  const options = [
    { icon: <ListAltIcon />, name: "Orders", func: orders },
    { icon: <PersonIcon />, name: "Profile", func: account },
    { icon: <ExitToAppIcon />, name: "Logout", func: logout },
  ];

  if (user.role === "admin") {
    options.unshift({
      icon: <DashboardIcon />,
      name: "Dashboard",
      func: dashboard,
    });
  }

  return (
    <>
      {user && (
        <Fragment>
          <SpeedDial
            ariaLabel="SpeedDial tooltip example"
            className="speed_Dial"
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            direction="down"
            icon={
              <img
                className="speedDial_Icon"
                src={user.avatar.url ? user.avatar.url : "/Pro.png"}
                alt="profile"
              />
            }
          >
            {options.map((item) => (
              <SpeedDialAction
                key={item.name}
                icon={item.icon}
                tooltipTitle={item.name}
                onClick={item.func}
              />
            ))}
          </SpeedDial>
        </Fragment>
      )}
    </>
  );
};

export default UserOptions;
