import React from 'react';
import { List, Dropdown, Menu } from 'antd';
import { format } from 'date-fns';
import { MainPageProps, MainPageState } from './MainPage';
import { Apartment, FileMarkdown } from '@ant-design/icons';

const MainPageList = ({
  props,
  state,
}: {
  props: MainPageProps;
  state: MainPageState;
}) => {
  const { dataSource, onDelete, onEdit } = props;
  const { siderSelectedKey } = state;
  return (
    <List
      dataSource={
        siderSelectedKey === 'all'
          ? dataSource
          : dataSource.filter(item => item.subType === siderSelectedKey)
      }
      renderItem={(item: any) => (
        <Dropdown
          overlay={() => (
            <Menu>
              <Menu.Item key={`add-${item.id}`} onClick={() => onEdit(item)}>
                修改
              </Menu.Item>
              <Menu.Item
                key={`delete-${item.id}`}
                onClick={() => onDelete && onDelete(item)}
              >
                删除
              </Menu.Item>
            </Menu>
          )}
          trigger={['contextMenu']}
          key={`fragment-${item.id}`}
        >
          <List.Item
            className="list-item"
            onClick={() =>
              props.onListItemClick({
                category: item.category,
                id: item.id,
              })
            }
          >
            {item.category === 'mapping' && (
              <Apartment
                style={{
                  marginRight: 10,
                  fontSize: 16,
                  color: '#108ee9',
                }}
              />
            )}
            {item.category === 'markdown' && (
              <FileMarkdown
                style={{
                  marginRight: 10,
                  fontSize: 16,
                  color: '#87d068',
                }}
              />
            )}
            {item.type + ' - ' + item.subType + ' - ' + item.title}
            <div style={{ float: 'right', marginRight: 8 }}>
              {`${format(new Date(item.createTime), 'yyyy-MM-dd')} / ${format(
                new Date(item.modifyTime),
                'yyyy-MM-dd',
              )}`}
            </div>
          </List.Item>
        </Dropdown>
      )}
    />
  );
};

export default MainPageList;
