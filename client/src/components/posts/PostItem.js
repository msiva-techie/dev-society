import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faThumbsUp,
	faThumbsDown,
	faTimes
} from "@fortawesome/free-solid-svg-icons";
import { addLike, removeLike, deletePost } from "./../../actions/post";

const PostItem = ({
	auth,
	post: { _id, name, gravatar, text, user, likes, comments, date },
	addLike,
	removeLike,
	deletePost,
	showActions
}) => {
	return (
		<div className="post bg-white p-1 my-1">
			<div>
				<Link to={`/profile/${user}`}>
					<img className="round-img" src={gravatar} alt="" />
					<h4>{name}</h4>
				</Link>
			</div>
			<div>
				<p className="my-1">{text}</p>
				<p className="post-date">
					Posted on <Moment format="YYYY/MM/DD">{date}</Moment>
				</p>
				{showActions && (
					<Fragment>
						<button
							type="button"
							className="btn btn-light"
							onClick={() => {
								addLike(_id);
							}}
						>
							<FontAwesomeIcon icon={faThumbsUp} /> {"  "}
							{likes.length > 0 && <span>{likes.length}</span>}
						</button>
						<button
							type="button"
							className="btn btn-light"
							onClick={() => {
								removeLike(_id);
							}}
						>
							<FontAwesomeIcon icon={faThumbsDown} />
						</button>
						<Link to={`/post/${_id}`} className="btn btn-primary">
							Discussion {"  "}
							{comments.length > 0 && (
								<span className="comment-count">{comments.length}</span>
							)}
						</Link>
						{!auth.loading && auth.user._id === user && (
							<button
								type="button"
								className="btn btn-danger"
								onClick={() => {
									deletePost(_id);
								}}
							>
								<FontAwesomeIcon icon={faTimes} />
							</button>
						)}
					</Fragment>
				)}
			</div>
		</div>
	);
};

PostItem.defaultProps = {
	showActions: true
};

PostItem.propTypes = {
	post: PropTypes.object.isRequired
};

const mapStateToProps = state => {
	return {
		auth: state.auth,
		addLike: PropTypes.func.isRequired,
		removeLike: PropTypes.func.isRequired,
		deletePost: PropTypes.func.isRequired
	};
};

export default connect(mapStateToProps, { addLike, removeLike, deletePost })(
	PostItem
);
