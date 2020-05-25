import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { logout } from "../../actions/auth";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faSignOutAlt,
	faCode,
	faUser
} from "@fortawesome/free-solid-svg-icons";

const Navbar = ({ auth: { isAuthenticated, loading }, logout, history }) => {
	const logoutUser = () => {
		logout(history);
	};
	const authLinks = (
		<ul>
			<li>
				<Link to="/developers">Developers</Link>
			</li>
			<li>
				<Link to="/posts">Posts</Link>
			</li>
			<li>
				<FontAwesomeIcon icon={faUser} />
				<Link to="/dashboard">Dashboard</Link>
			</li>
			<li>
				<span onClick={logoutUser} style={{ cursor: "pointer" }}>
					<FontAwesomeIcon icon={faSignOutAlt} /> {"  "}
					<span className="hide-sm">Logout</span>
				</span>
			</li>
		</ul>
	);
	const guestLinks = (
		<ul>
			<li>
				<Link to="/developers">Developers</Link>
			</li>
			<li>
				<Link to="/register">Register</Link>
			</li>
			<li>
				<Link to="/login">Login</Link>
			</li>
		</ul>
	);

	return (
		<nav className="navbar bg-dark">
			<h1>
				<Link to="/">
					<FontAwesomeIcon icon={faCode} /> DevSociety
				</Link>
			</h1>
			{!loading && (
				<Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
			)}
		</nav>
	);
};

Navbar.propTypes = {
	auth: PropTypes.object.isRequired,
	logout: PropTypes.func.isRequired
};

const mapStateToProps = state => {
	return {
		auth: state.auth
	};
};

export default connect(mapStateToProps, { logout })(withRouter(Navbar));
