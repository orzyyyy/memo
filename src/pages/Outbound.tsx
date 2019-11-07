/* eslint-disable react/prop-types */
import React from 'react';
import { FormControl, TextareaAutosize } from '@material-ui/core';
import {
  getInputItem,
  CommonBoundFormDataProps,
  MaterialSpecificationProps,
  CommonBoundProps,
  useStyles,
  renderPickerForMaterialId,
  getSubmitButton,
} from '../utils/boundUtil';

export type OutboundProps = {
  formData: {
    // 数量。出库用
    materialQuantity: number;
    materialQuantityError: boolean;
    materialQuantityMessage: string;
    // 锯费
    costFee: number;
    // 预估总价
    predictPrice: number;
  } & CommonBoundFormDataProps;
} & CommonBoundProps;

const Outbound = ({ onSubmit, formData, formOptions, onChange, onSpecificationInputBlur, loading }: OutboundProps) => {
  const classes = useStyles();

  const handleSelectChange = (e: React.ChangeEvent<{ name?: string | undefined; value: string | number }>) => {
    onChange({ text: '', value: e.target.value }, 'select');
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    key: MaterialSpecificationProps,
  ) => {
    onChange({ text: e.target.value, value: e.target.value }, 'input', key);
  };

  const handleAutocompleteChange = (
    _: React.ChangeEvent<{
      name?: string | undefined;
      value: unknown;
    }>,
    item: any,
  ) => {
    onChange(item, 'autoComplete');
  };

  return (
    <div className={classes.container}>
      {renderPickerForMaterialId({
        formOptions,
        formData,
        classes,
        handleSelectChange,
        handleAutocompleteChange,
        handleInputChange,
        onSpecificationInputBlur,
      })}

      {getInputItem({
        key: 'weight',
        error: formData.weightError,
        inputLabel: '实际重量',
        inputValue: formData.weight,
        helperText: formData.weightMessage,
        xs: 6,
        unit: 'kg',
        onChange: handleInputChange,
        onBlur: onSpecificationInputBlur,
        classes,
      })}

      {getInputItem({
        key: 'height',
        error: formData.heightError,
        inputLabel: '高度',
        inputValue: formData.height,
        helperText: formData.heightMessage,
        xs: 6,
        onChange: handleInputChange,
        onBlur: onSpecificationInputBlur,
        classes,
      })}

      {getInputItem({
        key: 'materialQuantity',
        error: formData.materialQuantityError,
        inputLabel: '数量',
        inputValue: formData.materialQuantity,
        helperText: formData.materialQuantityMessage,
        xs: 6,
        unit: '个',
        onChange: handleInputChange,
        onBlur: onSpecificationInputBlur,
        classes,
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
        onChange: handleInputChange,
        onBlur: onSpecificationInputBlur,
        classes,
      })}

      {getInputItem({
        key: 'predictWeight',
        error: false,
        inputLabel: '预估重量',
        inputValue: formData.predictWeight,
        helperText: '计算公式：体积 x 密度',
        xs: 6,
        unit: 'kg',
        readOnly: true,
        required: false,
        onChange: handleInputChange,
        onBlur: onSpecificationInputBlur,
        classes,
      })}

      {getInputItem({
        key: 'costFee',
        error: false,
        inputLabel: '据费',
        inputValue: formData.costFee,
        helperText: '',
        xs: 6,
        unit: '元/个',
        readOnly: true,
        required: false,
        onChange: handleInputChange,
        onBlur: onSpecificationInputBlur,
        classes,
      })}

      {getInputItem({
        key: 'predictPrice',
        error: false,
        inputLabel: '预估总价',
        inputValue: formData.predictPrice,
        helperText: '',
        xs: 6,
        unit: '元',
        readOnly: true,
        required: false,
        onChange: handleInputChange,
        onBlur: onSpecificationInputBlur,
        classes,
      })}

      <FormControl fullWidth className={classes.formControl}>
        <TextareaAutosize
          placeholder="备注"
          rows={8}
          onChange={e => handleInputChange(e, 'description')}
          value={formData.description}
        />
      </FormControl>

      {getSubmitButton({ classes, onSubmit, loading })}
    </div>
  );
};

export default Outbound;
