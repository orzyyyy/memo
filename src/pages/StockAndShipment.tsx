import React from 'react';
import {
  Button,
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
  Select,
  MenuItem,
  InputAdornment,
} from '@material-ui/core';

export type MenuItemOption = {
  text: string;
  value: string | number;
};
export type FormControlType = 'input' | 'select';
export interface StockAndShipment {
  onChange: (item: MenuItemOption, type: FormControlType) => void;
  onSubmit: () => void;
  formData: {
    // 材料类型
    materialType: number | string;
    materialTypeError: boolean;
    materialTypeMessage: string;
    // 材料单价
    materialCost: number | string;
    materialCostError: boolean;
    materialCostMessage: string;
  };
  formOptions: {
    materialType: MenuItemOption[];
  };
}

const StockAndShipment = ({ onSubmit, formData, formOptions, onChange }: StockAndShipment) => {
  const handleSelectChange = (
    _: React.ChangeEvent<{
      name?: string | undefined;
      value: unknown;
    }>,
    child: React.ReactElement,
  ) => {
    const { children, value } = child.props;
    onChange(
      {
        text: children,
        value,
      },
      'select',
    );
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(
      {
        text: e.target.value,
        value: e.target.value,
      },
      'input',
    );
  };

  return (
    <>
      <FormControl fullWidth error={formData.materialTypeError}>
        <InputLabel>材料类型</InputLabel>
        <Select value={formData.materialType} onChange={handleSelectChange}>
          <MenuItem value="">无</MenuItem>
          {formOptions.materialType.map(({ text, value }) => (
            <MenuItem value={value} key={text + '-' + value}>
              {text}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText>{formData.materialTypeMessage}</FormHelperText>
      </FormControl>

      <FormControl fullWidth error={formData.materialCostError}>
        <InputLabel>单价</InputLabel>
        <Input
          onChange={handleInputChange}
          value={formData.materialCost}
          startAdornment={<InputAdornment position="start">￥</InputAdornment>}
          endAdornment={<InputAdornment position="end">元/KG</InputAdornment>}
        />
        <FormHelperText>{formData.materialCostMessage}</FormHelperText>
      </FormControl>

      <FormControl fullWidth>
        <Button variant="contained" color="primary" onClick={onSubmit}>
          提交
        </Button>
      </FormControl>
    </>
  );
};

export default StockAndShipment;
