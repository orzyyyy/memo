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
  Snackbar,
  SnackbarContent,
  IconButton,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import ErrorIcon from '@material-ui/icons/Error';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import { GridSize } from '@material-ui/core/Grid';
import Autocomplete, { RenderInputParams } from '@material-ui/lab/Autocomplete';
import { green } from '@material-ui/core/colors';
import { FormItemStatus, OnChangeProps } from '../controller/StockAndShipmentDataController';

export type MenuItemOption = {
  text: string;
  value: number | string;
};
export type SelectFormItemProps = { value: number; error: boolean; message: string };
export type InputFormItemProps = { value: string; error: boolean; message: string };
export type CommonBoundFormDataProps = {
  // 出库为 0，入库为 1
  type: number;
  // 类别
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
  // 预估重量
  predictWeight: number;
  // 运费
  freight: InputFormItemProps;
  // 数量。出库用
  materialQuantity: InputFormItemProps;
  // 其他费用
  extraCost: number;
  // 备注
  description: string;
  // 卖出方式。零售 / 批量
  sellType: SelectFormItemProps;
};
export type FormOptionsProps = {
  materialType: MenuItemOption[];
  materialId: any[];
  sellType: MenuItemOption[];
};
export type FormControlType = 'input' | 'autoComplete' | 'select';
export type CommonBoundProps = {
  onChange: (item: OnChangeProps) => void;
  onSubmit: () => void;
  // 长宽高文本框 blur 时的回调
  onSpecificationInputBlur: () => void;
  formOptions: FormOptionsProps;
  loading: boolean;
};
export type MaterialInputSpecificationProps =
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
export type MaterialSelectSpecificationProps = 'materialType' | 'sellType';

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
      position: 'absolute',
      top: '50%',
      left: '50%',
      marginTop: -12,
      marginLeft: -50,
    },
    buttonSuccess: {
      backgroundColor: green[500],
      '&:hover': {
        backgroundColor: green[700],
      },
    },
    success: {
      backgroundColor: green[600],
    },
    failed: {
      backgroundColor: theme.palette.error.dark,
    },
    icon: {
      fontSize: 20,
    },
    iconVariant: {
      opacity: 0.9,
      marginRight: theme.spacing(1),
    },
    message: {
      display: 'flex',
      alignItems: 'center',
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
  stateType,
  fullWidth = false,
}: {
  key: MaterialInputSpecificationProps;
  error: boolean;
  inputLabel: string;
  inputValue: string | number;
  helperText: string;
  xs: GridSize;
  unit?: string;
  readOnly?: boolean;
  required?: boolean;
  onChange: (item: OnChangeProps) => void;
  onBlur: () => void;
  classes: any;
  shrink?: boolean;
  stateType: FormItemStatus;
  fullWidth?: boolean;
}) => (
  <Grid item xs={xs} key={key}>
    <FormControl required={required} fullWidth={fullWidth} className={classes.formControl} error={error}>
      <InputLabel shrink={shrink || !!inputValue}>{inputLabel}</InputLabel>
      <Input
        value={inputValue}
        type="number"
        onChange={e =>
          onChange({ item: { text: e.target.value, value: e.target.value }, controllType: 'input', key, stateType })
        }
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
// 增加卖出方式和圆钢类型的过滤条件
export const filterMaterialIdOptions = (materialIds: any[], formData: CommonBoundFormDataProps) => {
  const materialType = parseInt('' + formData.materialType.value);
  const result = materialIds
    .filter(item => {
      // 圆钢
      if (materialType === 0) {
        if (formData.length.value) {
          return formData.length.value == item.length;
        }
        return true;
      } // 方钢
      else if (materialType === 1) {
        if (formData.length.value && formData.width.value) {
          return formData.length.value == item.length && formData.width.value == item.width;
        } else if (formData.width.value) {
          return formData.width.value == item.width;
        } else if (formData.length.value) {
          return formData.length.value == item.length;
        }
        return true;
      }
      // 管子
      else if (materialType === 2) {
        return false;
      }
      // 冲头
      else if (materialType === 3) {
        return false;
      }
    })
    .filter(item => item.sellType == formData.sellType.value);
  return result;
};

const renderSpecification = ({
  onChange,
  formData,
  onSpecificationInputBlur,
  classes,
}: {
  onChange: (item: OnChangeProps) => void;
  formData: CommonBoundFormDataProps;
  onSpecificationInputBlur: () => void;
  classes: any;
}) => {
  switch (parseInt(formData.materialType.value + '')) {
    case 0:
      return (
        <>
          {getInputItem({
            key: 'length',
            error: formData.length.error,
            inputLabel: '截面直径',
            inputValue: formData.length.value,
            helperText: formData.length.message,
            xs: 6,
            onChange,
            onBlur: onSpecificationInputBlur,
            classes,
            stateType: 'stateful',
          })}
        </>
      );
    case 1:
      return (
        <>
          {getInputItem({
            key: 'length',
            error: formData.length.error,
            inputLabel: '截面长度',
            inputValue: formData.length.value,
            helperText: formData.length.message,
            xs: 6,
            onChange,
            onBlur: onSpecificationInputBlur,
            classes,
            stateType: 'stateful',
          })}
          {getInputItem({
            key: 'width',
            error: formData.width.error,
            inputLabel: '截面宽度',
            inputValue: formData.width.value,
            helperText: formData.width.message,
            xs: 6,
            onChange,
            onBlur: onSpecificationInputBlur,
            classes,
            stateType: 'stateful',
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
  onSpecificationInputBlur,
  onChange,
}: {
  formOptions: FormOptionsProps;
  formData: CommonBoundFormDataProps;
  classes: any;
  onSpecificationInputBlur: () => void;
  onChange: (item: OnChangeProps) => void;
}) => {
  const materialIdOptions = filterMaterialIdOptions(formOptions.materialId, formData);

  return (
    <>
      <FormControl required fullWidth className={classes.formControl} error={formData.materialType.error}>
        <InputLabel shrink={formData.materialType.value !== -1}>类别</InputLabel>
        <Select
          value={formData.materialType.value}
          onChange={e =>
            onChange({
              item: { text: e.target.value, value: e.target.value },
              controllType: 'select',
              key: 'materialType',
              stateType: 'stateful',
            })
          }
        >
          {formOptions.materialType.map(({ text, value }) => (
            <MenuItem value={value} key={text + '-' + value}>
              {text}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl required fullWidth className={classes.formControl} error={formData.sellType.error}>
        <InputLabel shrink={formData.sellType.value !== -1}>卖出方式</InputLabel>
        <Select
          value={formData.sellType.value}
          onChange={e =>
            onChange({
              item: {
                text: e.target.value,
                value: e.target.value,
              },
              controllType: 'select',
              key: 'sellType',
              stateType: 'stateful',
            })
          }
        >
          {formOptions.sellType.map(({ text, value }) => (
            <MenuItem value={value} key={text + '-' + value}>
              {text}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {renderSpecification({ onChange, formData, onSpecificationInputBlur, classes })}

      <FormControl fullWidth error={formData.materialId.error} className={classes.formControl}>
        <Autocomplete
          options={materialIdOptions}
          getOptionLabel={(option: any) => option.text}
          value={formData.materialId.value}
          onChange={(_: any, item: any) =>
            onChange({ item, controllType: 'autoComplete', key: 'materialId', stateType: 'stateful' })
          }
          id="material-id"
          aria-controls="material-id"
          renderInput={(params: RenderInputParams) => (
            <TextField {...params} fullWidth margin="normal" required label="材质" error={formData.materialId.error} />
          )}
        />
        <FormHelperText>{formData.materialId.message}</FormHelperText>
      </FormControl>
    </>
  );
};

export const getSubmitButton = ({
  classes,
  onSubmit,
  loading,
}: {
  classes: any;
  onSubmit: () => void;
  loading: boolean;
}) => {
  return (
    <FormControl fullWidth className={classes.formControl}>
      <Button variant="contained" color="primary" disabled={loading} onClick={onSubmit}>
        保存
      </Button>
      {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
    </FormControl>
  );
};

export const renderMessage = ({
  type,
  message,
  open,
  onClose,
}: {
  type: 'success' | 'failed';
  message: string;
  open: boolean;
  onClose: () => void;
}) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const classes = useStyles();
  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      open={open}
    >
      <SnackbarContent
        className={classes[type]}
        message={
          <span className={classes.message}>
            {type === 'success' ? (
              <CheckCircleIcon className={classes.iconVariant} />
            ) : (
              <ErrorIcon className={classes.iconVariant} />
            )}
            <span>{message}</span>
          </span>
        }
        action={[
          <IconButton key="close" aria-label="close" color="inherit" onClick={onClose}>
            <CloseIcon className={classes.icon} />
          </IconButton>,
        ]}
      />
    </Snackbar>
  );
};
