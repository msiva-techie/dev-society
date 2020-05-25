import {
	GET_POSTS,
	GET_POST,
	POST_ERROR,
	UPDATE_LIKE,
	DELETE_POST,
	ADD_POST,
	UPDATE_COMMENT
} from "./../actions/types";

const initialState = {
	posts: [],
	post: null,
	loading: true
};

export default function (state = initialState, action) {
	const { type, payload } = action;
	switch (type) {
		case GET_POSTS:
			return {
				...state,
				posts: payload,
				loading: false
			};
		case GET_POST:
			return {
				...state,
				post: payload,
				loading: false
			};
		case UPDATE_LIKE:
			return {
				...state,
				posts: state.posts.map(post =>
					post._id === payload.id
						? {
								...post,
								likes: payload.likes
						  }
						: post
				)
			};
		case DELETE_POST:
			return {
				...state,
				posts: state.posts.filter(post => post._id !== payload)
			};
		case ADD_POST:
			return {
				...state,
				posts: [payload, ...state.posts],
				loading: false
			};
		case UPDATE_COMMENT:
			return {
				...state,
				post: { ...state.post, comments: [...payload] },
				loading: false
			};
		case POST_ERROR:
			return {
				...state,
				error: payload,
				loading: false
			};
		default:
			return state;
	}
}
