import React, { useEffect, useState } from 'react';
import Storage, { FormControlType, MaterialSpecificationProps } from '../pages/Storage';

const ERROR_MESSAGE = '该项不能为空';

const StockAndShipmentDataController = () => {
  // 类别菜单项
  const [materialTypeOption, setMaterialTypeOption] = useState([]);
  // 材质菜单项
  const [materialIdOption, setMaterialIdOption] = useState([]);
  // 出库为 0，入库为 1
  const [type, setType] = useState(0);
  // 类别
  const [materialType, setMaterialType] = useState();
  const [materialTypeError, setMaterialTypeError] = useState(false);
  const [materialTypeMessage, setMaterialTypeMessage] = useState('');
  // 材质 id
  const [materialId, setMaterialId] = useState();
  const [materialIdError, setMaterialIdError] = useState(false);
  const [materialIdMessage, setMaterialIdMessage] = useState('');
  // 材料单价
  const [materialCost, setMaterialCost] = useState('' as string | number);
  const [materialCostError, setMaterialCostError] = useState(false);
  const [materialCostMessage, setMaterialCostMessage] = useState('');
  // 长宽高重
  const [length, setLength] = useState();
  const [lengthError, setLengthError] = useState(false);
  const [lengthMessage, setLengthMessage] = useState('');
  const [width, setWidth] = useState();
  const [widthError, setWidthError] = useState(false);
  const [widthMessage, setWidthMessage] = useState('');
  const [height, setHeight] = useState();
  const [heightError, setHeightError] = useState(false);
  const [heightMessage, setHeightMessage] = useState('');
  const [weight, setWeight] = useState();
  const [weightError, setWeightError] = useState(false);
  const [weightMessage, setWeightMessage] = useState('');
  // 预估重量
  const [predictWeight, setPredictWeight] = useState(0);
  // 运费
  const [freight, setFreight] = useState('' as string | number);
  const [freightError, setFreightError] = useState(false);
  const [freightMessage, setFreightMessage] = useState('');
  // 其他费用
  const [extraCost, setExtraCost] = useState('' as string | number);
  // 备注
  const [description, setDescription] = useState('' as string | number);

  useEffect(() => {
    const fetchMaterialType = async () => {
      const response = await fetch('/toy/get/get-material-type?sign=1');
      const result = await response.json();
      setMaterialTypeOption(result);
    };
    fetchMaterialType();
    setType(0);
  }, []);

  const verifySubmitParams = () => {
    let hasError = false;
    // 材料类型
    if (materialType === '') {
      setMaterialTypeError(true);
      setMaterialTypeMessage(ERROR_MESSAGE);
      hasError = true;
    }
    // 材料单价
    if (materialCost === '') {
      setMaterialCostError(true);
      setMaterialCostMessage(ERROR_MESSAGE);
      hasError = true;
    }
    // 长宽高重
    if (!length) {
      setLengthError(true);
      setLengthMessage(ERROR_MESSAGE);
      hasError = true;
    }
    if (!width) {
      setWidthError(true);
      setWidthMessage(ERROR_MESSAGE);
      hasError = true;
    }
    if (!height) {
      setHeightError(true);
      setHeightMessage(ERROR_MESSAGE);
      hasError = true;
    }
    if (!weight) {
      setWeightError(true);
      setWeightMessage(ERROR_MESSAGE);
      hasError = true;
    }
    // 运费
    if (!freight) {
      setFreightError(true);
      setFreightMessage(ERROR_MESSAGE);
      hasError = true;
    }
    const params = {
      materialType,
      materialCost,
      type,
      length,
      width,
      height,
      weight,
      freight,
      description,
      extraCost,
      materialId,
    };
    return { hasError, params };
  };

  const handleSubmit = async () => {
    const { hasError, params } = verifySubmitParams();
    // eslint-disable-next-line no-console
    console.log(params);
    if (hasError) {
      return;
    }
    return params;
  };

  const calcuteForPredictWeight = (length: number, width: number, height: number, type: number | string) => {
    const realLength = length / 2 / 10;
    const realWidth = width / 10;
    const realHeight = height / 10;

    const calcute = (length: number, width: number, height: number) => {
      const DENSITE = 7.874;
      let bottomArea = Math.PI * length * length;
      // 方钢
      if (width) {
        bottomArea = length * width;
      }
      // 圆钢
      return parseFloat(((bottomArea * height * DENSITE) / 1000).toFixed(2));
    };

    // 圆钢
    if (type === 0 && length && height) {
      setPredictWeight(calcute(realLength, realWidth, realHeight));
    } else if (type === 1 && length && width && height) {
      // 方钢
      setPredictWeight(calcute(realLength, realWidth, realHeight));
    }
  };

  const handleSpecificationInputBlur = () => {
    calcuteForPredictWeight(length, width, height, type);
  };

  const fetchMaterialIdOption = async (type: number | string) => {
    const response = await fetch('/toy/get/get-detail?materialType=' + type);
    const result = await response.json();
    setMaterialIdOption(result);
  };

  const handleChange = (
    item: any = { value: '', text: '' },
    controlType: FormControlType,
    key: MaterialSpecificationProps,
  ) => {
    const inputValidation = {
      materialCost: () => {
        setMaterialCost(item.value);
        setMaterialCostError(item.value === '');
        setMaterialCostMessage(item.value === '' ? ERROR_MESSAGE : '');
      },
      freight: () => {
        setFreight(item.value);
        setFreightError(item.value === '');
        setFreightMessage(item.value === '' ? ERROR_MESSAGE : '');
      },
      extraCost: () => {
        setExtraCost(item.value);
      },
      description: () => {
        setDescription(item.value);
      },
      length: () => {
        setLength(item.value);
        setLengthError(!item.value);
        setLengthMessage(!item.value ? ERROR_MESSAGE : '');
      },
      width: () => {
        setWidth(item.value);
        setWidthError(!item.value);
        setWidthMessage(!item.value ? ERROR_MESSAGE : '');
      },
      height: () => {
        setHeight(item.value);
        setHeightError(!item.value);
        setHeightMessage(!item.value ? ERROR_MESSAGE : '');
      },
      weight: () => {
        setWeight(item.value);
        setWeightError(!item.value);
        setWeightMessage(!item.value ? ERROR_MESSAGE : '');
      },
      predictWeight: () => {},
    };

    switch (controlType) {
      case 'input':
        inputValidation[key]();
        break;

      case 'select':
        if (item.value !== '') {
          fetchMaterialIdOption(item.value);
        }
        setMaterialType(item.value);
        setMaterialTypeError(item.value === '');
        setMaterialTypeMessage(item.value === '' ? ERROR_MESSAGE : '');
        break;

      case 'type':
        setType(type === 0 ? 1 : 0);
        break;

      case 'autoComplete':
        if (item === null) {
          setMaterialId('');
          return;
        }
        setMaterialId(item.id);
        setMaterialIdError(item.id === '');
        setMaterialIdMessage(item.id === '' ? ERROR_MESSAGE : '');
        break;

      default:
        break;
    }
  };

  return (
    <Storage
      onSubmit={handleSubmit}
      formData={{
        materialType,
        materialTypeError,
        materialTypeMessage,
        materialId,
        materialIdError,
        materialIdMessage,
        materialCost,
        materialCostError,
        materialCostMessage,
        type,
        length,
        lengthError,
        lengthMessage,
        width,
        widthError,
        widthMessage,
        height,
        heightError,
        heightMessage,
        weight,
        weightError,
        weightMessage,
        predictWeight,
        freight,
        freightError,
        freightMessage,
        extraCost,
        description,
      }}
      formOptions={{ materialType: materialTypeOption, materialId: materialIdOption }}
      onChange={handleChange}
      onSpecificationInputBlur={handleSpecificationInputBlur}
    />
  );
};

export default StockAndShipmentDataController;
