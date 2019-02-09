import React, { Component } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logger from "debug";

import { DelayedActionButton } from "./delayed-action-button";
import { InfoMarquee } from "./info-marquee";
import { isNullOrEmptyString } from "../utility/object-utils";

const debug = logger("demo");
export class DemoContainer extends Component {
  static displayName = DemoContainer.name;

  constructor(props) {
    super(props);

    this.state = {
      message: ""
    };
  }

  onActionExecuted() {
    debug("action executed: ");
    this.setMessage();
  }

  setMessage() {
    let timer = () =>
      setTimeout(() => {
        this.setState({ message: null });
      }, 2500);
    this.setState({ message: "Action has executed..." }, timer);
  }

  render() {
    const { message } = this.state;
    const showMessage = !isNullOrEmptyString(message);

    return (
      <div>
        <p>
          Action waits 3s before firing, will display a message that will then
          go away after 2.5s.
        </p>
        <DelayedActionButton
          classNames={{ button: "btn btn-danger" }}
          action={this.onActionExecuted.bind(this)}
        >
          <FontAwesomeIcon icon="trash" />
        </DelayedActionButton>
        {showMessage && <InfoMarquee className="mt-3">Hi</InfoMarquee>}
      </div>
    );
  }
}
