import React from 'react';
import { format } from 'date-fns';
import { MappingProps } from '../../server/controller/DocumentController';
import { DocumentCategoryProps } from '../../server/utils/document';
import './css/main-page-list.css';

const MainPageList = ({
  onDelete,
  onEdit,
  onHide,
  dataSource,
  onListItemClick,
  isLocal,
}: {
  siderSelectedKey: string;
  onDelete?: (dataItem: MappingProps) => void;
  onHide?: (dataItem: MappingProps) => void;
  dataSource: MappingProps[];
  onEdit: (dataItem?: MappingProps, visible?: boolean, pageInfo?: { x: number; y: number }) => void;
  onListItemClick: ({ category, id }: { category?: DocumentCategoryProps; id: string }) => void;
  isLocal: boolean;
  siderOpenKey: string;
}) => {
  return (
    <ul className="main-page-list">
      {dataSource.map(item => {
        const buttonGroup = (
          <div className="f-r">
            <a
              onClick={(e: React.MouseEvent) => {
                e.stopPropagation();
                onEdit(item, true, { x: e.pageX, y: e.pageY });
              }}
              style={{ marginRight: 16 }}
            >
              修改
            </a>
            <a
              onClick={(e: React.MouseEvent) => {
                e.stopPropagation();
                onHide && onHide(item);
              }}
              style={{ marginRight: 16 }}
            >
              隐藏
            </a>
            <a
              onClick={(e: React.MouseEvent) => {
                e.stopPropagation();
                onDelete && onDelete(item);
              }}
              style={{ marginRight: 16 }}
            >
              删除
            </a>
          </div>
        );

        return (
          <li
            key={`list-item-${item.id}`}
            className="list-item"
            onClick={() => onListItemClick({ category: item.category, id: item.id })}
          >
            {item.category === 'mapping' && <div style={{ background: '#108ee9' }} className="icon-apartment" />}
            {item.category === 'markdown' && <div style={{ background: '#87d068' }} className="icon-file-markdown" />}
            {item.type + ' - ' + item.subType + ' - ' + item.title}
            <div style={{ float: 'right', marginRight: 8 }}>
              {`${format(new Date(item.createTime || ''), 'yyyy-MM-dd')} / ${format(
                new Date(item.modifyTime || ''),
                'yyyy-MM-dd',
              )}`}
            </div>
            {isLocal && buttonGroup}
          </li>
        );
      })}
    </ul>
  );
};

export default MainPageList;
