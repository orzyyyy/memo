import React from 'react';
import './sider.css';
import { SiderProps, SiderChildrenProps } from '../../../server/utils/document';

export interface ComponentSiderProps {
  siderSelectedKey: string;
  siderOpenKey: string;
  onClick: ({
    parent,
    event,
    children,
  }: {
    parent: SiderProps;
    event: React.MouseEvent;
    children?: SiderChildrenProps;
  }) => void;
  dataSource: SiderProps[];
}

const Sider = ({ siderSelectedKey, onClick, dataSource, siderOpenKey }: ComponentSiderProps) => {
  return (
    <aside className="sider">
      <ul>
        {dataSource.map((item: SiderProps) => {
          if (!item.children) {
            return (
              <li
                key={item.key}
                className="sider-item"
                style={{ background: siderSelectedKey === item.key ? '#e6f7ff' : '' }}
                onClick={(event: React.MouseEvent) => onClick({ parent: item, event })}
              >
                {item.title}
              </li>
            );
          }
          return (
            <li key={item.key} style={{ paddingLeft: 24 }}>
              {item.title}
              {item.children.map((jtem: SiderChildrenProps) => (
                <ul key={`${item.key}-${jtem.key}`}>
                  <li
                    className="sider-item"
                    style={{ background: siderSelectedKey === jtem.key && siderOpenKey === item.key ? '#e6f7ff' : '' }}
                    onClick={(event: React.MouseEvent) => onClick({ parent: item, children: jtem, event })}
                  >
                    {jtem.value}
                  </li>
                </ul>
              ))}
            </li>
          );
        })}
      </ul>
    </aside>
  );
};

export default Sider;
