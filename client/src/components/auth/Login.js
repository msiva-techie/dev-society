import React, { Fragment } from "react";
import { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { login } from "./../../actions/auth";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const Login = ({ login, isAuthenticated }) => {
	const [formData, setFormData] = useState({
		email: "",
		password: ""
	});
	const { email, password } = formData;
	const onChange = e => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value
		});
	};
	const onSubmit = e => {
		e.preventDefault();
		login(email, password);
		return false;
	};
	if (isAuthenticated) {
		return <Redirect to="/dashboard" />;
	}
	return (
		<Fragment>
			<h1 className="large text-primary">Sign In</h1>
			<p className="lead">
				<FontAwesomeIcon icon={faUser} /> Sign into Your Account
			</p>
			<form className="form" onSubmit={onSubmit}>
				<div className="form-group">
					<input
						type="email"
						placeholder="Email Address"
						name="email"
						value={email}
						onChange={onChange}
						required
					/>
				</div>
				<div className="form-group">
					<input
						type="password"
						placeholder="Password"
						name="password"
						value={password}
						onChange={onChange}
						required
					/>
				</div>
				<input type="submit" className="btn btn-primary" value="Login" />
			</form>
			<p className="my-1">
				Don't have an account? <Link to="/register">Sign Up</Link>
			</p>
		</Fragment>
	);
};

Login.propTypes = {
	login: PropTypes.func.isRequired,
	isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => {
	return {
		isAuthenticated: state.auth.isAuthenticated
	};
};

// const mapDispatchToProps = dispatch => {
// 	const id = uuidv4();
// 	return {
// 		setAlert: (message, type) => {
// 			dispatch(setAlert({ id, message, type }));
// 			setTimeout(() => {
// 				dispatch(removeAlert(id));
// 			}, 3000);
// 		}
// 	};
// };

export default connect(mapStateToProps, { login })(Login);
