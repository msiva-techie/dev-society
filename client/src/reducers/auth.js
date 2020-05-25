import {
	REGISTER_SUCCESS,
	REGISTER_FAILURE,
	LOGIN_SUCCESS,
	LOGIN_FAILURE,
	LOGOUT,
	LOAD_USER,
	AUTH_ERROR,
	ACCOUNT_DELETED
} from "./../actions/types";

const initialState = {
	token: localStorage.getItem("token"),
	loading: true,
	isAuthenticated: null,
	user: null
};

export default (state = initialState, action) => {
	const { type, payload } = action;
	switch (type) {
		case LOAD_USER:
			return {
				...state,
				user: payload,
				loading: false,
				isAuthenticated: true
			};
		case REGISTER_SUCCESS:
		case LOGIN_SUCCESS:
			localStorage.setItem("token", payload.token);
			return {
				...state,
				...payload,
				loading: false,
				isAuthenticated: true
			};
		case ACCOUNT_DELETED:
		case AUTH_ERROR:
		case REGISTER_FAILURE:
		case LOGIN_FAILURE:
		case LOGOUT:
			localStorage.removeItem("token");
			return {
				...state,
				loading: false,
				isAuthenticated: false,
				token: null
			};
		default:
			return state;
	}
};
