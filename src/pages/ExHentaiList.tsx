import React from 'react';
import { ExHentaiInfoItem } from '../../server/controller/ExhentaiController';
import { Row, Col, Card, Dropdown, Menu } from 'antd';
import LazyLoad from 'react-lazyload';

export interface DownloadProps {
  url: string;
  name: string;
}
export interface ExHentaiListProps {
  dataSource: ExHentaiInfoItem[] | null;
  onDownload: ({ url, name }: DownloadProps) => void;
}

const openDetail = (url: string) => {
  window.open(url);
};

export default ({ dataSource, onDownload }: ExHentaiListProps) => (
  <Row gutter={16} style={{ width: '100%' }}>
    {dataSource &&
      dataSource.map((item, i) => (
        <Col span={4} key={item.name + i}>
          <LazyLoad height={document.body.clientHeight} once>
            <Dropdown
              overlay={
                <Menu>
                  <Menu.Item
                    key="download"
                    onClick={() => {
                      onDownload({
                        url: item.detailUrl,
                        name: item.name,
                      });
                    }}
                  >
                    download
                  </Menu.Item>
                </Menu>
              }
              trigger={['contextMenu']}
            >
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
