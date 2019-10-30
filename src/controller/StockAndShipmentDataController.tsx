import React, { useEffect, useState } from 'react';
import StockAndShipment, { MenuItemOption, FormControlType } from '../pages/StockAndShipment';

const ERROR_MESSAGE = '该项不能为空';

const StockAndShipmentDataController = () => {
  // 材料类型菜单项
  const [materialTypeOption, setMaterialTypeOption] = useState([{ text: '', value: 0 }]);
  // 材料类型
  const [materialType, setMaterialType] = useState();
  const [materialTypeError, setMaterialTypeError] = useState(false);
  const [materialTypeMessage, setMaterialTypeMessage] = useState('');
  // 材料单价
  const [materialCost, setMaterialCost] = useState('' as string | number);
  const [materialCostError, setMaterialCostError] = useState(false);
  const [materialCostMessage, setMaterialCostMessage] = useState('');

  useEffect(() => {
    setMaterialTypeOption([{ text: '45#', value: 0 }, { text: '40#', value: 1 }, { text: '螺纹钢', value: 2 }]);
  }, []);

  const handleSubmit = async () => {
    // 材料类型
    if (!materialType) {
      setMaterialTypeError(true);
      setMaterialTypeMessage(ERROR_MESSAGE);
    }
    // 材料单价
    if (materialCost === '') {
      setMaterialCostError(true);
      setMaterialCostMessage(ERROR_MESSAGE);
    }
    const params = { materialType, materialCost };
    // eslint-disable-next-line no-console
    console.log(params);
  };

  const handleChange = (item: MenuItemOption, type: FormControlType) => {
    if (!item) {
      item = { value: '', text: '' };
    }

    switch (type) {
      // 材料单价
      case 'input':
        setMaterialCost(item.value);
        setMaterialCostError(item.value === '');
        setMaterialCostMessage(item.value === '' ? ERROR_MESSAGE : '');
        break;

      // 材料类型
      case 'autoComplete':
        setMaterialType(item.value);
        setMaterialTypeError(item.value === '');
        setMaterialTypeMessage(item.value === '' ? ERROR_MESSAGE : '');
        break;

      default:
        break;
    }
  };

  return (
    <StockAndShipment
      onSubmit={handleSubmit}
      formData={{
        materialType,
        materialTypeError,
        materialTypeMessage,
        materialCost,
        materialCostError,
        materialCostMessage,
      }}
      formOptions={{ materialType: materialTypeOption }}
      onChange={handleChange}
    />
  );
};

export default StockAndShipmentDataController;
