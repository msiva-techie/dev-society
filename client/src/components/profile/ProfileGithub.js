import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithubAlt } from "@fortawesome/free-brands-svg-icons";
import { getRepos } from "./../../actions/profile";

const ProfileGithub = ({ getRepos, username, repos }) => {
	useEffect(() => {
		getRepos(username);
	}, [getRepos]);
	return repos === null ? (
		<Spinner />
	) : (
		<div className="profile-github">
			<h2 className="text-primary my-1">
				<FontAwesomeIcon icon={faGithubAlt} size="lg" /> Github Repos
			</h2>
			{repos.length > 0 ? (
				repos.map(repo => (
					<div key="repo._id" className="repo bg-white p-1 my-1">
						<div>
							<h4>
								<a href="#" target="_blank" rel="noopener noreferrer">
									{repo.name}
								</a>
							</h4>
							<p>{repo.description}</p>
						</div>
						<div>
							<ul>
								<li className="badge badge-primary">
									Stars: {repo.stargazers_count}
								</li>
								<li className="badge badge-dark">
									Watchers: {repo.watchers_count}
								</li>
								<li className="badge badge-light">Forks: {repo.forks_count}</li>
							</ul>
						</div>
					</div>
				))
			) : (
				<h4>No Repos Found</h4>
			)}
		</div>
	);
};

ProfileGithub.propTypes = {};

const mapStateToProps = state => {
	return {
		repos: state.profile.repos
	};
};

export default connect(mapStateToProps, { getRepos })(ProfileGithub);
