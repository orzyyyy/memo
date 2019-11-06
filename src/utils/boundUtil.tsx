import React from 'react';
import { FormControl, InputLabel, Input, FormHelperText, InputAdornment, Grid } from '@material-ui/core';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import { GridSize } from '@material-ui/core/Grid';

export type MenuItemOption = {
  text: string;
  value: number | string;
};
export type CommonBoundFormDataProps = {
  // 出库为 0，入库为 1
  type: number;
  // 材料类型
  materialType: number;
  materialTypeError: boolean;
  materialTypeMessage: string;
  // 材质
  materialId: number;
  materialIdError: boolean;
  materialIdMessage: string;
  // 材料单价
  materialCost: number;
  materialCostError: boolean;
  materialCostMessage: string;
  // 长宽高重
  length: number;
  lengthError: boolean;
  lengthMessage: string;
  width: number;
  widthError: boolean;
  widthMessage: string;
  height: number;
  heightError: boolean;
  heightMessage: string;
  weight: number;
  weightError: boolean;
  weightMessage: string;
  // 预估重量
  predictWeight: number;
  // 运费
  freight: number;
  freightError: boolean;
  freightMessage: string;
  // 其他费用
  extraCost: number;
  // 备注
  description: string;
};
export type FormControlType = 'input' | 'autoComplete' | 'select' | 'type';
export type CommonBoundProps = {
  onChange: (item: MenuItemOption, type: FormControlType, key?: MaterialSpecificationProps) => void;
  onSubmit: () => void;
  // 长宽高文本框 blur 时的回调
  onSpecificationInputBlur: () => void;
  formOptions: {
    materialType: MenuItemOption[];
    materialId: any[];
  };
};
export type MaterialSpecificationProps =
  | 'length' // 实际长度
  | 'width'
  | 'height'
  | 'weight'
  | 'materialCost' // 单价
  | 'freight' // 运费
  | 'extraCost'
  | 'predictWeight' // 预估重量
  | 'materialQuantity' // 数量
  | 'costFee' // 锯费
  | 'predictPrice' // 预估总价
  | 'description';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    formControl: {
      margin: theme.spacing(1),
    },
    title: {
      flexGrow: 1,
    },
  }),
);

export const getInputItem = ({
  key,
  error,
  inputLabel,
  inputValue,
  helperText,
  xs,
  unit = 'mm',
  readOnly = false,
  required = true,
  onChange,
  onBlur,
  classes,
}: {
  key: MaterialSpecificationProps;
  error: boolean;
  inputLabel: string;
  inputValue: string | number;
  helperText: string;
  xs: GridSize;
  unit?: string;
  readOnly?: boolean;
  required?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, key: MaterialSpecificationProps) => void;
  onBlur: () => void;
  classes: any;
}) => (
  <Grid item xs={xs} key={key}>
    <FormControl required={required} className={classes.formControl} error={error}>
      <InputLabel>{inputLabel}</InputLabel>
      <Input
        value={inputValue}
        type="number"
        onChange={e => onChange(e, key)}
        onBlur={onBlur}
        endAdornment={<InputAdornment position="end">{unit}</InputAdornment>}
        readOnly={readOnly}
      />
      <FormHelperText>{helperText}</FormHelperText>
    </FormControl>
  </Grid>
);

// 当类别未选择时，不显示材质
// 选择类别后，如果没有输入规格（长、宽）时，则不过滤
export const filterMaterialIdOptions = (materialIds: any[], formData: CommonBoundFormDataProps) =>
  materialIds.filter(item => {
    // 圆钢
    if (formData.materialType === 0) {
      if (formData.length) {
        return formData.length == item['长'];
      }
      return true;
    } // 方钢
    else if (formData.materialType === 1) {
      if (formData.length && formData.width) {
        return formData.length == item['长'] && formData.width == item['宽'];
      } else if (formData.width) {
        return formData.width == item['宽'];
      } else if (formData.length) {
        return formData.length == item['长'];
      }
      return true;
    }
  });

// 确认材质
export const renderPickerForMaterialId = () => {};
