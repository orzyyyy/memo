import React, { useEffect, useState } from 'react';
import StockAndShipment, { MenuItemOption, FormControlType } from '../pages/StockAndShipment';

const ERROR_MESSAGE = '该项不能为空';

const StockAndShipmentDataController = () => {
  // 材料类型菜单项
  const [materialTypeOption, setMaterialTypeOption] = useState([{ text: '', value: 0 }]);
  // 材料类型 1。具体为圆钢、方钢，数据库字段为 type
  const [type, setType] = useState(0 as string | number);
  // 材料类型 1 的菜单项
  const [typeOption, setTypeOption] = useState([{ text: '', value: 0 }]);
  // 材料类型 2。具体为材质类型，数据库字段为 material_type
  const [materialType, setMaterialType] = useState();
  const [materialTypeError, setMaterialTypeError] = useState(false);
  const [materialTypeMessage, setMaterialTypeMessage] = useState('');
  // 材料单价
  const [materialCost, setMaterialCost] = useState('' as string | number);
  const [materialCostError, setMaterialCostError] = useState(false);
  const [materialCostMessage, setMaterialCostMessage] = useState('');

  useEffect(() => {
    setMaterialTypeOption([{ text: '45#', value: 0 }, { text: '40#', value: 1 }, { text: '螺纹钢', value: 2 }]);
    setTypeOption([{ text: '圆钢', value: 0 }, { text: '方钢', value: 1 }]);
    setType(0);
  }, []);

  const handleSubmit = async () => {
    // 材料类型
    if (materialType === undefined) {
      setMaterialTypeError(true);
      setMaterialTypeMessage(ERROR_MESSAGE);
    }
    // 材料单价
    if (materialCost === '') {
      setMaterialCostError(true);
      setMaterialCostMessage(ERROR_MESSAGE);
    }
    const params = { materialType, materialCost, type };
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

      case 'select':
        setType(item.value);
        break;

      // 材料类型 2
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
        type,
      }}
      formOptions={{ materialType: materialTypeOption, type: typeOption }}
      onChange={handleChange}
    />
  );
};

export default StockAndShipmentDataController;
