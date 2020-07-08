import React, { Component } from "react";
import { connect } from "react-redux";
import { getUser } from "../Redux/Actions/userActions";
import PropTypes from "prop-types";
import axios from "axios";
import PostCard from "../Components/Post/PostCard";
import StaticProfile from "../Components/Profile/StaticProfile";
import PostSkeleton from "../Util/PostSkeleton";
import ProfileSkeleton from "../Util/ProfileSkeleton";

import Grid from "@material-ui/core/Grid";

class user extends Component {
  state = {
    profile: null,
    postIdParam: null,
  };
  componentDidMount() {
    const userHandle = this.props.match.params.userHandle;
    const postId = this.props.match.params.postId;
    if (postId) this.setState({ postIdParam: postId });
    this.props.getUser(userHandle);
    axios
      .get(`/user/${userHandle}`, {
        headers: {
          Authorization: localStorage.IdToken,
        },
      })
      .then((res) => {
        console.log(res.data);
        this.setState({
          profile: res.data.user,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  render() {
    const { posts, loading } = this.props.data;
    const { postIdParam } = this.state;
    const postsMarkUp = loading ? (
      <PostSkeleton />
    ) : posts === null ? (
      <p>No posts yet</p>
    ) : !postIdParam ? (
      posts.map((post) => <PostCard key={post._id} post={post} />)
    ) : (
      posts.map((post) => {
        if (post._id !== postIdParam)
          return <PostCard key={post._id} post={post} />;
        else return <PostCard key={post._id} post={post} openDialog />;
      })
    );
    return (
      <Grid container spacing={2}>
        <Grid item sm={4} xs={12}>
          {this.state.profile === null ? (
            <ProfileSkeleton />
          ) : (
            <StaticProfile profile={this.state.profile} />
          )}
        </Grid>
        <Grid item sm={8} xs={12}>
          {postsMarkUp}
        </Grid>
      </Grid>
    );
  }
}

user.propTypes = {
  getUser: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.data,
});

export default connect(mapStateToProps, { getUser })(user);
