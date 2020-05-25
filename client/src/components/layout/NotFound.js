import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";

const NotFound = () => {
	return (
		<div style={{ textAlign: "center" }} className="my-2">
			<h1 className="x-large text-primary">
				<FontAwesomeIcon icon={faExclamationTriangle} />
				{"  "}
				404 Page Not Found
			</h1>
			<p className="large">Sorry, this page doesnot exist</p>
		</div>
	);
};

export default NotFound;
