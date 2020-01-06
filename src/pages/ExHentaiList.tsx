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

const patch = 15;

const ExHentaiList = ({ dataSource = [], onDownload, onDetail }: ExHentaiListProps) => {
  const [realImgInfo, setRealImgInfo] = useState([] as (ExHentaiInfoItem & { height: number; width: number })[]);

  useEffect(() => {
    const getImgHeight = async (data: ExHentaiInfoItem[]) => {
      const target = [];
      for (const item of data) {
        const img = new Image();
        img.src = item.thumbnailUrl;
        const params: { width: number; height: number } = await new Promise(resolve => {
          img.onload = () => {
            resolve({ width: img.width, height: img.height });
          };
        });
        target.push({ ...params, ...item });
      }
      return target;
    };

    const updatePatchImg = async (data: ExHentaiInfoItem[], result: any[], patch: number) => {
      const target = data.splice(0, patch);
      result = [...result, ...(await getImgHeight(target))];
      setRealImgInfo(result);
      if (data.length) {
        updatePatchImg(data, result, patch);
      }
    };

    updatePatchImg(dataSource, [], patch);
  }, [dataSource]);

  return (
    <ul className="exhentai-list">
      {realImgInfo.map(item => {
        return (
          <li key={item.detailUrl}>
            <img
              alt={item.name}
              src={item.thumbnailUrl}
              style={{ height: item.height, width: item.width }}
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
