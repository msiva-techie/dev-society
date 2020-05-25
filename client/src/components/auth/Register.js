import React, { Fragment } from "react";
import { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { setAlert } from "./../../actions/alert";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { register } from "../../actions/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const Register = ({ setAlert, register, isAuthenticated }) => {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
		password2: ""
	});
	const { name, email, password, password2 } = formData;
	const onChange = e => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value
		});
	};
	const onSubmit = e => {
		e.preventDefault();
		if (password !== password2) {
			setAlert("Passwords do not match", "danger");
		} else {
			register({ name, email, password });
		}
		return false;
	};
	if (isAuthenticated) {
		return <Redirect to="/dashboard" />;
	}
	return (
		<Fragment>
			<h1 className="large text-primary">Sign Up</h1>
			<p className="lead">
				<FontAwesomeIcon icon={faUser} /> Create Your Account
			</p>
			<form className="form" onSubmit={onSubmit}>
				<div className="form-group">
					<input
						type="text"
						placeholder="Name"
						name="name"
						value={name}
						onChange={onChange}
						required
					/>
				</div>
				<div className="form-group">
					<input
						type="email"
						placeholder="Email Address"
						name="email"
						value={email}
						onChange={onChange}
						required
					/>
					<small className="form-text">
						This site uses Gravatar so if you want a profile image, use a
						Gravatar email
					</small>
				</div>
				<div className="form-group">
					<input
						type="password"
						placeholder="Password"
						name="password"
						minLength="6"
						value={password}
						onChange={onChange}
						required
					/>
				</div>
				<div className="form-group">
					<input
						type="password"
						placeholder="Confirm Password"
						name="password2"
						minLength="6"
						value={password2}
						onChange={onChange}
						required
					/>
				</div>
				<input type="submit" className="btn btn-primary" value="Register" />
			</form>
			<p className="my-1">
				Already have an account? <Link to="/login">Sign In</Link>
			</p>
		</Fragment>
	);
};

Register.propTypes = {
	setAlert: PropTypes.func.isRequired,
	register: PropTypes.func.isRequired,
	isAuthenticated: PropTypes.bool
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

const mapStateToProps = state => {
	return {
		isAuthenticated: state.auth.isAuthenticated
	};
};

export default connect(mapStateToProps, { setAlert, register })(Register);