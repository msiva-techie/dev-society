import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

const ProfileItem = ({
	profile: {
		status,
		company,
		location,
		skills,
		user: { _id, gravatar, name }
	}
}) => {
	return (
		<div className="profile bg-light">
			<img src={gravatar} alt="profile" className="round-img" />
			<div
				style={{
					textTransform: "capitalize"
				}}
			>
				<h2>{name}</h2>
				<p>
					{status}{" "}
					{company && (
						<span
							style={{
								textTransform: "none"
							}}
						>
							{" "}
							at {company}
						</span>
					)}
				</p>
				<p className="my-1">{location && <span>{location}</span>}</p>
				<Link to={`/profile/${_id}`} className="btn btn-primary">
					View Profile
				</Link>
			</div>
			<ul>
				{[...skills].slice(0, 4).map((skill, index) => (
					<li key={index} className="text-primary">
						<FontAwesomeIcon icon={faCheck} />
						{"  "}
						{skill}
					</li>
				))}
			</ul>
		</div>
	);
};

ProfileItem.propTypes = {
	profile: PropTypes.object.isRequired
};

export default ProfileItem;
