import {
	GET_POSTS,
	POST_ERROR,
	UPDATE_LIKE,
	DELETE_POST,
	ADD_POST,
	GET_POST,
	UPDATE_COMMENT
} from "./../actions/types";
import axios from "axios";
import { setAlert } from "./alert";

export const getPosts = () => async dispatch => {
	try {
		let res = await axios.get(`/api/posts`);
		dispatch({
			type: GET_POSTS,
			payload: res.data
		});
	} catch (err) {
		dispatch({
			type: POST_ERROR,
			payload: { msg: err?.response?.statusText, status: err?.response?.status }
		});
	}
};

export const getPost = postId => async dispatch => {
	try {
		let res = await axios.get(`/api/posts/${postId}`);
		dispatch({
			type: GET_POST,
			payload: res.data
		});
	} catch (err) {
		dispatch({
			type: POST_ERROR,
			payload: { msg: err?.response?.statusText, status: err?.response?.status }
		});
	}
};

export const addLike = postId => async dispatch => {
	try {
		let res = await axios.put(`/api/posts/like/${postId}`);
		dispatch({
			type: UPDATE_LIKE,
			payload: { id: postId, likes: res.data }
		});
	} catch (err) {
		dispatch({
			type: POST_ERROR,
			payload: { msg: err?.response?.statusText, status: err?.response?.status }
		});
	}
};

export const removeLike = postId => async dispatch => {
	try {
		let res = await axios.put(`/api/posts/unlike/${postId}`);
		dispatch({
			type: UPDATE_LIKE,
			payload: { id: postId, likes: res.data }
		});
	} catch (err) {
		dispatch({
			type: POST_ERROR,
			payload: { msg: err?.response?.statusText, status: err?.response?.status }
		});
	}
};

export const deletePost = postId => async dispatch => {
	try {
		await axios.delete(`/api/posts/${postId}`);
		dispatch({
			type: DELETE_POST,
			payload: postId
		});
		dispatch(setAlert("Post removed successfully", "success"));
	} catch (err) {
		dispatch({
			type: POST_ERROR,
			payload: { msg: err?.response?.statusText, status: err?.response?.status }
		});
	}
};

export const addPost = formData => async dispatch => {
	const config = {
		headers: {
			"Content-Type": "application/json"
		}
	};
	try {
		let res = await axios.post(`/api/posts`, formData, config);
		dispatch({
			type: ADD_POST,
			payload: res.data
		});
		dispatch(setAlert("Post uploaded successfully", "success"));
	} catch (err) {
		dispatch({
			type: POST_ERROR,
			payload: { msg: err?.response?.statusText, status: err?.response?.status }
		});
	}
};

export const addComment = (postId, formData) => async dispatch => {
	const config = {
		headers: {
			"Content-Type": "application/json"
		}
	};
	try {
		let res = await axios.put(`/api/posts/comment/${postId}`, formData, config);
		dispatch({
			type: UPDATE_COMMENT,
			payload: res.data
		});
		dispatch(setAlert("Comment added successfully", "success"));
	} catch (err) {
		dispatch({
			type: POST_ERROR,
			payload: { msg: err?.response?.statusText, status: err?.response?.status }
		});
	}
};

export const removeComment = (postId, commentId) => async dispatch => {
	try {
		let res = await axios.delete(`/api/posts/comment/${postId}/${commentId}`);
		dispatch({
			type: UPDATE_COMMENT,
			payload: res.data
		});
		dispatch(setAlert("Comment removed successfully", "success"));
	} catch (err) {
		dispatch({
			type: POST_ERROR,
			payload: { msg: err?.response?.statusText, status: err?.response?.status }
		});
	}
};
