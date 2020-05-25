import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getProfiles } from "./../../actions/profile";
import Spinner from "./../layout/Spinner";
import ProfileItem from "./../profiles/ProfileItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";

const Profiles = ({ getProfiles, profile: { profiles, loading } }) => {
	useEffect(() => {
		getProfiles();
	}, [getProfiles]);
	return loading ? (
		<Spinner />
	) : (
		<Fragment>
			{profiles.length > 0 ? (
				<Fragment>
					<h1 className="large text-primary">Developers</h1>
					<p className="lead">
						<FontAwesomeIcon icon={faGlobe} />
						{"  "}
						Browse and connect with developers
					</p>
					<div className="profiles">
						{profiles.map(profile => (
							<ProfileItem key={profile._id} profile={profile} />
						))}
					</div>
				</Fragment>
			) : (
				<h4>No Profiles found....</h4>
			)}
		</Fragment>
	);
};

Profiles.propTypes = {
	getProfiles: PropTypes.func.isRequired,
	profile: PropTypes.object.isRequired
};

const mapStateToProps = state => {
	return {
		profile: state.profile
	};
};

export default connect(mapStateToProps, { getProfiles })(Profiles);
