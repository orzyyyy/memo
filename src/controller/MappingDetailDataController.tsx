import React, { useState, useEffect } from 'react';
import MappingDetail from '../pages/MappingDetail';
import { format } from 'date-fns';
import { zhCN } from 'date-fns/locale';
import { message } from 'antd';
import { DataSource } from 'mini-xmind/lib/canvas';

const MappingDetailDataController = (props: any) => {
  const [data, setData] = useState({});

  useEffect(() => {
    getTargetMapping();
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', bindKeyDown);
    return () => window.removeEventListener('keydown', bindKeyDown);
  }, [data]);

  const getTargetMapping = async () => {
    const targetId = props.match.params.id;
    const response = await fetch(`assets/mapping/${targetId}.json`);
    const result = await response.json();
    const date = format(new Date(), 'a HH:mm:ss', {
      locale: zhCN,
    });
    message.success(`更新时间：${date}`);
    setData(result);
  };

  const handleOnSave = async () => {
    const targetId = props.match.params.id;
    const response = await fetch('/document/update', {
      method: 'POST',
      body: JSON.stringify({
        layout: data,
        id: targetId,
        category: 'mapping',
      }),
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
    });
    const result = await response.text();
    if (!result) {
      message.error('error with save');
    } else {
      getTargetMapping();
    }
  };

  function bindKeyDown(e: KeyboardEvent) {
    const { ctrlKey, keyCode } = e;

    // ctrl + s
    if (ctrlKey && keyCode === 83) {
      e.preventDefault();
      handleOnSave();
    } else {
      e.stopPropagation();
    }
  }

  const handleOnChange = (data: DataSource) => {
    setData(data);
  };

  return <MappingDetail dataSource={data} onChange={handleOnChange} />;
};

export default MappingDetailDataController;
