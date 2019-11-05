/* eslint-disable react/prop-types */
import React from 'react';
import {
  Button,
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
  InputAdornment,
  TextField,
  Select,
  MenuItem,
  Grid,
  TextareaAutosize,
} from '@material-ui/core';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import { Autocomplete } from '@material-ui/lab';
import { GridSize } from '@material-ui/core/Grid';
import { RenderInputParams } from '@material-ui/lab/Autocomplete';

export type MenuItemOption = {
  text: string;
  value: number | string;
};
export type FormControlType = 'input' | 'autoComplete' | 'select' | 'type';
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
export interface InboundProps {
  onChange: (item: MenuItemOption, type: FormControlType, key?: MaterialSpecificationProps) => void;
  onSubmit: () => void;
  // 长宽高文本框 blur 时的回调
  onSpecificationInputBlur: () => void;
  formData: {
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
  formOptions: {
    materialType: MenuItemOption[];
    materialId: any[];
  };
}

const useStyles = makeStyles((theme: Theme) =>
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

const Inbound = ({ onSubmit, formData, formOptions, onChange, onSpecificationInputBlur }: InboundProps) => {
  const classes = useStyles();

  const handleAutocompleteChange = (
    _: React.ChangeEvent<{
      name?: string | undefined;
      value: unknown;
    }>,
    item: any,
  ) => {
    onChange(item, 'autoComplete');
  };

  const handleSelectChange = (e: React.ChangeEvent<{ name?: string | undefined; value: number }>) => {
    onChange({ text: '', value: e.target.value }, 'select');
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    key: MaterialSpecificationProps,
  ) => {
    onChange({ text: e.target.value, value: e.target.value }, 'input', key);
  };

  const getInputItem = ({
    key,
    error,
    inputLabel,
    inputValue,
    helperText,
    xs,
    unit = 'mm',
    readOnly = false,
    required = true,
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
  }) => (
    <Grid item xs={xs} key={key}>
      <FormControl required={required} className={classes.formControl} error={error}>
        <InputLabel>{inputLabel}</InputLabel>
        <Input
          value={inputValue}
          type="number"
          onChange={e => handleInputChange(e, key)}
          onBlur={onSpecificationInputBlur}
          endAdornment={<InputAdornment position="end">{unit}</InputAdornment>}
          readOnly={readOnly}
        />
        <FormHelperText>{helperText}</FormHelperText>
      </FormControl>
    </Grid>
  );

  const renderSpecification = () => {
    switch (formData.materialType) {
      case 0:
        return getInputItem({
          key: 'length',
          error: formData.lengthError,
          inputLabel: '截面直径',
          inputValue: formData.length,
          helperText: formData.lengthMessage,
          xs: 6,
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
            })}
            {getInputItem({
              key: 'width',
              error: formData.widthError,
              inputLabel: '截面宽度',
              inputValue: formData.width,
              helperText: formData.widthMessage,
              xs: 6,
            })}
          </>
        );
      default:
        return null;
    }
  };

  // 当类别未选择时，不显示材质
  // 选择类别后，如果没有输入规格（长、宽）时，则不过滤
  const materialIdOptions = formOptions.materialId.filter(item => {
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

  return (
    <div className={classes.container}>
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
      {renderSpecification()}
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
      {getInputItem({
        key: 'weight',
        error: formData.weightError,
        inputLabel: '实际重量',
        inputValue: formData.weight,
        helperText: formData.weightMessage,
        xs: 6,
        unit: 'kg',
      })}
      {getInputItem({
        key: 'height',
        error: formData.heightError,
        inputLabel: '高度',
        inputValue: formData.height,
        helperText: formData.heightMessage,
        xs: 6,
      })}
      {getInputItem({
        key: 'materialCost',
        error: formData.materialCostError,
        inputLabel: '单价',
        inputValue: formData.materialCost,
        helperText: formData.materialCostMessage,
        xs: 6,
        unit: '元/kg',
      })}
      {getInputItem({
        key: 'freight',
        error: formData.freightError,
        inputLabel: '运费',
        inputValue: formData.freight,
        helperText: formData.freightMessage,
        xs: 6,
        unit: '元',
      })}
      {getInputItem({
        key: 'extraCost',
        error: false,
        inputLabel: '其他费用',
        inputValue: formData.extraCost,
        helperText: '',
        xs: 6,
        unit: '元',
      })}
      {(formData.materialType === 0 || formData.materialType === 1) &&
        getInputItem({
          key: 'predictWeight',
          error: false,
          inputLabel: '预估重量',
          inputValue: formData.predictWeight,
          helperText: '计算公式：体积 x 密度',
          xs: 6,
          unit: 'kg',
          readOnly: true,
          required: false,
        })}
      <FormControl fullWidth className={classes.formControl}>
        <TextareaAutosize
          placeholder="备注"
          rows={8}
          onChange={e => handleInputChange(e, 'description')}
          value={formData.description}
        />
      </FormControl>
      <FormControl fullWidth className={classes.formControl}>
        <Button variant="contained" color="primary" onClick={onSubmit}>
          提交
        </Button>
      </FormControl>
    </div>
  );
};

export default Inbound;
