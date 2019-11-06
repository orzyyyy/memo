import React from 'react';
import {
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
  InputAdornment,
  Grid,
  Select,
  MenuItem,
  TextField,
  CircularProgress,
  Button,
} from '@material-ui/core';
import clsx from 'clsx';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import { GridSize } from '@material-ui/core/Grid';
import Autocomplete, { RenderInputParams } from '@material-ui/lab/Autocomplete';
import { green } from '@material-ui/core/colors';

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
export type FormOptionsProps = {
  materialType: MenuItemOption[];
  materialId: any[];
};
export type FormControlType = 'input' | 'autoComplete' | 'select' | 'type';
export type CommonBoundProps = {
  onChange: (item: MenuItemOption, type: FormControlType, key?: MaterialSpecificationProps) => void;
  onSubmit: () => void;
  // 长宽高文本框 blur 时的回调
  onSpecificationInputBlur: () => void;
  formOptions: FormOptionsProps;
  loading: boolean;
  success: boolean;
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
    buttonProgress: {
      color: green[500],
      position: 'absolute',
      top: '50%',
      left: '50%',
      marginTop: -12,
      marginLeft: -12,
    },
    buttonSuccess: {
      backgroundColor: green[500],
      '&:hover': {
        backgroundColor: green[700],
      },
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
  shrink = false,
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
  shrink?: boolean;
}) => (
  <Grid item xs={xs} key={key}>
    <FormControl required={required} className={classes.formControl} error={error}>
      <InputLabel shrink={shrink || !!inputValue}>{inputLabel}</InputLabel>
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
export const filterMaterialIdOptions = (materialIds: any[], formData: CommonBoundFormDataProps) => {
  const materialType = parseInt('' + formData.materialType);

  return materialIds.filter(item => {
    // 圆钢
    if (materialType === 0) {
      if (formData.length) {
        return formData.length == item['长'];
      }
      return true;
    } // 方钢
    else if (materialType === 1) {
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
};

const renderSpecification = ({
  handleInputChange,
  formData,
  onSpecificationInputBlur,
  classes,
}: {
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    key: MaterialSpecificationProps,
  ) => void;
  formData: CommonBoundFormDataProps;
  onSpecificationInputBlur: () => void;
  classes: any;
}) => {
  const materialType = parseInt('' + formData.materialType);
  switch (materialType) {
    case 0:
      return getInputItem({
        key: 'length',
        error: formData.lengthError,
        inputLabel: '截面直径',
        inputValue: formData.length,
        helperText: formData.lengthMessage,
        xs: 6,
        onChange: handleInputChange,
        onBlur: onSpecificationInputBlur,
        classes,
      });
    case 1:
      return (
        <>
          {getInputItem({
            key: 'length',
            error: formData.lengthError,
            inputLabel: '截面长度',
            inputValue: formData.length,
            helperText: formData.lengthMessage,
            xs: 6,
            onChange: handleInputChange,
            onBlur: onSpecificationInputBlur,
            classes,
          })}
          {getInputItem({
            key: 'width',
            error: formData.widthError,
            inputLabel: '截面宽度',
            inputValue: formData.width,
            helperText: formData.widthMessage,
            xs: 6,
            onChange: handleInputChange,
            onBlur: onSpecificationInputBlur,
            classes,
          })}
        </>
      );
    default:
      return null;
  }
};

// 确认材质
export const renderPickerForMaterialId = ({
  formOptions,
  formData,
  classes,
  handleSelectChange,
  handleAutocompleteChange,
  handleInputChange,
  onSpecificationInputBlur,
}: {
  formOptions: FormOptionsProps;
  formData: CommonBoundFormDataProps;
  classes: any;
  handleSelectChange: (e: React.ChangeEvent<{ name?: string | undefined; value: number }>) => void;
  handleAutocompleteChange: (_: React.ChangeEvent<{ name?: string | undefined; value: unknown }>, item: any) => void;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    key: MaterialSpecificationProps,
  ) => void;
  onSpecificationInputBlur: () => void;
}) => {
  const materialIdOptions = filterMaterialIdOptions(formOptions.materialId, formData);

  return (
    <>
      <FormControl required fullWidth className={classes.formControl} error={formData.materialTypeError}>
        <InputLabel>类别</InputLabel>
        <Select value={formData.materialType} onChange={handleSelectChange}>
          {formOptions.materialType.map(({ text, value }) => (
            <MenuItem value={value} key={text + '-' + value}>
              {text}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {renderSpecification({ handleInputChange, formData, onSpecificationInputBlur, classes })}

      <FormControl fullWidth error={formData.materialTypeError} className={classes.formControl}>
        <Autocomplete
          options={materialIdOptions}
          getOptionLabel={(option: any) => option['材质']}
          value={formData.materialId}
          onChange={handleAutocompleteChange}
          id="material-id"
          aria-controls="material-id"
          renderInput={(params: RenderInputParams) => (
            <TextField {...params} fullWidth margin="normal" required label="材质" error={formData.materialTypeError} />
          )}
        />
        <FormHelperText>{formData.materialTypeMessage}</FormHelperText>
      </FormControl>
    </>
  );
};

export const getSubmitButton = ({
  classes,
  onSubmit,
  loading,
  success,
}: {
  classes: any;
  onSubmit: () => void;
  loading: boolean;
  success: boolean;
}) => {
  const buttonClassname = clsx({
    [classes.buttonSuccess]: success,
  });
  return (
    <FormControl fullWidth className={classes.formControl}>
      <Button variant="contained" color="primary" className={buttonClassname} disabled={loading} onClick={onSubmit}>
        保存
      </Button>
      {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
    </FormControl>
  );
};
