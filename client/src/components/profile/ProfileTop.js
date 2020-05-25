import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import {
	faTwitter,
	faFacebook,
	faYoutube,
	faLinkedin,
	faInstagram
} from "@fortawesome/free-brands-svg-icons";

const ProfileTop = ({
	profile: {
		company,
		status,
		location,
		user: { name, gravatar },
		social,
		website
	}
}) => {
	return (
		<div
			class="profile-top bg-primary p-2"
			style={{
				textTransform: "capitalize"
			}}
		>
			<img class="round-img my-1" src={gravatar} alt="" />
			<h1 class="large">{name}</h1>
			<p
				class="lead"
				style={{
					textTransform: "none"
				}}
			>
				{status} {company && <span> at {company}</span>}
			</p>
			<p>{location && <span>{location}</span>}</p>
			<div class="icons my-1">
				{website && (
					<a href={website} target="_blank" rel="noopener noreferrer">
						<FontAwesomeIcon icon={faGlobe} size="lg" />
					</a>
				)}
				{social?.twitter && (
					<a href={social.twitter} target="_blank" rel="noopener noreferrer">
						<FontAwesomeIcon icon={faTwitter} size="lg" />
					</a>
				)}
				{social?.facebook && (
					<a href={social.facebook} target="_blank" rel="noopener noreferrer">
						<FontAwesomeIcon icon={faFacebook} size="lg" />
					</a>
				)}
				{social?.linkedin && (
					<a href={social.linkedin} target="_blank" rel="noopener noreferrer">
						<FontAwesomeIcon icon={faLinkedin} size="lg" />
					</a>
				)}
				{social?.youtube && (
					<a href={social.youtube} target="_blank" rel="noopener noreferrer">
						<FontAwesomeIcon icon={faYoutube} size="lg" />
					</a>
				)}
				{social?.instagram && (
					<a href={social.instagram} target="_blank" rel="noopener noreferrer">
						<FontAwesomeIcon icon={faInstagram} size="lg" />
					</a>
				)}
			</div>
		</div>
	);
};

ProfileTop.propTypes = {
	profile: PropTypes.object.isRequired
};

export default ProfileTop;
