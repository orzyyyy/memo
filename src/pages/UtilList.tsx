import React from 'react';
import './css/util-list.css';
import { MappingProps } from '../../server/controller/DocumentController';
import { DocumentCategoryProps } from '../../server/utils/document';

export interface UtilListProps {
  dataSource: MappingProps[];
  onListItemClick: ({ category, id }: { category?: DocumentCategoryProps; id: string; key?: string }) => void;
}

const UtilList = ({ dataSource, onListItemClick }: UtilListProps) => (
  <ul className="util-list">
    {dataSource.map(item => {
      return (
        <li
          key={`list-item-${item.id}`}
          className="list-item"
          onClick={() => onListItemClick({ category: item.category, id: item.id, key: item.key })}
        >
          {item.title}
        </li>
      );
    })}
  </ul>
);

export default UtilList;
