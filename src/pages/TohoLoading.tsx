import React, { useEffect, useState } from 'react';
import './css/toho-loading.css';

export interface TohoLoadingProps {
  currentNeta?: string[];
}

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
  ['人家才子看到美景会说', '落霞与孤鹜齐飞，秋水共长天一色', '而你只会说', '卧槽真鸡儿好看', ''],
  ['机场验票', '"先生，您脸上这道疤是怎么回事？"', '"当年我妈剖腹产……"', ''],
  ['从前有座山', '山上有座庙', '庙里有个老和尚和小和尚', '有一天小和尚对老和尚说', '"爸爸，外面下雪了！"', ''],
  [
    '胡说，哪来的墙',
    '常听人说的什么 google，facebook 啊',
    '因为只是小公司，服务不稳定，才会出现404错误',
    '归根结底这些小企业没有党性，发展不起来',
    '',
  ],
];

let dotTimer: number;
let netaTimer: number;
let netaToggleTimer: number;
const dots = ['.', '..', '...', '....', '.....'];
const defaultNeta = neta[Math.round(Math.random() * 100) % neta.length];

const TohoLoading = (props: TohoLoadingProps) => {
  const currentNeta = props.currentNeta || defaultNeta;
  const [currentNetaIndex, setCurrentNetaIndex] = useState(-1);
  const [currentDot, setCurrentDot] = useState(dots[2]);
  const [dotTop, setDotTop] = useState('50%');
  const [dotLeft, setDotLeft] = useState('50%');
  const [dotFontSize, setDotFontSize] = useState(28);
  const [isDotLoadingCompleted, setDotLoadingStatus] = useState(false);

  useEffect(() => {
    handleLoadingDot();
    netaTimer = window.setTimeout(() => {
      moveLoggerToRightBottom();
      setDotLoadingStatus(true);
    }, 3000);
    return () => {
      clearInterval(dotTimer);
      clearTimeout(netaTimer);
    };
  }, []);

  useEffect(() => {
    if (isDotLoadingCompleted) {
      netaToggleTimer = window.setInterval(() => {
        if (currentNetaIndex < currentNeta.length - 1) {
          const result = currentNetaIndex + 1;
          setCurrentNetaIndex(result);
        }
      }, 2000);
    }
    return () => {
      clearTimeout(netaToggleTimer);
    };
  }, [isDotLoadingCompleted, currentNetaIndex, currentNeta.length]);

  const handleLoadingDot = () => {
    let counter = 3;
    dotTimer = window.setInterval(() => {
      setCurrentDot(dots[counter % 5]);
      counter++;
    }, 800);
  };

  const moveLoggerToRightBottom = () => {
    setDotTop('90%');
    setDotLeft('90%');
    setDotFontSize(20);
  };

  const renderCurrentNeta = () => (
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
  );

  const renderDot = () => (
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
  );

  return (
    <div className="toho-loading">
      {renderCurrentNeta()}
      {renderDot()}
    </div>
  );
};

export default TohoLoading;
