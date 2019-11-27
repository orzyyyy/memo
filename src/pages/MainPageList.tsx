import React from 'react';
import { format } from 'date-fns';
import { Apartment, FileMarkdown } from '@ant-design/icons';
import { MappingProps } from '../../server/controller/DocumentController';
import { DocumentCategoryProps } from '../../server/utils/document';

const MainPageList = ({
  onDelete,
  onEdit,
  onHide,
  siderSelectedKey,
  dataSource,
  onListItemClick,
  isLocal,
}: {
  siderSelectedKey: string;
  onDelete?: (dataItem: MappingProps) => void;
  onHide?: (dataItem: MappingProps) => void;
  dataSource: MappingProps[];
  onEdit: (dataItem?: MappingProps, visible?: boolean) => void;
  onListItemClick: ({ category, id }: { category: DocumentCategoryProps; id: string }) => void;
  isLocal: boolean;
}) => {
  const data = siderSelectedKey === 'all' ? dataSource : dataSource.filter(item => item.subType === siderSelectedKey);

  return (
    <ul>
      {data.map(item => {
        const buttonGroup = (
          <span>
            <a
              onClick={(e: React.MouseEvent) => {
                e.stopPropagation();
                onEdit(item, true);
              }}
              style={{ marginLeft: 16 }}
            >
              修改
            </a>
            <a
              onClick={(e: React.MouseEvent) => {
                e.stopPropagation();
                onHide && onHide(item);
              }}
              style={{ marginLeft: 16 }}
            >
              隐藏
            </a>
            <a
              onClick={(e: React.MouseEvent) => {
                e.stopPropagation();
                onDelete && onDelete(item);
              }}
              style={{ marginLeft: 16 }}
            >
              删除
            </a>
          </span>
        );

        return (
          <li
            key={`list-item-${item.id}`}
            className="list-item"
            onClick={() => onListItemClick({ category: item.category, id: item.id })}
          >
            {item.category === 'mapping' && <Apartment style={{ marginRight: 10, fontSize: 16, color: '#108ee9' }} />}
            {item.category === 'markdown' && (
              <FileMarkdown style={{ marginRight: 10, fontSize: 16, color: '#87d068' }} />
            )}
            {item.type + ' - ' + item.subType + ' - ' + item.title}
            {isLocal && buttonGroup}
            <div style={{ float: 'right', marginRight: 8 }}>
              {`${format(new Date(item.createTime || ''), 'yyyy-MM-dd')} / ${format(
                new Date(item.modifyTime || ''),
                'yyyy-MM-dd',
              )}`}
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default MainPageList;
