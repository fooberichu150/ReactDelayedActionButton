import React, { Component } from "react";
import PropTypes from "prop-types";

import CircularProgressbar from "react-circular-progressbar";

const ProgressButton = props => {
  return (
    <div className={`progress-button ${props.cssClass || ""}`}>
      <CircularProgressbar
        percentage={props.percentage}
        styles={{ path: { stroke: "#f88" } }}
      />
      <button
        type="button"
        className="btn bare text-danger"
        onClick={props.onClick}
      >
        {props.children}
      </button>
    </div>
  );
};

ProgressButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  percentage: PropTypes.number
};

ProgressButton.defaultProps = {
  percentage: 0
};

export default ProgressButton;
