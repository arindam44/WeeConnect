import React from "react";
import AddPost from "../Post/AddPost";
import { Link } from "react-router-dom";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import Box from "@material-ui/core/Box";

//ICONS
import HomeIcon from "@material-ui/icons/Home";
import NotificationsIcon from "@material-ui/icons/Notifications";

const showNotifications = () => {};
export default function SignedInLinks() {
  return (
    <div>
      <Box display="flex" justifyContent="center">
        <AddPost />
        <Link to="/">
          <Tooltip title="Home" placement="top">
            <IconButton>
              <HomeIcon />
            </IconButton>
          </Tooltip>
        </Link>
        <Tooltip title="Notifications" placement="top">
          <IconButton onClick={showNotifications}>
            <NotificationsIcon />
          </IconButton>
        </Tooltip>
      </Box>
    </div>
  );
}
