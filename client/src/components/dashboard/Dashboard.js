import React, { useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import Spinner from "./../layout/Spinner";
import { connect } from "react-redux";
import { getCurrentProfile } from "./../../actions/profile";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faUserMinus } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import DashboardActions from "./DashboardActions";
import Experience from "./Experience";
import Education from "./Education";
import { deleteAccount } from "./../../actions/auth";

const Dashboard = ({
	getCurrentProfile,
	deleteAccount,
	auth: { user },
	profile: { profile, loading }
}) => {
	useEffect(() => {
		getCurrentProfile();
	}, [getCurrentProfile]);
	return loading && profile === null ? (
		<Spinner />
	) : (
		<Fragment>
			<h1 className="large text-primary">Dashboard</h1>
			<p className="lead">
				<FontAwesomeIcon icon={faUser} />
				{"  "}
				Welcome {user?.name}
			</p>
			{profile ? (
				<Fragment>
					<DashboardActions />
					<Experience experience={profile.experience} />
					<Education education={profile.education} />
					<div className="my-2">
						<button
							onClick={() => {
								deleteAccount();
							}}
							className="btn btn-danger"
						>
							<FontAwesomeIcon icon={faUserMinus} />
							{"  "} Delete Account
						</button>
					</div>
				</Fragment>
			) : (
				<Fragment>
					<p>You have not yet setup a profile. Please add some info.</p>
					<Link to="/create-profile" className="btn btn-primary my-1">
						CREATE PROFILE
					</Link>
				</Fragment>
			)}
		</Fragment>
	);
};

Dashboard.propTypes = {
	getCurrentProfile: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	profile: PropTypes.object.isRequired
};
const mapStateToProps = state => {
	return {
		auth: state.auth,
		profile: state.profile
	};
};
export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(
	Dashboard
);
