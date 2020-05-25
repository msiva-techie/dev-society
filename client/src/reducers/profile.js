import {
	GET_PROFILE,
	PROFILE_ERROR,
	CLEAR_PROFILE,
	UPDATE_PROFILE,
	GET_PROFILES,
	GET_PROFILEBYID,
	GET_REPOS
} from "./../actions/types";

const initialState = {
	profile: null,
	profiles: [],
	loading: true,
	repos: null,
	error: {}
};

export default function (state = initialState, action) {
	const { type, payload } = action;
	switch (type) {
		case UPDATE_PROFILE:
		case GET_PROFILE:
			return {
				...state,
				profile: payload,
				loading: false
			};
		case GET_PROFILES:
			return {
				...state,
				profiles: payload,
				loading: false
			};
		case GET_PROFILEBYID:
			return {
				...state,
				profile: payload,
				loading: false
			};
		case GET_REPOS:
			return {
				...state,
				repos: payload,
				loading: false
			};
		case PROFILE_ERROR:
			return {
				...state,
				loading: false,
				error: payload
			};
		case CLEAR_PROFILE:
			return {
				...state,
				loading: false,
				profile: null,
				repos: null
			};
		default:
			return state;
	}
}
