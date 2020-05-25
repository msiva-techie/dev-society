import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const Alert = ({ alerts }) => {
	return alerts.map(alert => {
		return (
			<div
				key={alert.id}
				style={{
					position: "fixed",
					top: "10",
					left: 0,
					right: 0,
					fontSize: "25px",
					margin: "auto",
					width: "72vw",
					// textAlign: "center",
					// fontWeight: "bold",
					boxShadow:
						"0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
					// zIndex: "999",
				}}
				className={`alert alert-${alert.type}`}
			>
				{alert.message}
			</div>
		);
	});
};

Alert.propTypes = {
	alerts: PropTypes.array.isRequired
};

const mapStateToProps = state => {
	return {
		alerts: state.alert
	};
};

export default connect(mapStateToProps)(Alert);
