import React from 'react';
import './header.css';

export type RightBarProps = { text: string; value: string; visible?: boolean };

export interface HeaderProps {
  title: React.ReactElement | string;
  onClick: (item: RightBarProps, e: React.MouseEvent) => void;
  rightBar: RightBarProps[];
  searchBar?: React.ReactElement | null;
  currentKey: string;
}

const Header = (props: HeaderProps) => {
  const rightBarLength = props.rightBar.filter(item => item.visible !== false).length;

  return (
    <header className="header-wrapper">
      <div>{props.title}</div>
      <div>{props.searchBar}</div>
      <ul className="nav-list" style={{ gridTemplateColumns: `repeat(${rightBarLength}, ${100 / rightBarLength}%)` }}>
        {props.rightBar.map(
          item =>
            item.visible !== false && (
              <li
                className={item.value === props.currentKey ? 'nav-list-item-active' : 'nav-list-item'}
                key={item.value}
                onClick={e => props.onClick(item, e)}
              >
                {item.text}
              </li>
            ),
        )}
      </ul>
    </header>
  );
};

export default Header;
