import React, { Component } from 'react';
import './css/TohoLoading.css';

const neta = [
  [
    '你们体会过吉娃娃丢了的感觉吗？',
    '我家的是杂交的',
    '巨小',
    '找了一下午没找到',
    '回家趴在桌子上正要号啕大哭的时候',
    '妈的抽屉里突然传来犬吠...',
    '',
  ],
  [
    '人家才子看到美景会说',
    '落霞与孤鹜齐飞，秋水共长天一色',
    '而你只会说',
    '卧槽真鸡儿好看',
    '',
  ],
  ['机场验票', '"先生，您脸上这道疤是怎么回事？"', '"当年我妈剖腹产……"', ''],
  [
    '从前有座山',
    '山上有座庙',
    '庙里有个老和尚和小和尚',
    '有一天小和尚对老和尚说',
    '"爸爸，外面下雪了！"',
    '',
  ],
  [
    '胡说，哪来的墙',
    '常听人说的什么 google，facebook 啊',
    '因为只是小公司，服务不稳定，才会出现404错误',
    '归根结底这些小企业没有党性，发展不起来',
    '',
  ],
];

export interface TohoLoadingProps {
  currentNeta?: string[];
}

export interface TohoLoadingState {
  currentNeta: string[];
  currentNetaIndex: number;
  currentDot: string;
  dotTop: string;
  dotLeft: string;
  dotFontSize: number;
}

export default class TohoLoading extends Component<
  TohoLoadingProps,
  TohoLoadingState
> {
  timer: number;
  dots = ['.', '..', '...', '....', '.....'];

  state = {
    currentNeta:
      this.props.currentNeta ||
      neta[Math.round(Math.random() * 100) % neta.length],
    currentNetaIndex: -1,
    currentDot: this.dots[2],
    dotTop: '50%',
    dotLeft: '50%',
    dotFontSize: 28,
  };

  componentDidMount() {
    this.handleLoadingDot();
    setTimeout(() => {
      this.moveLogingToRightBottom();
      this.handleNeta();
    }, 3000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  handleLoadingDot = () => {
    let counter = 3;
    this.timer = window.setInterval(() => {
      this.setState({ currentDot: this.dots[counter % 5] });
      counter++;
    }, 800);
  };

  moveLogingToRightBottom = () => {
    this.setState({ dotTop: '90%', dotLeft: '90%', dotFontSize: 20 });
  };

  handleNeta = () => {
    let { currentNetaIndex, currentNeta } = this.state;
    setTimeout(() => {
      setInterval(() => {
        if (currentNetaIndex < currentNeta.length - 1) {
          this.setState({ currentNetaIndex: ++currentNetaIndex });
        }
      }, 2000);
    }, 500);
  };

  render() {
    const {
      currentDot,
      dotFontSize,
      dotTop,
      dotLeft,
      currentNeta,
      currentNetaIndex,
    } = this.state;
    return (
      <div className="TohoLoading">
        <div className="neta-wrapper">
          <ul>
            {currentNeta.map(item => (
              <li
                key={item}
                style={{
                  transform: `translateY(${-(currentNetaIndex * 56)}px)`,
                }}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div
          className="dot-wrapper"
          style={{
            fontSize: dotFontSize,
            top: dotTop,
            left: dotLeft,
          }}
        >
          少女祈祷中{currentDot}
        </div>
      </div>
    );
  }
}
