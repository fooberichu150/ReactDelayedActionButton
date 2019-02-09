import React, { Component } from "react";
import PropTypes from "prop-types";

export const InfoMarquee = props => {
  const { children, className } = props;

  return (
    <div className={`alert-info border border-info rounded p-2 ${className}`}>
      {children}
    </div>
  );
};
