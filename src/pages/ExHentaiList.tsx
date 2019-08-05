import React from 'react';
import { ExHentaiInfoItem } from '../../server/controller/ExhentaiController';
import { Row, Col, Card, Dropdown, Menu } from 'antd';
import LazyLoad from 'react-lazyload';

export interface DownloadProps {
  url: string;
  name?: string;
}
export interface ExHentaiListProps {
  dataSource: ExHentaiInfoItem[] | null;
  onDownload: ({ url, name }: DownloadProps) => void;
  wrapperHeight: number;
}

const openDetail = (url: string) => {
  window.open(url);
};

export default ({
  dataSource,
  onDownload,
  wrapperHeight,
}: ExHentaiListProps) => (
  <Row gutter={16} style={{ width: '100%' }}>
    {dataSource &&
      dataSource.map((item, i) => (
        <Col span={4} key={item.detailUrl + i}>
          <LazyLoad height={wrapperHeight} once>
            <Dropdown
              overlay={
                <Menu>
                  <Menu.Item
                    key="download"
                    onClick={() => {
                      onDownload({ url: item.detailUrl });
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
                style={{ height: wrapperHeight / 2 }}
                onClick={() => openDetail(item.detailUrl)}
              >
                <img alt={item.name} src={item.thumbnailUrl} />
              </Card>
            </Dropdown>
          </LazyLoad>
        </Col>
      ))}
  </Row>
);
