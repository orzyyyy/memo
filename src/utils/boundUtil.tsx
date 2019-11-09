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

export type MenuItemOption = {
  text: string;
  value: number | string;
};
export type NumberFormItemProps = { value: number; error: boolean; message: string };
export type InputFormItemProps = { value: string; error: boolean; message: string };
export type CommonBoundFormDataProps = {
  // 出库为 0，入库为 1
  type: number;
  // 材料类型
  materialType: NumberFormItemProps;
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
  freight: number;
  freightError: boolean;
  freightMessage: string;
  // 其他费用
  extraCost: number;
  // 备注
  description: string;
  // 圆钢种类
  round: number;
  roundError: boolean;
  roundMessage: string;
  // 卖出类型。零售 / 批量
  sellType: number;
  sellTypeError: boolean;
  sellTypeMessage: string;
};
export type FormOptionsProps = {
  materialType: MenuItemOption[];
  materialId: any[];
  roundType: MenuItemOption[];
  sellType: MenuItemOption[];
};
export type FormControlType = 'input' | 'autoComplete' | 'select' | 'type';
export type CommonBoundProps = {
  onChange: (
    item: MenuItemOption,
    type: FormControlType,
    key?: MaterialInputSpecificationProps | MaterialSelectSpecificationProps,
  ) => void;
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
  | 'description'
  | 'round';
export type MaterialSelectSpecificationProps = 'materialType' | 'roundType' | 'sellType';

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
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    key: MaterialInputSpecificationProps,
  ) => void;
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
  const materialType = parseInt('' + formData.materialType.value);
  const result = materialIds.filter(item => {
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
  });
  return result;
};

const renderSpecification = ({
  handleInputChange,
  formData,
  onSpecificationInputBlur,
  classes,
}: {
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    key: MaterialInputSpecificationProps,
  ) => void;
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
            onChange: handleInputChange,
            onBlur: onSpecificationInputBlur,
            classes,
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
            onChange: handleInputChange,
            onBlur: onSpecificationInputBlur,
            classes,
          })}
          {getInputItem({
            key: 'width',
            error: formData.width.error,
            inputLabel: '截面宽度',
            inputValue: formData.width.value,
            helperText: formData.width.message,
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
  handleSelectChange: (e: React.ChangeEvent<{ value: unknown }>, key: MaterialSelectSpecificationProps) => void;
  handleAutocompleteChange: (_: React.ChangeEvent<{ name?: string | undefined; value: unknown }>, item: any) => void;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    key: MaterialInputSpecificationProps,
  ) => void;
  onSpecificationInputBlur: () => void;
}) => {
  const materialIdOptions = filterMaterialIdOptions(formOptions.materialId, formData);
  const materialType = parseInt('' + formData.materialType.value);

  return (
    <>
      <Grid item xs={6}>
        <FormControl required fullWidth className={classes.formControl} error={formData.materialType.error}>
          <InputLabel shrink={formData.materialType.value !== -1}>类别</InputLabel>
          <Select value={formData.materialType.value} onChange={e => handleSelectChange(e, 'materialType')}>
            {formOptions.materialType.map(({ text, value }) => (
              <MenuItem value={value} key={text + '-' + value}>
                {text}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={6}>
        <FormControl required fullWidth className={classes.formControl} error={formData.sellTypeError}>
          <InputLabel shrink={formData.sellType !== -1}>卖出类型</InputLabel>
          <Select value={formData.sellType} onChange={e => handleSelectChange(e, 'sellType')}>
            {formOptions.sellType.map(({ text, value }) => (
              <MenuItem value={value} key={text + '-' + value}>
                {text}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      {renderSpecification({ handleInputChange, formData, onSpecificationInputBlur, classes })}

      {materialType === 0 && (
        <Grid item xs={6} key="round">
          <FormControl required fullWidth className={classes.formControl} error={formData.roundError}>
            <InputLabel shrink={formData.round !== -1}>圆钢类别</InputLabel>
            <Select value={formData.round} onChange={e => handleSelectChange(e, 'roundType')}>
              {formOptions.roundType.map(({ text, value }) => (
                <MenuItem value={value} key={text + '-' + value}>
                  {text}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      )}

      <FormControl fullWidth error={formData.materialId.error} className={classes.formControl}>
        <Autocomplete
          options={materialIdOptions}
          getOptionLabel={(option: any) => option.text}
          value={formData.materialId.value}
          onChange={handleAutocompleteChange}
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
