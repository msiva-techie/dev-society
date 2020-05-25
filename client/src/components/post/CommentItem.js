import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { removeComment } from "../../actions/post";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import Moment from "react-moment";

function CommentItem({
	comment: { _id, name, gravatar, user, text },
	auth,
	postId,
	removeComment
}) {
	return (
		<div className="post bg-white p-1 my-1">
			<div>
				<a href="profile.html">
					<img className="round-img" src={gravatar} alt="" />
					<h4>{name}</h4>
				</a>
			</div>
			<div>
				<p className="my-1">{text}</p>
				<p className="post-date">
					Posted on <Moment format="YYYY/MM/DD">04/16/2019</Moment>
				</p>
			</div>
			{!auth.loading && auth.user._id === user && (
				<button
					type="button"
					className="btn btn-danger"
					onClick={() => {
						removeComment(postId, _id);
					}}
				>
					<FontAwesomeIcon icon={faTimes} />
				</button>
			)}
		</div>
	);
}

CommentItem.propTypes = {
	comment: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired,
	removeComment: PropTypes.func.isRequired,
	postId: PropTypes.string.isRequired
};

const mapStateToProps = state => {
	return {
		auth: state.auth
	};
};
export default connect(mapStateToProps, { removeComment })(CommentItem);
