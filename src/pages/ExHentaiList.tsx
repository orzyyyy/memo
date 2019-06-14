import React from 'react';
import { ExHentaiInfoItem } from '../../server/controller/get';
import { Row, Col, Card, Dropdown, Menu } from 'antd';
import LazyLoad from 'react-lazyload';

export interface ExHentaiListProps {
  dataSource: ExHentaiInfoItem[];
}

const menu = (
  <Menu>
    <Menu.Item key="download">下载</Menu.Item>
  </Menu>
);

const openDetail = (url: string) => {
  window.open(url);
};

export default ({ dataSource }: ExHentaiListProps) => (
  <Row gutter={16} style={{ width: '100%' }}>
    {dataSource.map((item, i) => (
      <Col span={4} key={item.name + i}>
        <LazyLoad height={document.body.clientHeight} once>
          <Dropdown overlay={menu} trigger={['contextMenu']}>
            <Card
              hoverable
              cover={<img alt={item.name} src={item.thumbnailUrl} />}
              style={{ height: 500 }}
              onClick={() => openDetail(item.detailUrl)}
            >
              <Card.Meta title={item.name} />
            </Card>
          </Dropdown>
        </LazyLoad>
      </Col>
    ))}
  </Row>
);
