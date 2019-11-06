import React, { useEffect, useState } from 'react';
import Inbound from '../pages/Inbound';
import Outbound from '../pages/Outbound';
import { AppBar, Toolbar, IconButton, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { FormControlType, MaterialSpecificationProps } from '../utils/boundUtil';

const ERROR_MESSAGE = '该项不能为空';

const StockAndShipmentDataController = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
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
  const [materialCost, setMaterialCost] = useState();
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
  const [predictWeight, setPredictWeight] = useState();
  // 运费
  const [freight, setFreight] = useState();
  const [freightError, setFreightError] = useState(false);
  const [freightMessage, setFreightMessage] = useState('');
  // 其他费用
  const [extraCost, setExtraCost] = useState();
  // 备注
  const [description, setDescription] = useState('');
  // 数量。出库用
  const [materialQuantity, setMaterialQuantity] = useState();
  const [materialQuantityError, setMaterialQuantityError] = useState(false);
  const [materialQuantityMessage, setMaterialQuantityMessage] = useState('');
  // 锯费
  const [costFee, setCostFee] = useState(0);
  // 预估总价
  const [predictPrice, setPredictPrice] = useState(0);

  useEffect(() => {
    const fetchMaterialType = async () => {
      const response = await fetch('/toy/get/get-material-type?sign=1');
      const result = await response.json();
      setMaterialTypeOption(result);
    };
    fetchMaterialType();
  }, []);

  const verifySubmitParams = () => {
    let hasError = false;
    // 材质
    if (!materialType) {
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
    if (!width && materialType !== '0') {
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
      materialQuantity,
    };
    return { hasError, params };
  };

  const handleSubmit = async () => {
    setLoading(true);
    const { hasError, params } = verifySubmitParams();
    if (hasError) {
      return;
    }
    const response = await fetch('/toy/good/in', {
      body: JSON.stringify(params),
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
    const result = await response.text();
    setLoading(false);
    setSuccess(result === 'success');
    setTimeout(() => {
      setSuccess(false);
    }, 2000);
    return params;
  };

  const calcuteForPredictWeight = (length: number, width: number, height: number, quality: number, type: number) => {
    const realLength = length / 2 / 10;
    const realWidth = width / 10;
    const realHeight = height / 10;

    // 入库时数量一定为 undefined，计算会出错，需要处理
    if (type === 0 && !quality) {
      quality = 1;
    }

    const calcute = (length: number, width: number, height: number) => {
      const DENSITE = 7.874;
      let bottomArea = Math.PI * length * length;
      // 方钢
      if (width) {
        bottomArea = length * width;
      }
      // 圆钢
      return parseFloat((((bottomArea * height * DENSITE) / 1000) * quality).toFixed(2));
    };

    const result = calcute(realLength, realWidth, realHeight);

    // 圆钢
    if (length && height) {
      setPredictWeight(result);
    } else if (length && width && height) {
      // 方钢
      setPredictWeight(result);
    }
    return result;
  };

  const calcuteForPredictPrice = (predictWeight: number) => {
    const price = predictWeight * materialCost + materialQuantity * costFee;
    setPredictPrice(parseFloat(price.toFixed(1)));
  };

  const handleSpecificationInputBlur = () => {
    const result = calcuteForPredictWeight(length, width, height, materialQuantity, type);
    calcuteForPredictPrice(result);
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
      materialQuantity: () => {
        setMaterialQuantity(item.value);
        setMaterialQuantityError(!item.value);
        setMaterialQuantityMessage(!item.value ? ERROR_MESSAGE : '');
      },
      costFee: () => {},
      predictPrice: () => {},
    };

    switch (controlType) {
      case 'input':
        inputValidation[key]();
        break;

      case 'select':
        if (item.value) {
          fetchMaterialIdOption(item.value);
        }
        setMaterialType(item.value);
        break;

      case 'autoComplete':
        if (item === null) {
          setMaterialId('');
          setCostFee(0);
          setMaterialCost(0);
          return;
        }
        setCostFee(item['锯费']);
        setMaterialCost(item['单价']);
        setMaterialId(item.id);
        setMaterialIdError(item.id === '');
        setMaterialIdMessage(item.id === '' ? ERROR_MESSAGE : '');
        break;

      default:
        break;
    }
  };

  const commonFormData = {
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
  };
  const commonBoundProps = {
    loading,
    success,
    onSubmit: handleSubmit,
    formOptions: { materialType: materialTypeOption, materialId: materialIdOption },
    onChange: handleChange,
    onSpecificationInputBlur: handleSpecificationInputBlur,
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={() => setType(type === 0 ? 1 : 0)}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6">{type ? '出库' : '入库'}</Typography>
        </Toolbar>
      </AppBar>
      {type ? (
        <Outbound
          formData={Object.assign({}, commonFormData, {
            materialQuantity,
            materialQuantityError,
            materialQuantityMessage,
            costFee,
            predictPrice,
          })}
          {...commonBoundProps}
        />
      ) : (
        <Inbound formData={commonFormData} {...commonBoundProps} />
      )}
    </>
  );
};

export default StockAndShipmentDataController;
