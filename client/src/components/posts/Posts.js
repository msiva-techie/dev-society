import React, { useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getPosts } from "./../../actions/post";
import Spinner from "./../layout/Spinner";
import PostItem from "./PostItem";
import PostForm from "./PostForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const Posts = ({ post: { posts, loading }, getPosts }) => {
	useEffect(() => {
		getPosts();
	}, [getPosts]);
	return loading ? (
		<Spinner />
	) : (
		<Fragment>
			<h1 className="large text-primary">Posts</h1>
			<p className="lead">
				<FontAwesomeIcon icon={faUser} />
				{"  "} Welcome to the community!
			</p>
			<PostForm />
			<div className="posts">
				{posts.map(post => (
					<PostItem key={post._id} post={post} />
				))}
			</div>
		</Fragment>
	);
};

Posts.propTypes = {
	post: PropTypes.object.isRequired,
	getPosts: PropTypes.func.isRequired
};

const mapStateToProps = state => {
	return {
		post: state.post
	};
};

export default connect(mapStateToProps, { getPosts })(Posts);
