import React from "react";

class MyPureComponent extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    for (let key in nextProps) {
      if (nextProps[key] !== this.props[key]) {
        return true;
      }
    }
    for (let key in this.props) {
      if (!(key in nextProps)) {
        return true;
      }
    }

    for (let key in nextState) {
      if (nextState[key] !== this.state[key]) {
        return true;
      }
    }
    for (let key in this.state) {
      if (!(key in nextState)) {
        return true;
      }
    }

    return false;
  }

  render() {
    return <div>{this.props.children}</div>;
  }
}

export default MyPureComponent;
