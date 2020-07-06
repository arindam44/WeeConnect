import React from "react";
import AddPost from "../Post/AddPost";
import { Link } from "react-router-dom";
import Notifications from "../Notifications";

import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";

//ICONS
import HomeIcon from "@material-ui/icons/Home";

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
        <Notifications />
      </Box>
    </div>
  );
}
