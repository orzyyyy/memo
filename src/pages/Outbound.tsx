/* eslint-disable react/prop-types */
import React from 'react';
import { FormControl, TextareaAutosize } from '@material-ui/core';
import {
  getInputItem,
  CommonBoundFormDataProps,
  CommonBoundProps,
  useStyles,
  renderPickerForMaterialId,
  getSubmitButton,
  InputFormItemProps,
} from '../utils/boundUtil';

export type OutboundProps = {
  formData: {
    // 数量。出库用
    materialQuantity: InputFormItemProps;
    // 锯费
    costFee: number;
    // 预估总价
    predictPrice: number;
    // 单价
    materialCost: any;
  } & CommonBoundFormDataProps;
} & CommonBoundProps;

const Outbound = ({ onSubmit, formData, formOptions, onChange, onSpecificationInputBlur, loading }: OutboundProps) => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      {renderPickerForMaterialId({
        formOptions,
        formData,
        classes,
        onChange,
        onSpecificationInputBlur,
      })}

      {getInputItem({
        key: 'weight',
        error: formData.weight.error,
        inputLabel: '实际重量',
        inputValue: formData.weight.value,
        helperText: formData.weight.message,
        xs: 6,
        unit: 'kg',
        onChange,
        onBlur: onSpecificationInputBlur,
        classes,
        stateType: 'stateful',
      })}

      {getInputItem({
        key: 'materialQuantity',
        error: formData.materialQuantity.error,
        inputLabel: '数量',
        inputValue: formData.materialQuantity.value,
        helperText: formData.materialQuantity.message,
        xs: 6,
        unit: '个',
        onChange,
        onBlur: onSpecificationInputBlur,
        classes,
        stateType: 'stateful',
      })}

      {getInputItem({
        key: 'materialCost',
        error: false,
        inputLabel: '单价',
        inputValue: formData.materialCost,
        helperText: '',
        xs: 6,
        unit: '元/kg',
        readOnly: true,
        required: false,
        onChange,
        onBlur: onSpecificationInputBlur,
        classes,
        stateType: 'stateless',
      })}

      {getInputItem({
        key: 'costFee',
        error: false,
        inputLabel: '锯费',
        inputValue: formData.costFee,
        helperText: '',
        xs: 6,
        unit: '元/个',
        readOnly: true,
        required: false,
        onChange,
        onBlur: onSpecificationInputBlur,
        classes,
        stateType: 'stateless',
      })}

      {getInputItem({
        key: 'predictPrice',
        error: false,
        inputLabel: '预估总价',
        inputValue: formData.predictPrice || '',
        helperText: '',
        xs: 6,
        unit: '元',
        readOnly: true,
        required: false,
        onChange,
        onBlur: onSpecificationInputBlur,
        classes,
        stateType: 'stateless',
      })}

      <FormControl fullWidth className={classes.formControl}>
        <TextareaAutosize
          placeholder="备注"
          rows={8}
          onChange={e =>
            onChange({
              item: { text: e.target.value, value: e.target.value },
              controllType: 'input',
              key: 'description',
              stateType: 'stateless',
            })
          }
          value={formData.description}
        />
      </FormControl>

      {getSubmitButton({ classes, onSubmit, loading })}
    </div>
  );
};

export default Outbound;
