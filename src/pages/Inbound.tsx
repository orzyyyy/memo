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
