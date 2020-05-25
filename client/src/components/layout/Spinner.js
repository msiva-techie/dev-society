import React, { Fragment } from "react";
import spinner from "./spinner.gif";
const Spinner = () => {
	return (
		<Fragment>
			<img
				src={spinner}
				alt="Loading....."
				style={{ margin: "auto", width: "200px", display: "block" }}
			/>
		</Fragment>
	);
};

export default Spinner;
