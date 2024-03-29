import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getProfileById } from "./../../actions/profile";
import Spinner from "../layout/Spinner";
import { Link } from "react-router-dom";
import ProfileTop from "./ProfileTop";
import ProfileAbout from "./ProfileAbout";
import ProfileExperience from "./ProfileExperience";
import ProfileEducation from "./ProfileEducation";
import ProfileGithub from "./ProfileGithub";

const Profile = ({
	match,
	getProfileById,
	profile: { profile, loading },
	auth
}) => {
	useEffect(() => {
		getProfileById(match.params.id);
	}, [getProfileById, match.params.id]);

	return !profile && loading ? (
		<Spinner />
	) : (
		<Fragment>
			<Link to="/developers" className="btn btn-light">
				Go To Profiles
			</Link>
			{auth.isAuthenticated &&
				!auth.loading &&
				!profile.loading &&
				auth.user._id === profile.user._id && (
					<Link to="/edit-profile" className="btn btn-dark">
						Edit Profile
					</Link>
				)}
			<div className="profile-grid my-1">
				<ProfileTop profile={profile} />
				<ProfileAbout profile={profile} />
				<div className="profile-exp bg-white p-2">
					<h2 className="text-primary">Experience</h2>
					{profile?.experience?.length > 0 ? (
						<Fragment>
							{profile.experience.map(exp => (
								<ProfileExperience key={exp._id} experience={exp} />
							))}
						</Fragment>
					) : (
						<h4> No Experience Found</h4>
					)}
				</div>
				<div className="profile-edu bg-white p-2">
					<h2 className="text-primary">Education</h2>
					{profile.education.length > 0 ? (
						<Fragment>
							{profile.education.map(edu => (
								<ProfileEducation key={edu._id} education={edu} />
							))}
						</Fragment>
					) : (
						<h4> No Education Found</h4>
					)}
				</div>
				{profile.githubusername && (
					<ProfileGithub username={profile.githubusername} />
				)}
			</div>
		</Fragment>
	);
};

Profile.propTypes = {
	auth: PropTypes.object.isRequired,
	profile: PropTypes.object.isRequired,
	getProfileById: PropTypes.func.isRequired
};

const mapStateToProps = state => {
	return {
		profile: state.profile,
		auth: state.auth
	};
};
export default connect(mapStateToProps, { getProfileById })(Profile);
