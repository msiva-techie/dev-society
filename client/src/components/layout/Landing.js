import React from "react";
import { Link, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const Landing = ({ auth: { isAuthenticated } }) => {
	if (isAuthenticated) {
		return <Redirect to="/dashboard" />;
	}
	return (
		<section className="landing" style={{ height: "111.1vh" }}>
			<div className="dark-overlay">
				<div className="landing-inner">
					<h1 className="x-large">Developer Society</h1>
					<p className="lead">
						Create a developer profile/portfolio, share posts and get help from
						other developers
					</p>
					<div className="buttons">
						<Link to="/register" className="btn btn-primary">
							Sign Up
						</Link>
						<Link to="/login" className="btn btn-light">
							Login
						</Link>
					</div>
				</div>
			</div>
		</section>
	);
};

Landing.propTypes = {
	auth: PropTypes.object.isRequired
};

const mapStateToProps = state => {
	return {
		auth: state.auth
	};
};

export default connect(mapStateToProps)(Landing);
