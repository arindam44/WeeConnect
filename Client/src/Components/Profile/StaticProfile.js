import React, { Component, Fragment } from "react";
import propTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import dayjs from "dayjs";

//MUI
import withStyles from "@material-ui/core/styles/withStyles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";

//Icons
import LocationOn from "@material-ui/icons/LocationOn";
import LinkIcon from "@material-ui/icons/Link";
import CalendarToday from "@material-ui/icons/CalendarToday";

const styles = (theme) => ({ ...theme.spreadThis });

const StaticProfile = (props) => {
  const {
    classes,
    profile: {
      userHandle,
      firstName,
      lastName,
      createdAt,
      imageUrl,
      bio,
      website,
      location,
    },
  } = props;
  return (
    <Paper className={classes.paper}>
      <div className={classes.profile}>
        <div className="profile-image">
          <Avatar src={imageUrl} className="profile-image" />
        </div>
        <hr />
        <div className="profile-details">
          <Typography variant="h5">@{userHandle}</Typography>
          <hr />
          <Typography variant="h6">{`${firstName} ${lastName}`}</Typography>
          <hr />
          {bio && <Typography variant="body2">{bio}</Typography>}
          <hr />
          {location && (
            <Fragment>
              <LocationOn color="primary" /> <span>{location}</span>
              <hr />
            </Fragment>
          )}
          {website && (
            <Fragment>
              <LinkIcon color="primary" />
              <a href={website} target="_blank" rel="noopener noreferrer">
                {website}
              </a>
              <hr />
            </Fragment>
          )}
          <CalendarToday color="primary" />{" "}
          <span>Joined {dayjs(createdAt).format("MMM YYYY")}</span>
        </div>
      </div>
    </Paper>
  );
};

StaticProfile.propTypes = {
  profile: propTypes.object.isRequired,
  classes: propTypes.object.isRequired,
};

export default withStyles(styles)(StaticProfile);
