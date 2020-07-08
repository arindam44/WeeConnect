import React, { Component, Fragment } from "react";
import propTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import EditDetails from "./EditDetails";
import {
  logoutUser,
  uploadProfileImage,
} from "../../Redux/Actions/userActions";
import { addPost } from "../../Redux/Actions/dataActions";
import ProfileSkeleton from "../../Util/ProfileSkeleton";

//MUI
import withStyles from "@material-ui/core/styles/withStyles";
import Paper from "@material-ui/core/Paper";
import MuiLink from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Fab from "@material-ui/core/Fab";
import Badge from "@material-ui/core/Badge";
import ToolTip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import Dialog from "@material-ui/core/Dialog";
//Icons
import LocationOn from "@material-ui/icons/LocationOn";
import LinkIcon from "@material-ui/icons/Link";
import CalendarToday from "@material-ui/icons/CalendarToday";
import EditIcon from "@material-ui/icons/Edit";
import LogOutIcon from "@material-ui/icons/PowerSettingsNew";

const styles = (theme) => ({
  ...theme.spreadThis,
  imageDialog: {
    position: "absolute",
  },
  fullImage: {
    position: "relative",
    maxHeight: 600,
  },
});

class Profile extends Component {
  constructor(props) {
    super();
    this.state = {
      open: false,
    };
  }
  handleOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.setState({ open: false });
  };
  handleImageChange = async (event) => {
    event.preventDefault();
    const image = event.target.files[0];
    const formData = new FormData();
    formData.append("file", image, image.name);
    await this.props.uploadProfileImage(formData);
    const post = new FormData();
    const gender =
      this.props.user.credentials.gender === "male" ? "his" : "her";
    post.append(
      "body",
      `${this.props.user.credentials.userHandle} changed ${gender} profile picture`
    );
    post.append("file", image, image.name);
    this.props.addPost(post);
  };
  handleEditImage = () => {
    const fileInput = document.getElementById("imageInput");
    fileInput.click();
  };

  handleLogout = () => {
    this.props.logoutUser();
    this.props.history.push("/login");
  };
  render() {
    const {
      classes,
      user: {
        credentials: {
          userHandle,
          firstName,
          lastName,
          createdAt,
          imageUrl,
          bio,
          website,
          location,
        },
        loading,
      },
    } = this.props;

    let profileMarkup = !loading ? (
      <Paper className={classes.paper}>
        <div className={classes.profile}>
          <div className="profile-image">
            <Badge
              overlap="circle"
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              badgeContent={
                <ToolTip title="Edit Profile Image">
                  <Fab
                    onClick={this.handleEditImage}
                    color="primary"
                    size="small"
                  >
                    <EditIcon />
                  </Fab>
                </ToolTip>
              }
            >
              <Avatar
                src={imageUrl}
                className="profile-image"
                onClick={this.handleOpen}
              />
              <input
                type="file"
                id="imageInput"
                hidden
                onChange={this.handleImageChange}
              />
            </Badge>
          </div>
          <hr />
          <div className="profile-names">
            <MuiLink component={Link} to={`user/${userHandle}`} variant="h5">
              @{userHandle}
            </MuiLink>
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
                    {location}
                  </a>
                  <hr />
                </Fragment>
              )}
              {website && (
                <Fragment>
                  <LinkIcon color="primary" />
                  <a
                    href={website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={classes.Link}
                  >
                    {website}
                  </a>
                  <hr />
                </Fragment>
              )}
              <CalendarToday color="primary" />{" "}
              <span>Joined {dayjs(createdAt).format("MMM YYYY")}</span>
            </div>
          </div>
          <ToolTip title="LogOut" placement="top">
            <IconButton onClick={this.handleLogout}>
              <LogOutIcon color="secondary" />
            </IconButton>
          </ToolTip>
          <EditDetails />
          <Dialog
            open={this.state.open}
            onClose={this.handleClose}
            maxWidth="l"
            maxHeight={window.innerHeight}
            className={classes.imageDialog}
          >
            <img src={imageUrl} className={classes.fullImage} />
          </Dialog>
        </div>
      </Paper>
    ) : (
      <ProfileSkeleton />
    );

    return profileMarkup;
  }
}

Profile.propTypes = {
  user: propTypes.object.isRequired,
  classes: propTypes.object.isRequired,
  logoutUser: propTypes.func.isRequired,
  uploadProfileImage: propTypes.func.isRequired,
  addPost: propTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapActionsToProps = { logoutUser, uploadProfileImage, addPost };

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(Profile));
