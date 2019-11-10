import React, { useEffect, useReducer } from 'react';
import Inbound from '../pages/Inbound';
import Outbound from '../pages/Outbound';
import { AppBar, Toolbar, IconButton, Typography } from '@material-ui/core';
import {
  FormControlType,
  renderMessage,
  MenuItemOption,
  SelectFormItemProps,
  InputFormItemProps,
} from '../utils/boundUtil';
import MenuIcon from '@material-ui/icons/Menu';
import omit from 'omit.js';

const ERROR_MESSAGE = '该项不能为空';
const SELECT_FORM_ITEM_DEFAULT_VALUE = { value: -1, error: false, message: '' };
const INPUT_FORM_ITEM_DEFAULT_VALUE = { value: '', error: false, message: '' };

export type FormItemStatus = 'stateful' | 'stateless';

// 菜单项
export interface MenuOptionProps {
  // 类别
  materialTypeOption: MenuItemOption[];
  // 材质
  materialIdOption: any[];
  // 圆钢类型
  roundTypeOption: MenuItemOption[];
  // 卖出类型
  sellTypeOption: MenuItemOption[];
}

// 控制页面返回状态的属性
export interface ViewProps {
  loading: boolean;
  submitSuccess: boolean;
  submitFailed: boolean;
}

export interface OnChangeProps {
  item: any;
  controllType: FormControlType;
  key: FormStatelessFields | FormStatefulFields;
  stateType: FormItemStatus;
}

export interface FormStatelessProps {
  // 出库为 0，入库为 1
  type: number;
  // 预估重量
  predictWeight: number;
  // 其他费用
  extraCost: number;
  // 备注
  description: string;
  // 锯费
  costFee: number;
  // 预估总价
  predictPrice: number;
}

export interface FormStatefulProps {
  // 材料类型
  materialType: SelectFormItemProps;
  // 材质
  materialId: { value: { text: string; value: any }; error: boolean; message: string };
  // 材料单价
  materialCost: InputFormItemProps;
  // 长宽高重
  length: InputFormItemProps;
  width: InputFormItemProps;
  height: InputFormItemProps;
  weight: InputFormItemProps;
  // 运费
  freight: InputFormItemProps;
  // 数量。出库用
  materialQuantity: InputFormItemProps;
  // 圆钢种类
  round: SelectFormItemProps;
  // 卖出类型。零售 / 批量
  sellType: SelectFormItemProps;
}

export type FormStatefulFields =
  | 'materialType' // 类别
  | 'materialCost' // 材料单价
  | 'length' // 长宽高重
  | 'width'
  | 'height'
  | 'weight'
  | 'freight' // 运费
  | 'round' // 圆钢类型
  | 'sellType' // 卖出类型
  | 'materialId' // 材质
  | 'materialQuantity'; // 数量。出库用

export type FormStatelessFields =
  | 'type' // 出库为 0，入库为 1
  | 'predictWeight' // 预估重量
  | 'extraCost' // 其他费用
  | 'description' // 备注
  | 'costFee' // 锯费
  | 'predictPrice'; // 预估总价

// 需要管理表单状态的业务属性
const initialStateful: FormStatefulProps = {
  // 类别
  materialType: SELECT_FORM_ITEM_DEFAULT_VALUE,
  // 材质
  materialId: Object.assign({}, SELECT_FORM_ITEM_DEFAULT_VALUE, { value: { text: '', value: -1 } }),
  // 材料单价
  materialCost: INPUT_FORM_ITEM_DEFAULT_VALUE,
  // 长宽高重
  length: INPUT_FORM_ITEM_DEFAULT_VALUE,
  width: INPUT_FORM_ITEM_DEFAULT_VALUE,
  height: INPUT_FORM_ITEM_DEFAULT_VALUE,
  weight: INPUT_FORM_ITEM_DEFAULT_VALUE,
  // 运费
  freight: INPUT_FORM_ITEM_DEFAULT_VALUE,
  // 数量。出库用
  materialQuantity: INPUT_FORM_ITEM_DEFAULT_VALUE,
  // 圆钢种类
  round: SELECT_FORM_ITEM_DEFAULT_VALUE,
  // 卖出类型
  sellType: SELECT_FORM_ITEM_DEFAULT_VALUE,
};

// 不需要表单状态的业务属性
const initialStateless: FormStatelessProps = {
  // 出库为 0，入库为 1
  type: 0,
  // 预估重量
  predictWeight: '' as any,
  // 其他费用
  extraCost: '' as any,
  // 备注
  description: '' as any,
  // 锯费
  costFee: '' as any,
  // 预估总价
  predictPrice: '' as any,
};

const initialViewState: ViewProps = {
  loading: false,
  submitSuccess: false,
  submitFailed: false,
};

// 菜单项
const initialMenuOptionState: MenuOptionProps = {
  // 类别菜单项
  materialTypeOption: [],
  // 材质菜单项
  materialIdOption: [],
  // 圆钢类型菜单项
  roundTypeOption: [],
  // 卖出类型菜单项
  sellTypeOption: [],
};

const statefulReducer = (
  state: FormStatefulProps,
  action: {
    data: any;
    type: FormControlType;
    key: FormStatefulFields;
  },
) => {
  const getReturn = (validStr: string | number) => {
    if (action.data.value === validStr) {
      return { ...state, [action.key]: { value: validStr, error: true, message: ERROR_MESSAGE } };
    }
    const result = {
      ...state,
      [action.key]: {
        value:
          action.type === 'autoComplete' ? { text: action.data.text, value: action.data.value } : action.data.value,
        error: action.data.value === validStr,
        message: action.data.value === validStr ? ERROR_MESSAGE : '',
      },
    };
    return result;
  };

  switch (action.type) {
    case 'input':
      return getReturn('');

    case 'select':
    case 'autoComplete':
      return getReturn(-1);

    default:
      throw new Error(`Unknown type "${action.type}" in statefulReducer.`);
  }
};

const statelessReducer = (
  state: FormStatelessProps,
  action: {
    type: FormStatelessFields;
    data: any;
  },
) => ({ ...state, [action.type]: action.data });

const viewStateReducer = (state: ViewProps, action: { type: 'reset' | 'success' | 'failed' | 'loading' }) => {
  switch (action.type) {
    case 'loading':
      return { loading: true, submitSuccess: false, submitFailed: false };

    case 'reset':
      return { loading: false, submitSuccess: false, submitFailed: false };

    case 'success':
      return { ...state, submitSuccess: true };

    case 'failed':
      return { ...state, submitFailed: true };

    default:
      throw new Error(`Unknown type "${action.type}" in viewStateReducer.`);
  }
};

const menuOptionReducer = (
  state: MenuOptionProps,
  action: {
    type:
      | 'materialTypeOption' // 类别
      | 'roundTypeOption' // 圆钢类型
      | 'sellTypeOption' // 卖出类型
      | 'materialIdOption'; // 材质
    data: any;
  },
) => ({ ...state, [action.type]: action.data });

const StockAndShipmentDataController = () => {
  const [stateful, statefulDispatch] = useReducer(statefulReducer, initialStateful as any);
  const [stateless, statelessDispatch] = useReducer(statelessReducer, initialStateless as any);
  const [viewState, viewStateDispatch] = useReducer(viewStateReducer, initialViewState as any);
  const [menuOptionState, menuOptionDispatch] = useReducer(menuOptionReducer, initialMenuOptionState as any);

  useEffect(() => {
    const fetcher = async (sign: number, callback: (result: any) => void) => {
      const response = await fetch('/toy/get/get-material-type?sign=' + sign);
      const result = await response.json();
      callback(await result);
    };

    fetcher(1, data => menuOptionDispatch({ type: 'materialTypeOption', data }));
    fetcher(10, data => menuOptionDispatch({ type: 'roundTypeOption', data }));
    fetcher(9, data => menuOptionDispatch({ type: 'sellTypeOption', data }));
  }, []);

  const verifySubmitParams = () => {
    const {
      materialType,
      materialCost,
      length,
      width,
      height,
      weight,
      freight,
      round,
      sellType,
      materialId,
      materialQuantity,
    } = stateful;
    statefulDispatch({ type: 'select', key: 'materialType', data: materialType });
    statefulDispatch({ type: 'input', key: 'materialCost', data: materialCost });
    statefulDispatch({ type: 'input', key: 'length', data: length });
    if (width.value === '' && materialType.value !== -1) {
      statefulDispatch({ type: 'input', key: 'width', data: width });
    }
    statefulDispatch({ type: 'input', key: 'height', data: height });
    statefulDispatch({ type: 'input', key: 'weight', data: weight });
    statefulDispatch({ type: 'input', key: 'freight', data: freight });
    statefulDispatch({ type: 'input', key: 'materialQuantity', data: materialQuantity });
    statefulDispatch({ type: 'select', key: 'round', data: round });
    statefulDispatch({ type: 'select', key: 'sellType', data: sellType });
    statefulDispatch({ type: 'autoComplete', key: 'materialId', data: materialId.value });

    const params = {
      materialType: materialType.value,
      materialCost: materialCost.value,
      type: stateless.type,
      height: height.value,
      weight: weight.value,
      freight: freight.value,
      description: stateless.description,
      extraCost: stateless.extraCost,
      materialId: materialId.value.value,
      materialQuantity: materialQuantity.value,
    };

    // todo: 本来应该遍历 stateful，看 error 是否为 true 来判断表单项是否有误
    // 但因为 stateful 此时尚未更新，所以暂时用硬编码来判断
    let hasError = false;
    for (const value of Object.values(omit(params, ['description', 'freight', 'extraCost']))) {
      if (!value || value === -1) {
        hasError = true;
        break;
      }
    }

    return { hasError, params };
  };

  const handleSubmit = async () => {
    const { hasError, params } = verifySubmitParams();
    if (hasError) {
      return;
    }

    viewStateDispatch({ type: 'loading' });
    const response = await fetch('/toy/good/in', {
      body: JSON.stringify(params),
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
    const result = await response.text();
    viewStateDispatch({ type: result === 'success' ? 'success' : 'failed' });
    return params;
  };

  const calcuteForPredictWeight = (length: number, width: number, height: number, quality: number, type: number) => {
    const realLength = length / 2 / 10;
    const realWidth = width / 10;
    const realHeight = height / 10;

    // 入库时数量一定为 undefined，计算会出错，需要单独处理
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

    if ((length && width && height) || (length && height)) {
      statelessDispatch({ type: 'predictWeight', data: result });
    }
    return result;
  };

  const calcuteForPredictPrice = (
    predictWeight: number,
    costFee: number,
    materialCost: number,
    materialQuantity: number,
  ) => {
    const price = predictWeight * materialCost + materialQuantity * costFee;
    statelessDispatch({ type: 'predictPrice', data: parseFloat(price.toFixed(1)) });
  };

  const handleSpecificationInputBlur = () => {
    const { length, width, height, materialQuantity } = stateful;
    const result = calcuteForPredictWeight(
      parseFloat(length.value),
      parseFloat(width.value),
      parseFloat(height.value),
      parseFloat(materialQuantity.value),
      stateless.type,
    );
    calcuteForPredictPrice(
      result,
      stateless.costFee,
      parseFloat(stateful.materialCost.value),
      parseFloat(materialQuantity.value),
    );
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
    menuOptionDispatch({ type: 'materialIdOption', data: target });
  };

  const handleChange = ({ item, controllType, key, stateType }: OnChangeProps) => {
    const handleWithState = (type: FormControlType) => {
      if (stateType === 'stateful') {
        statefulDispatch({
          type,
          key: key as FormStatefulFields,
          data: item,
        });
      } else if (stateType === 'stateless') {
        statelessDispatch({ type: key as FormStatelessFields, data: item.value });
      }
    };

    switch (controllType) {
      case 'input':
        handleWithState(controllType);
        break;

      case 'select':
        if (item.value !== -1 && key === 'materialType') {
          fetchMaterialIdOption(item.value);
        }
        handleWithState(controllType);
        break;

      case 'autoComplete':
        statelessDispatch({ type: 'costFee', data: item ? item.costFee : 0 });
        handleWithState(controllType);
        break;

      default:
        break;
    }
  };

  const hanldeCloseMessage = () => {
    const {
      materialQuantity,
      materialCost,
      length,
      width,
      height,
      weight,
      freight,
      materialType,
      sellType,
      round,
      materialId,
    } = stateful;
    viewStateDispatch({ type: 'reset' });

    statelessDispatch({ type: 'predictWeight', data: 0 });
    statelessDispatch({ type: 'extraCost', data: 0 });
    statelessDispatch({ type: 'description', data: '' });
    statelessDispatch({ type: 'costFee', data: 0 });
    statelessDispatch({ type: 'predictPrice', data: 0 });

    statefulDispatch({ type: 'input', key: 'materialQuantity', data: materialQuantity });
    statefulDispatch({ type: 'input', key: 'materialCost', data: materialCost });
    statefulDispatch({ type: 'input', key: 'length', data: length });
    statefulDispatch({ type: 'input', key: 'width', data: width });
    statefulDispatch({ type: 'input', key: 'height', data: height });
    statefulDispatch({ type: 'input', key: 'weight', data: weight });
    statefulDispatch({ type: 'input', key: 'freight', data: freight });

    statefulDispatch({ type: 'select', key: 'materialType', data: materialType });
    statefulDispatch({ type: 'select', key: 'sellType', data: sellType });
    statefulDispatch({ type: 'select', key: 'round', data: round });
    statefulDispatch({ type: 'autoComplete', key: 'materialId', data: materialId });
  };

  const commonFormData = {
    materialType: stateful.materialType,
    materialId: stateful.materialId,
    materialCost: stateful.materialCost,
    type: stateless.type,
    length: stateful.length,
    width: stateful.width,
    height: stateful.height,
    weight: stateful.weight,
    predictWeight: stateless.predictWeight,
    freight: stateful.freight,
    extraCost: stateless.extraCost,
    description: stateless.description,
    round: stateful.round,
    sellType: stateful.sellType,
    materialQuantity: stateful.materialQuantity,
  };
  const commonBoundProps = {
    loading: viewState.loading,
    onSubmit: handleSubmit,
    formOptions: {
      materialType: menuOptionState.materialTypeOption,
      materialId: menuOptionState.materialIdOption,
      roundType: menuOptionState.roundTypeOption,
      sellType: menuOptionState.sellTypeOption,
    },
    onChange: handleChange,
    onSpecificationInputBlur: handleSpecificationInputBlur,
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={() => statelessDispatch({ type: 'type', data: stateless.type === 0 ? 1 : 0 })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6">{stateless.type ? '出库' : '入库'}</Typography>
        </Toolbar>
      </AppBar>

      {renderMessage({
        type: 'success',
        message: '保存成功',
        open: viewState.submitSuccess,
        onClose: hanldeCloseMessage,
      })}
      {renderMessage({
        type: 'failed',
        message: '保存失败',
        open: viewState.submitFailed,
        onClose: hanldeCloseMessage,
      })}

      {stateless.type ? (
        <Outbound
          formData={Object.assign({}, commonFormData, {
            costFee: stateless.costFee,
            predictPrice: stateless.predictPrice,
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
