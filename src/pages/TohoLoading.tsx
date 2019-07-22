import React, { Component } from 'react';
import './css/TohoLoading.css';

export interface TohoLoadingState {
  currentDot: string;
}

export default class TohoLoading extends Component<any, TohoLoadingState> {
  timer: number;
  counter = 3;
  dots = ['.', '..', '...', '....', '.....'];

  state = {
    currentDot: this.dots[2],
  };

  componentDidMount() {
    this.timer = window.setInterval(() => {
      this.setState({ currentDot: this.dots[this.counter % 5] });
      this.counter++;
    }, 800);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    const { currentDot } = this.state;
    return (
      <div
        style={{
          position: 'absolute',
          top: '47%',
          left: '46%',
          transform: 'translate3D(-50%, -50%)',
        }}
      >
        <span style={{ fontSize: 28 }}>少女祈祷中{currentDot}</span>
      </div>
    );
  }
}
