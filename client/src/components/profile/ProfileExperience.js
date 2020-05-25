import React from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";

const ProfileExperience = ({
	experience: { from, to, company, title, location, current, description }
}) => {
	return (
		<div>
			<h3 class="text-dark">{company}</h3>
			<p>
				<Moment format="YYYY/MM/DD">{from}</Moment> -{" "}
				{!current ? <Moment format="YYYY/MM/DD">{to}</Moment> : "Current"}
			</p>
			<p>
				<strong>Position: </strong>
				{title}
			</p>
			{location && (
				<p>
					<strong>Location: </strong>
					{location}
				</p>
			)}
			{description && (
				<p>
					<strong>Description: </strong>
					{description}
				</p>
			)}
		</div>
	);
};

ProfileExperience.propTypes = {
	experience: PropTypes.object.isRequired
};

export default ProfileExperience;
