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
} from '../utils/boundUtil';

export type InboundProps = {
  formData: CommonBoundFormDataProps;
} & CommonBoundProps;

const Inbound = ({ onSubmit, formData, onChange, onSpecificationInputBlur, formOptions, loading }: InboundProps) => {
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
        key: 'height',
        error: formData.height.error,
        inputLabel: '高度',
        inputValue: formData.height.value,
        helperText: formData.height.message,
        xs: 6,
        onChange,
        onBlur: onSpecificationInputBlur,
        classes,
        stateType: 'stateful',
      })}

      {getInputItem({
        key: 'materialCost',
        error: formData.materialCost.error,
        inputLabel: '单价',
        inputValue: formData.materialCost.value,
        helperText: formData.materialCost.message,
        xs: 6,
        unit: '元/kg',
        onChange,
        onBlur: onSpecificationInputBlur,
        classes,
        stateType: 'stateful',
      })}

      {getInputItem({
        key: 'freight',
        error: formData.freight.error,
        inputLabel: '运费',
        inputValue: formData.freight.value,
        helperText: formData.freight.message,
        xs: 6,
        unit: '元',
        onChange,
        onBlur: onSpecificationInputBlur,
        classes,
        stateType: 'stateful',
      })}

      {getInputItem({
        key: 'extraCost',
        error: false,
        inputLabel: '其他费用',
        inputValue: formData.extraCost,
        helperText: '',
        xs: 6,
        unit: '元',
        onChange,
        onBlur: onSpecificationInputBlur,
        classes,
        required: false,
        stateType: 'stateless',
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

export default Inbound;
