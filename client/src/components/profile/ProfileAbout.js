import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";

const ProfileAbout = ({
	profile: {
		user: { name, _id },
		bio,
		skills
	},
	auth
}) => {
	return (
		<div class="profile-about bg-light p-2">
			{bio ? (
				<Fragment>
					<h2 class="text-primary" style={{ textTransform: "capitalize" }}>
						{name.trim().split(" ")[0]}'s Bio
					</h2>
					<p>
						{" "}
						<span>{bio}</span>
					</p>
				</Fragment>
			) : (
				auth.isAuthenticated &&
				!auth.loading &&
				auth.user._id === _id && (
					<Fragment>
						<h2 class="text-primary">{name.trim().split(" ")[0]}'s Bio</h2>
						<p>
							<span>
								Tell us a little about yourself. Click the EDIT button
							</span>
						</p>
					</Fragment>
				)
			)}
			<div class="line"></div>
			<h2 class="text-primary">Skill Set</h2>
			<div class="skills">
				{skills &&
					skills.map((skill, index) => (
						<div class="p-1" key={index}>
							<FontAwesomeIcon icon={faCheck} /> {"  "} {skill}
						</div>
					))}
			</div>
		</div>
	);
};

ProfileAbout.propTypes = {
	profile: PropTypes.object.isRequired
};

const mapStateToProps = state => {
	return {
		auth: state.auth
	};
};

export default connect(mapStateToProps)(ProfileAbout);
