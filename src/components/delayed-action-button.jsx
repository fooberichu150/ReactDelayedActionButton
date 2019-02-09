import React, { Component } from "react";
import PropTypes from "prop-types";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logger from "debug";

import ProgressButton from "./progress-button";
import { isNullOrUndefined } from "../utility/object-utils";

const classNamesProps = {
  button: PropTypes.string,
  cancelButton: PropTypes.string,
  spinner: PropTypes.string
};

const defaultClassNames = {
  button: "btn btn-primary",
  cancelButton: "btn btn-danger",
  spinner: null
};

const debug = logger("demo");
export class DelayedActionButton extends Component {
  static displayName = DelayedActionButton.name;

  constructor(props) {
    super(props);

    this.state = {
      isActionPending: false,
      percentage: 0
    };
  }

  initializeTimeout() {
    this._timer = setTimeout(() => {
      //debug("delay completed...");
      this.stopTimeout(true);
    }, this.props.delay);
    this._timeElapsed = 0;
    this._interval = setInterval(() => {
      this._timeElapsed += this.props.updateInterval;
      let percentage = Math.round(100 * (this._timeElapsed / this.props.delay));
      //debug(percentage);
      /*debug(
        "delay: %d, elapsed: %d, percentage: %d%%",
        this.props.delay,
        this._timeElapsed,
        percentage
      );*/
      this.setState({ percentage });
    }, 250);
  }

  stopTimeout(performAction = false) {
    this._timeElapsed = 0;
    if (!isNullOrUndefined(this._interval)) clearInterval(this._interval);

    if (!isNullOrUndefined(this._timer)) clearTimeout(this._timer);

    this._interval = null;
    this._timer = null;

    this.setState({ isActionPending: false, percentage: 0 }, () => {
      if (performAction) this.props.action();
    });
  }

  onButtonClicked(event) {
    event.preventDefault();
    event.stopPropagation();
    //debug("delayed action began...");

    this.setState({ isActionPending: true }, this.initializeTimeout.bind(this));
  }

  onCancelClicked(event) {
    //debug("delayed action canceled...");
    this.stopTimeout();
  }

  render() {
    const classNames = Object.assign(
      {},
      defaultClassNames,
      this.props.classNames
    );

    let contents = this.state.isActionPending ? (
      <div className="delayed-action-button">
        <ProgressButton
          percentage={this.state.percentage}
          onClick={this.onCancelClicked.bind(this)}
        >
          <FontAwesomeIcon icon="times-circle" />
        </ProgressButton>
      </div>
    ) : (
      <button
        type="button"
        className={classNames.button}
        onClick={this.onButtonClicked.bind(this)}
      >
        {this.props.children}
      </button>
    );

    return <React.Fragment>{contents}</React.Fragment>;
  }
}

DelayedActionButton.propTypes = {
  classNames: PropTypes.shape(classNamesProps),
  delay: PropTypes.number,
  action: PropTypes.func.isRequired,
  updateInterval: PropTypes.number
};

DelayedActionButton.defaultProps = {
  classNames: defaultClassNames,
  delay: 3000,
  updateInterval: 250
};
