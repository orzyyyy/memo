import React, { useState, useEffect } from 'react';
import MappingDetail from '../pages/MappingDetail';
import { format } from 'date-fns';
import { zhCN } from 'date-fns/locale';
import { message } from 'antd';

const MappingDetailDataController = (props: any) => {
  const [dataSource, setDataSource] = useState({});

  const getTargetMapping = async () => {
    const targetId = props.match.params.id;
    const response = await fetch(`assets/mapping/${targetId}.json`);
    const dataSource = await response.json();
    const date = format(new Date(), 'a HH:mm:ss', {
      locale: zhCN,
    });
    message.success(`更新时间：${date}`);
    setDataSource(dataSource);
  };

  const handleOnSave = async (data: any) => {
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
      // location.reload();
      getTargetMapping();
    }
  };

  useEffect(() => {
    getTargetMapping();
  }, []);

  return <MappingDetail dataSource={dataSource} onSave={handleOnSave} />;
};

export default MappingDetailDataController;
