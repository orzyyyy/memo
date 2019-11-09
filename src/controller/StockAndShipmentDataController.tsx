import React, { useEffect, useState } from 'react';
import Inbound from '../pages/Inbound';
import Outbound from '../pages/Outbound';
import { AppBar, Toolbar, IconButton, Typography } from '@material-ui/core';
import {
  FormControlType,
  renderMessage,
  MaterialInputSpecificationProps,
  MaterialSelectSpecificationProps,
} from '../utils/boundUtil';
import MenuIcon from '@material-ui/icons/Menu';

const ERROR_MESSAGE = '该项不能为空';
const SELECT_FORM_ITEM_DEFAULT_VALUE = { value: -1, error: false, message: '' };
const INPUT_FORM_ITEM_DEFAULT_VALUE = { value: '', error: false, message: '' };

const StockAndShipmentDataController = () => {
  const [loading, setLoading] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitFailed, setSubmitFailed] = useState(false);
  // 类别菜单项
  const [materialTypeOption, setMaterialTypeOption] = useState([]);
  // 材质菜单项
  const [materialIdOption, setMaterialIdOption] = useState([]);
  // 圆钢类型菜单项
  const [roundTypeOption, setRoundTypeOption] = useState([]);
  // 卖出类型菜单项
  const [sellTypeOption, setSellTypeOption] = useState([]);
  // 出库为 0，入库为 1
  const [type, setType] = useState(0);
  // 类别
  const [materialType, setMaterialType] = useState(SELECT_FORM_ITEM_DEFAULT_VALUE);
  // 材质 id
  const [materialId, setMaterialId] = useState(
    Object.assign({}, SELECT_FORM_ITEM_DEFAULT_VALUE, { value: { text: '', value: -1 } }),
  );
  // 材料单价
  const [materialCost, setMaterialCost] = useState(INPUT_FORM_ITEM_DEFAULT_VALUE);
  // 长宽高重
  const [length, setLength] = useState(INPUT_FORM_ITEM_DEFAULT_VALUE);
  const [width, setWidth] = useState(INPUT_FORM_ITEM_DEFAULT_VALUE);
  const [height, setHeight] = useState(INPUT_FORM_ITEM_DEFAULT_VALUE);
  const [weight, setWeight] = useState(INPUT_FORM_ITEM_DEFAULT_VALUE);
  // 预估重量
  const [predictWeight, setPredictWeight] = useState();
  // 运费
  const [freight, setFreight] = useState(INPUT_FORM_ITEM_DEFAULT_VALUE);
  // 其他费用
  const [extraCost, setExtraCost] = useState();
  // 备注
  const [description, setDescription] = useState('');
  // 数量。出库用
  const [materialQuantity, setMaterialQuantity] = useState(INPUT_FORM_ITEM_DEFAULT_VALUE);
  // 锯费
  const [costFee, setCostFee] = useState(0);
  // 预估总价
  const [predictPrice, setPredictPrice] = useState(0);
  // 圆钢种类
  const [round, setRound] = useState(SELECT_FORM_ITEM_DEFAULT_VALUE);
  // 卖出类型
  const [sellType, setSellType] = useState(SELECT_FORM_ITEM_DEFAULT_VALUE);

  useEffect(() => {
    const fetcher = async (sign: number, callback: (result: any) => void) => {
      const response = await fetch('/toy/get/get-material-type?sign=' + sign);
      const result = await response.json();
      callback(await result);
    };

    fetcher(1, setMaterialTypeOption);
    fetcher(10, setRoundTypeOption);
    fetcher(9, setSellTypeOption);
  }, []);

  const verifySubmitParams = () => {
    let hasError = false;
    // 材质
    if (materialType.value === -1) {
      setMaterialType(Object.assign({}, materialType, { error: true, message: ERROR_MESSAGE }));
      hasError = true;
    }
    // 材料单价
    if (materialCost.value === '') {
      setMaterialCost(Object.assign({}, materialCost, { error: true, message: ERROR_MESSAGE }));
      hasError = true;
    }
    // 长宽高重
    if (length.value === '') {
      setLength(Object.assign({}, length, { error: true, message: ERROR_MESSAGE }));
      hasError = true;
    }
    if (width.value === '' && materialType.value !== -1) {
      setWidth(Object.assign({}, width, { error: true, message: ERROR_MESSAGE }));
      hasError = true;
    }
    if (height.value === '') {
      setHeight(Object.assign({}, height, { error: true, message: ERROR_MESSAGE }));
      hasError = true;
    }
    if (weight.value === '') {
      setHeight(Object.assign({}, weight, { error: true, message: ERROR_MESSAGE }));
      hasError = true;
    }
    if (freight.value !== '') {
      setFreight(Object.assign({}, freight, { error: true, message: ERROR_MESSAGE }));
      hasError = true;
    }
    if (round.value === -1) {
      setRound(Object.assign({}, round, { error: true, message: ERROR_MESSAGE }));
      hasError = true;
    }
    if (sellType.value === -1) {
      setSellType(Object.assign({}, sellType, { error: true, message: ERROR_MESSAGE }));
      hasError = true;
    }
    if (materialId.value.value === -1) {
      setMaterialId(Object.assign({}, materialId, { error: true, message: ERROR_MESSAGE }));
    }
    const params = {
      materialType: materialType.value,
      materialCost: materialCost.value,
      type,
      height: height.value,
      weight: weight.value,
      freight: freight.value,
      description,
      extraCost,
      materialId: materialId.value.value,
      materialQuantity: materialQuantity.value,
      round: round.value,
      sellType: sellType.value,
    };
    return { hasError, params };
  };

  const handleSubmit = async () => {
    const { hasError, params } = verifySubmitParams();
    if (hasError) {
      return;
    }

    setLoading(true);
    const response = await fetch('/toy/good/in', {
      body: JSON.stringify(params),
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
    const result = await response.text();
    result === 'success' ? setSubmitSuccess(true) : setSubmitFailed(true);
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
    const price = predictWeight * parseFloat(materialCost.value) + parseFloat(materialQuantity.value) * costFee;
    setPredictPrice(parseFloat(price.toFixed(1)));
  };

  const handleSpecificationInputBlur = () => {
    const result = calcuteForPredictWeight(
      parseFloat(length.value),
      parseFloat(width.value),
      parseFloat(height.value),
      parseFloat(materialQuantity.value),
      type,
    );
    calcuteForPredictPrice(result);
  };

  const fetchMaterialIdOption = async (type: number | string) => {
    const response = await fetch('/toy/get/get-detail?materialType=' + type);
    const result = await response.json();
    const target: any = [];
    result.map((item: any) => {
      target.push({
        value: item.id,
        text: item['材质'],
        costFee: item['锯费'],
        materialCost: item['单价'],
        length: item['长'],
        width: item['宽'],
      });
    });
    setMaterialIdOption(target);
  };

  const handleChange = (
    item: any = { value: '', text: '' },
    controlType: FormControlType,
    key: MaterialInputSpecificationProps | MaterialSelectSpecificationProps,
  ) => {
    const inputDefaultValue = {
      value: item.value,
      error: item.value === '',
      message: item.value === '' ? ERROR_MESSAGE : '',
    };
    const inputValidation = {
      materialCost: () => {
        setMaterialCost(inputDefaultValue);
      },
      freight: () => {
        setFreight(inputDefaultValue);
      },
      extraCost: () => {
        setExtraCost(item.value);
      },
      description: () => {
        setDescription(item.value);
      },
      length: () => {
        setLength(inputDefaultValue);
      },
      width: () => {
        setWidth(inputDefaultValue);
      },
      height: () => {
        setHeight(inputDefaultValue);
      },
      weight: () => {
        setWeight(inputDefaultValue);
      },
      predictWeight: () => {},
      materialQuantity: () => {
        setMaterialQuantity(inputDefaultValue);
      },
      costFee: () => {},
      predictPrice: () => {},
    };
    const selectValidation = {
      materialType: () => setMaterialType(Object.assign({}, materialType, { value: item.value })),
      roundType: () => setRound(Object.assign({}, round, { value: item.value })),
      sellType: () => setSellType(Object.assign({}, sellType, { value: item.value })),
    };

    switch (controlType) {
      case 'input':
        inputValidation[key as MaterialInputSpecificationProps]();
        break;

      case 'select':
        if (item.value !== -1) {
          fetchMaterialIdOption(item.value);
        }
        selectValidation[key as MaterialSelectSpecificationProps]();
        break;

      case 'autoComplete':
        setCostFee(item ? item.costFee : 0);
        setMaterialCost({ value: item ? item.materialCost : 0, error: false, message: '' });
        setMaterialId(
          Object.assign({
            value: { text: item.text, value: item.value },
            error: !item.value,
            message: !item.value ? ERROR_MESSAGE : '',
          }),
        );
        break;

      default:
        break;
    }
  };

  const hanldeCloseMessage = () => {
    setSubmitFailed(false);
    setSubmitSuccess(false);
    setLoading(false);
    // clean up
    setMaterialType(SELECT_FORM_ITEM_DEFAULT_VALUE);
    setMaterialId(Object.assign({}, SELECT_FORM_ITEM_DEFAULT_VALUE, { value: { text: '', value: -1 } }));
    setMaterialCost(INPUT_FORM_ITEM_DEFAULT_VALUE);
    setLength(INPUT_FORM_ITEM_DEFAULT_VALUE);
    setWidth(INPUT_FORM_ITEM_DEFAULT_VALUE);
    setHeight(INPUT_FORM_ITEM_DEFAULT_VALUE);
    setWeight(INPUT_FORM_ITEM_DEFAULT_VALUE);
    setPredictWeight('');
    setFreight(INPUT_FORM_ITEM_DEFAULT_VALUE);
    setExtraCost('');
    setDescription('');
    setMaterialQuantity(INPUT_FORM_ITEM_DEFAULT_VALUE);
    setCostFee(0);
    setPredictPrice(0);
    setSellType(SELECT_FORM_ITEM_DEFAULT_VALUE);
    setRound(SELECT_FORM_ITEM_DEFAULT_VALUE);
  };

  const commonFormData = {
    materialType,
    materialId,
    materialCost,
    type,
    length,
    width,
    height,
    weight,
    predictWeight,
    freight,
    extraCost,
    description,
    round,
    sellType,
  };
  const commonBoundProps = {
    loading,
    onSubmit: handleSubmit,
    formOptions: {
      materialType: materialTypeOption,
      materialId: materialIdOption,
      roundType: roundTypeOption,
      sellType: sellTypeOption,
    },
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

      {renderMessage({ type: 'success', message: '保存成功', open: submitSuccess, onClose: hanldeCloseMessage })}
      {renderMessage({ type: 'failed', message: '保存失败', open: submitFailed, onClose: hanldeCloseMessage })}

      {type ? (
        <Outbound
          formData={Object.assign({}, commonFormData, {
            materialQuantity,
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
