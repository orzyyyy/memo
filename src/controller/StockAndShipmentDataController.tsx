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
const NUMBER_FORM_ITEM_DEFAULT_VALUE = { value: -1, error: false, message: '' };

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
  const [materialType, setMaterialType] = useState(NUMBER_FORM_ITEM_DEFAULT_VALUE);
  // 材质 id
  const [materialId, setMaterialId] = useState(
    Object.assign({}, NUMBER_FORM_ITEM_DEFAULT_VALUE, { value: { text: '', value: -1 } }),
  );
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
  // 圆钢种类
  const [round, setRound] = useState(-1);
  const [roundError, setRoundError] = useState(false);
  const [roundMessage, setRoundMessage] = useState('');
  // 卖出类型
  const [sellType, setSellType] = useState(-1);
  const [sellTypeError, setSellTypeError] = useState(false);
  const [sellTypeMessage, setSellTypeMessage] = useState('');

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
    if (!materialCost) {
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
    if (!width && materialType.value !== -1) {
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
    if (!freight) {
      setFreightError(true);
      setFreightMessage(ERROR_MESSAGE);
      hasError = true;
    }
    if (round === -1) {
      setRoundError(true);
      setRoundMessage(ERROR_MESSAGE);
      hasError = true;
    }
    if (sellType === -1) {
      setSellTypeError(true);
      setSellTypeMessage(ERROR_MESSAGE);
      hasError = true;
    }
    if (materialId.value.value === -1) {
      setMaterialId(Object.assign({}, materialId, { error: true, message: ERROR_MESSAGE }));
    }
    const params = {
      materialType: materialType.value,
      materialCost,
      type,
      length,
      width,
      height,
      weight,
      freight,
      description,
      extraCost,
      materialId: materialId.value.value,
      materialQuantity,
      round,
      sellType,
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
    const target: any = [];
    result.map((item: any) => {
      target.push({ value: item.id, text: item['材质'], costFee: item['锯费'], materialCost: item['单价'] });
    });
    setMaterialIdOption(target);
  };

  const handleChange = (
    item: any = { value: '', text: '' },
    controlType: FormControlType,
    key: MaterialInputSpecificationProps | MaterialSelectSpecificationProps,
  ) => {
    const inputValidation = {
      materialCost: () => {
        setMaterialCost(item.value);
        setMaterialCostError(!item.value);
        setMaterialCostMessage(!item.value ? ERROR_MESSAGE : '');
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
      round: () => {
        setRound(item.value);
        setRoundError(item.value === -1);
        setRoundMessage(item.value === -1 ? ERROR_MESSAGE : '');
      },
    };
    const selectValidation = {
      materialType: () => setMaterialType(Object.assign({}, materialType, { value: item.value })),
      roundType: () => {
        setRound(item.value);
      },
      sellType: () => {
        setSellType(item.value);
      },
    };

    switch (controlType) {
      case 'input':
        inputValidation[key as MaterialInputSpecificationProps]();
        break;

      case 'select':
        if (item.value) {
          fetchMaterialIdOption(item.value);
        }
        selectValidation[key as MaterialSelectSpecificationProps]();
        break;

      case 'autoComplete':
        setCostFee(item ? item.costFee : 0);
        setMaterialCost(item ? item.materialCost : 0);
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
    setMaterialType(NUMBER_FORM_ITEM_DEFAULT_VALUE);
    setMaterialId(Object.assign({}, NUMBER_FORM_ITEM_DEFAULT_VALUE, { value: { text: '', value: -1 } }));
    setMaterialCost('');
    setLength('');
    setWidth('');
    setHeight('');
    setWeight('');
    setPredictWeight('');
    setFreight('');
    setExtraCost('');
    setDescription('');
    setMaterialQuantity('');
    setCostFee(0);
    setPredictPrice(0);
  };

  const commonFormData = {
    materialType,
    materialId,
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
    round,
    roundError,
    roundMessage,
    sellType,
    sellTypeError,
    sellTypeMessage,
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
