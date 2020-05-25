import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faUserCircle,
	faUserTie,
	faGraduationCap
} from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile } from "./../../actions/profile";

const DashboardActions = ({ getCurrentProfile, profile: { profile } }) => {
	useEffect(() => {
		getCurrentProfile();
	}, getCurrentProfile);
	return (
		<div className="dash-buttons">
			<Link to={`/profile/${profile._id}`} className="btn btn-light">
				<FontAwesomeIcon icon={faUserCircle} /> {"    "}
				View Profile
			</Link>
			<Link to="/add-experience" className="btn btn-light">
				<FontAwesomeIcon icon={faUserTie} /> {"    "}
				Add Experience
			</Link>
			<Link to="/add-education" className="btn btn-light">
				<FontAwesomeIcon icon={faGraduationCap} /> {"    "}
				Add Education
			</Link>
		</div>
	);
};

DashboardActions.propTypes = {
	getCurrentProfile: PropTypes.func.isRequired,
	profile: PropTypes.object.isRequired
};

const mapStateToProps = state => {
	return {
		profile: state.profile
	};
};

export default connect(mapStateToProps, { getCurrentProfile })(
	DashboardActions
);
