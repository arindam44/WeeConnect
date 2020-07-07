import React, { Component, Fragment } from "react";
import propTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import ProfileImageDialog from "./ProfileImageDialog";

//MUI
import withStyles from "@material-ui/core/styles/withStyles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Modal from "@material-ui/core/Modal";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";

//Icons
import LocationOn from "@material-ui/icons/LocationOn";
import LinkIcon from "@material-ui/icons/Link";
import CalendarToday from "@material-ui/icons/CalendarToday";

const styles = (theme) => ({
  ...theme.spreadThis,
  imageDialog: {
    position: "absolute",
  },
  fullImage: {
    position: "relative",
    maxHeight: 650,
  },
});

class StaticProfile extends Component {
  state = {
    open: false,
  };
  handleOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
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
    } = this.props;
    return (
      <Paper className={classes.paper}>
        <div className={classes.profile}>
          <div className="profile-image">
            <Avatar
              src={imageUrl}
              className="profile-image"
              onClick={this.handleOpen}
            />
          </div>
          <hr />
          <div className="profile-names">
            <Typography variant="h5">@{userHandle}</Typography>
            <hr />
            <Typography variant="h6">{`${firstName} ${lastName}`}</Typography>
            <hr />
            {bio && <Typography variant="body2">{bio}</Typography>}
            <hr />
            <div className="profile-details">
              {location && (
                <Fragment>
                  <LocationOn color="primary" />
                  <a
                    href={`http://google.com/maps/place/${location}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span>{location}</span>
                  </a>
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
              <CalendarToday color="primary" />
              <span>Joined {dayjs(createdAt).format("MMM YYYY")}</span>
            </div>
          </div>
        </div>

        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          maxWidth="l"
          maxHeight={window.innerHeight}
          className={classes.imageDialog}
        >
          <img src={imageUrl} alt="image" className={classes.fullImage} />
        </Dialog>
      </Paper>
    );
  }
}

StaticProfile.propTypes = {
  profile: propTypes.object.isRequired,
  classes: propTypes.object.isRequired,
};

export default withStyles(styles)(StaticProfile);
