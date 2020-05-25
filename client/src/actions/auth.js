import axios from "axios";
import {
	REGISTER_SUCCESS,
	REGISTER_FAILURE,
	LOGIN_SUCCESS,
	LOGIN_FAILURE,
	LOGOUT,
	LOAD_USER,
	AUTH_ERROR,
	CLEAR_PROFILE,
	ACCOUNT_DELETED,
	PROFILE_ERROR
} from "./types";
import { setAlert } from "./alert";
import setAuthToken from "./../utils/setAuthToken";

export const loadUser = () => async dispatch => {
	try {
		if (localStorage.getItem("token")) {
			setAuthToken();
		}
		const response = await axios.get("/api/auth");
		dispatch({
			type: LOAD_USER,
			payload: response.data
		});
	} catch (err) {
		dispatch({
			type: AUTH_ERROR
		});
	}
};

export const register = ({ name, email, password }) => async dispatch => {
	const config = {
		headers: {
			"Content-Type": "application/json"
		}
	};
	const body = JSON.stringify({ name, email, password });

	try {
		const response = await axios.post("/api/users", body, config);
		dispatch({
			type: REGISTER_SUCCESS,
			payload: response.data
		});
		dispatch(loadUser());
	} catch (err) {
		dispatch({
			type: REGISTER_FAILURE
		});
		let errors = err.response.data.errors;
		if (errors) errors.forEach(err => dispatch(setAlert(err.msg, "danger")));
	}
};

export const login = (email, password) => async dispatch => {
	const config = {
		headers: {
			"Content-Type": "application/json"
		}
	};
	const body = JSON.stringify({ email, password });

	try {
		const response = await axios.post("/api/auth", body, config);
		dispatch({
			type: LOGIN_SUCCESS,
			payload: response.data
		});
		dispatch(loadUser());
	} catch (err) {
		dispatch({
			type: LOGIN_FAILURE
		});
		let errors = err.response.data.errors;
		if (errors) errors.forEach(err => dispatch(setAlert(err.msg, "danger")));
	}
};

export const logout = history => async dispatch => {
	dispatch({
		type: CLEAR_PROFILE
	});
	dispatch({
		type: LOGOUT
	});
	history.push("/");
};

export const deleteAccount = () => async dispatch => {
	if (window.confirm("Are You Sure? This can NOT be undone.")) {
		try {
			await axios.delete("/api/profile");
			dispatch({
				type: CLEAR_PROFILE
			});
			dispatch({
				type: ACCOUNT_DELETED
			});
			dispatch(setAlert("Account deleted"));
		} catch (err) {
			dispatch({
				type: PROFILE_ERROR,
				payload: {
					msg: err?.response?.statusText,
					status: err?.response?.status
				}
			});
		}
	}
};
