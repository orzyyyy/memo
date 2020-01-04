import React from 'react';
import './header.css';

export type RightBarProps = { text: string; value: string; visible?: boolean };

export interface HeaderProps {
  title: React.ReactElement | string;
  onClick: (item: RightBarProps, e: React.MouseEvent) => void;
  rightBar: RightBarProps[];
  searchBar?: React.ReactElement;
  currentKey: string;
}

const Header = (props: HeaderProps) => {
  return (
    <header className="header-wrapper">
      <div>{props.title}</div>
      <div>{props.searchBar}</div>
      <ul
        className="nav-list"
        style={{ gridTemplateColumns: `repeat(${props.rightBar.length}, ${100 / props.rightBar.length}%)` }}
      >
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
