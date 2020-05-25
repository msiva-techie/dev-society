import React from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";

const ProfileEducation = ({
	education: { from, to, school, degree, fieldofstudy, current, description }
}) => {
	return (
		<div>
			<h3 class="text-dark">{school}</h3>
			<p>
				<Moment format="YYYY/MM/DD">{from}</Moment> -{" "}
				{!current ? <Moment format="YYYY/MM/DD">{to}</Moment> : "Current"}
			</p>
			<p>
				<strong>Degree: </strong>
				{degree}
			</p>
			<p>
				<strong>Field of study: </strong>
				{fieldofstudy}
			</p>
			{description && (
				<p>
					<strong>Description: </strong>
					{description}
				</p>
			)}
		</div>
	);
};

ProfileEducation.propTypes = {
	education: PropTypes.object.isRequired
};

export default ProfileEducation;
