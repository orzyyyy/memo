import React, { useState, useEffect } from 'react';
import { ExHentaiInfoItem } from '../../server/controller/ExhentaiController';
import './css/exhentai-list.css';

export interface DownloadProps {
  url: string;
  name?: string;
}
export interface ExHentaiListProps {
  dataSource?: ExHentaiInfoItem[];
  onDownload: ({ url, name }: DownloadProps) => void;
  wrapperHeight: number;
  onDetail: (url: string) => void;
}

const ExHentaiList = ({ dataSource = [], onDownload, onDetail }: ExHentaiListProps) => {
  const [realImgInfo, setRealImgInfo] = useState([] as (ExHentaiInfoItem & { height: number })[]);

  useEffect(() => {
    const getImgHeight = async () => {
      const result = [];
      for (const item of dataSource) {
        const img = new Image();
        img.src = item.thumbnailUrl;
        const height: number = await new Promise(resolve => {
          img.onload = () => {
            resolve(img.height);
          };
        });
        const targetObj = { height, ...item };
        result.push(targetObj);
      }
      setRealImgInfo(result);
    };

    getImgHeight();
  }, [dataSource]);

  return (
    <ul className="exhentai-list">
      {realImgInfo.map(item => {
        return (
          <li key={item.detailUrl}>
            <img
              alt={item.name}
              src={item.thumbnailUrl}
              style={{ height: item.height }}
              onClick={() => onDetail(item.detailUrl)}
              onContextMenu={() => onDownload({ url: item.detailUrl })}
            />
          </li>
        );
      })}
    </ul>
  );
};

export default ExHentaiList;
