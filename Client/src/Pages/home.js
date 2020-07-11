import React, { Component } from "react";
import { connect } from "react-redux";
import { getPosts } from "../Redux/Actions/dataActions";
import Grid from "@material-ui/core/Grid";
import PostCard from "../Components/Post/PostCard";
import Profile from "../Components/Profile/Profile";
import PropTypes from "prop-types";
import PostSkeleton from "../Util/PostSkeleton";
import UserList from "../Components/UserList";

export class home extends Component {
  componentWillMount() {
    if (!localStorage.IdToken) {
      this.props.history.push("/login");
    }
    this.props.getPosts();
  }
  componentDidMount() {
    this.props.getPosts();
  }
  render() {
    const { posts, loading } = this.props.data;
    let recentPostsMarkUp = !loading ? (
      posts.map((post) => <PostCard key={post._id} post={post} />)
    ) : (
      <PostSkeleton />
    );
    return (
      <div class="container">
        <Grid container spacing={2}>
          <Grid item sm={3} xs={12}>
            <Profile history={this.props.history} />
          </Grid>
          <Grid item sm={7} xs={12}>
            {recentPostsMarkUp}
          </Grid>
          <Grid item sm={2}>
            <UserList />
          </Grid>
        </Grid>
      </div>
    );
  }
}

home.propTypes = {
  getPosts: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  authenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.data,
  authenticated: state.user.authenticated,
});

export default connect(mapStateToProps, { getPosts })(home);
