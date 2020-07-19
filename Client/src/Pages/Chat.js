import React from "react";
import ThreadList from "../Components/Chat/ThreadList";
import Chats from "../Components/Chat/Chats";
import UsersPanel from "../Components/Chat/UsersPanel";

import Grid from "@material-ui/core/Grid";

function Chat() {
  return (
    <div class="container">
      <Grid container spacing={1}>
        <Grid item sm={4} xs={12}>
          <ThreadList />
        </Grid>
        <Grid item sm={6} xs={12}>
          <Chats />
        </Grid>
        <Grid item sm={2} xs={12}>
          <UsersPanel />
        </Grid>
      </Grid>
    </div>
  );
}

export default Chat;
