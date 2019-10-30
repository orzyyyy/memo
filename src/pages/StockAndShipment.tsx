import React from 'react';
import { Button, FormControl, InputLabel, Input, FormHelperText, InputAdornment, TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';

export type MenuItemOption = {
  text: string;
  value: string | number;
};
export type FormControlType = 'input' | 'autoComplete';
export interface StockAndShipment {
  onChange: (item: MenuItemOption, type: FormControlType) => void;
  onSubmit: () => void;
  formData: {
    // 材料类型
    materialType: number | string | null;
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
  const handleAutocompleteChange = (
    _: React.ChangeEvent<{
      name?: string | undefined;
      value: unknown;
    }>,
    item: MenuItemOption,
  ) => {
    onChange(item, 'autoComplete');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ text: e.target.value, value: e.target.value }, 'input');
  };

  return (
    <>
      <FormControl fullWidth error={formData.materialTypeError}>
        <Autocomplete
          options={formOptions.materialType}
          getOptionLabel={(option: MenuItemOption) => option.text}
          value={formData.materialType}
          onChange={handleAutocompleteChange}
          renderInput={(params: any) => <TextField {...params} margin="normal" label="材料类型" fullWidth />}
        />
        <FormHelperText>{formData.materialTypeMessage}</FormHelperText>
      </FormControl>

      <FormControl fullWidth error={formData.materialCostError}>
        <InputLabel>单价</InputLabel>
        <Input
          onChange={handleInputChange}
          value={formData.materialCost}
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
