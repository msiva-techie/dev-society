import React, { useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import PostItem from "./../posts/PostItem";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getPost } from "./../../actions/post";
import Spinner from "./../layout/Spinner";
import CommentForm from "./CommentForm";
import CommentItem from "./CommentItem";

const Post = ({ getPost, match, post: { loading, post } }) => {
	useEffect(() => {
		getPost(match.params.id);
	}, [getPost]);
	return !loading && !post ? (
		<Spinner />
	) : (
		<Fragment>
			<Link className="btn btn-light my-1" to="/posts">
				Back To Posts
			</Link>
			<PostItem post={post} showActions={false} />
			<CommentForm postId={post._id} />
			<div className="comments">
				{post.comments.map(comment => (
					<CommentItem key={comment._id} comment={comment} postId={post._id} />
				))}
			</div>
		</Fragment>
	);
};

Post.propTypes = {
	post: PropTypes.object.isRequired,
	getPost: PropTypes.func.isRequired
};

const mapStateToProps = state => {
	return {
		post: state.post
	};
};

export default connect(mapStateToProps, { getPost })(Post);
