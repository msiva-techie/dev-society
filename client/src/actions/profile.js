import axios from "axios";
import {
	GET_PROFILE,
	PROFILE_ERROR,
	UPDATE_PROFILE,
	GET_PROFILES,
	GET_PROFILEBYID,
	GET_REPOS
} from "./types";
import { setAlert } from "./alert";

export const getCurrentProfile = () => async dispatch => {
	try {
		let res = await axios.get("/api/profile/me");
		dispatch({
			type: GET_PROFILE,
			payload: res.data
		});
	} catch (err) {
		dispatch({
			type: PROFILE_ERROR,
			payload: { msg: err?.response?.statusText, status: err?.response?.status }
		});
	}
};

export const getProfiles = () => async dispatch => {
	try {
		let res = await axios.get("/api/profile");
		dispatch({
			type: GET_PROFILES,
			payload: res.data
		});
	} catch (err) {
		dispatch({
			type: PROFILE_ERROR,
			payload: { msg: err?.response?.statusText, status: err?.response?.status }
		});
	}
};

export const getProfileById = userId => async dispatch => {
	try {
		let res = await axios.get(`/api/profile/user/${userId}`);
		dispatch({
			type: GET_PROFILEBYID,
			payload: res.data
		});
	} catch (err) {
		dispatch({
			type: PROFILE_ERROR,
			payload: { msg: err?.response?.statusText, status: err?.response?.status }
		});
	}
};

export const getRepos = githubUsername => async dispatch => {
	try {
		let res = await axios.get(`/api/profile/github/${githubUsername}`);
		dispatch({
			type: GET_REPOS,
			payload: res.data
		});
	} catch (err) {
		dispatch({
			type: PROFILE_ERROR,
			payload: { msg: err?.response?.statusText, status: err?.response?.status }
		});
	}
};

export const createProfile = (
	body,
	history,
	edit = false
) => async dispatch => {
	try {
		let config = {
			headers: {
				"Content-Type": "application/json"
			}
		};
		body = JSON.stringify(body);
		let res = await axios.post("/api/profile/me", body, config);
		dispatch({
			type: GET_PROFILE,
			payload: res.data
		});
		if (!edit) {
			history.push("/dashboard");
		}
		dispatch(
			setAlert(
				edit ? "Profile edited successfully" : "Profile created successfully",
				"success"
			)
		);
	} catch (err) {
		dispatch({
			type: PROFILE_ERROR,
			payload: { msg: err?.response?.statusText, status: err?.response?.status }
		});
		let errors = err.response.data.errors;
		if (errors) errors.forEach(err => dispatch(setAlert(err.msg, "danger")));
	}
};

export const addExperience = (body, history) => async dispatch => {
	try {
		let config = {
			headers: {
				"Content-Type": "application/json"
			}
		};
		body = JSON.stringify(body);
		let res = await axios.put("/api/profile/experience", body, config);
		dispatch({
			type: UPDATE_PROFILE,
			payload: res.data
		});
		dispatch(setAlert("Experience created successfully", "success"));
		history.push("/dashboard");
	} catch (err) {
		dispatch({
			type: PROFILE_ERROR,
			payload: { msg: err?.response?.statusText, status: err?.response?.status }
		});
		let errors = err.response.data.errors;
		if (errors) errors.forEach(err => dispatch(setAlert(err.msg, "danger")));
	}
};

export const addEducation = (body, history) => async dispatch => {
	try {
		let config = {
			headers: {
				"Content-Type": "application/json"
			}
		};
		body = JSON.stringify(body);
		let res = await axios.put("/api/profile/education", body, config);
		dispatch({
			type: UPDATE_PROFILE,
			payload: res.data
		});
		dispatch(setAlert("Education created successfully", "success"));
		history.push("/dashboard");
	} catch (err) {
		dispatch({
			type: PROFILE_ERROR,
			payload: { msg: err?.response?.statusText, status: err?.response?.status }
		});
		let errors = err.response.data.errors;
		if (errors) errors.forEach(err => dispatch(setAlert(err.msg, "danger")));
	}
};

export const deleteEducation = edu_id => async dispatch => {
	try {
		let res = await axios.delete(`/api/profile/education/${edu_id}`);
		dispatch({
			type: UPDATE_PROFILE,
			payload: res.data
		});
		dispatch(setAlert("Education deleted successfully", "success"));
	} catch (err) {
		dispatch({
			type: PROFILE_ERROR,
			payload: { msg: err?.response?.statusText, status: err?.response?.status }
		});
	}
};

export const deleteExperience = exp_id => async dispatch => {
	try {
		let res = await axios.delete(`/api/profile/experience/${exp_id}`);
		dispatch({
			type: UPDATE_PROFILE,
			payload: res.data
		});
		dispatch(setAlert("Experience deleted successfully", "success"));
	} catch (err) {
		dispatch({
			type: PROFILE_ERROR,
			payload: { msg: err?.response?.statusText, status: err?.response?.status }
		});
	}
};
