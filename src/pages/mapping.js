import React, { Component } from 'react';

import '../assets/mapping.css';

export default class mapping extends Component {
  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = () => {
    // eslint-disable-next-line
    console.log(location);
  };

  render = () => {
    return <div className="mapping">mapping</div>;
  };
}
