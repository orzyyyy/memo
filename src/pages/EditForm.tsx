import React, { useState, useReducer, useEffect } from 'react';
import Dialog from 'rc-dialog';
import 'rc-dialog/assets/index.css';
import { DocumentCategoryProps, SiderProps } from '../../server/utils/document';
import { MappingProps } from '../../server/controller/DocumentController';
import Button from '../component/Button';
import Input from '../component/Input';
import Select from '../component/Select';

export interface FormProps {
  title: string;
  category: DocumentCategoryProps;
  type: string;
  subType: string;
  key?: string;
}
export interface EditFormProps {
  visible: boolean;
  selectData: SiderProps[];
  onSubmit: (form?: FormProps, dataItem?: MappingProps) => void;
  onCancel: () => void;
  loading: boolean;
  dataItem: MappingProps;
  pageInfo: { x: number; y: number };
}
export interface EditFormState {
  currentType: string;
  extraTypeSelectItem: string;
  extraSubTypeSelectItem: string;
}

const formDataReducer = (
  state: FormProps,
  action: {
    data: any;
    key: 'type' | 'subType' | 'category' | 'title' | 'key';
  },
) => {
  return {
    ...state,
    [action.key]: action.data,
  };
};

const initialFormData = {
  title: '',
  type: '',
  subType: '',
  category: '',
  key: '',
};

const EditForm = ({
  visible,
  loading,
  selectData,
  onCancel,
  onSubmit,
  pageInfo,
  dataItem = { id: '', type: '', subType: '', category: 'markdown', title: '' },
}: EditFormProps) => {
  const [currentTypeSelectItem, setCurrentTypeSelectItem] = useState(dataItem.type);
  const [isEditMode, setEditMode] = useState(false);
  const [formData, formDataDispatch] = useReducer(formDataReducer, initialFormData as any);

  useEffect(() => {
    formDataDispatch({ key: 'category', data: dataItem.category });
    formDataDispatch({ key: 'type', data: dataItem.type });
    formDataDispatch({ key: 'subType', data: dataItem.subType });
    formDataDispatch({ key: 'title', data: dataItem.title });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  const reset = () => {
    formDataDispatch({ key: 'title', data: '' });
    formDataDispatch({ key: 'category', data: '' });
    formDataDispatch({ key: 'subType', data: '' });
    formDataDispatch({ key: 'type', data: '' });
  };

  const submit = () => {
    onSubmit(formData, dataItem);
  };

  const handleCancel = () => {
    setCurrentTypeSelectItem('');
    onCancel();
  };

  const setTypeValue = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const type = e.target.value;
    setCurrentTypeSelectItem(type);
    formDataDispatch({ key: 'type', data: e.target.value });
  };

  const renderTitle = () => (
    <>
      <span>标题</span>
      <Input
        style={{ width: '100%' }}
        value={formData.title}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => formDataDispatch({ key: 'title', data: e.target.value })}
      />
    </>
  );

  const renderCategory = (isEditMode: boolean) => (
    <>
      {isEditMode ? (
        <>
          <span>显示类别</span>
          <Input
            style={{ width: '100%' }}
            value={formData.category}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              formDataDispatch({ key: 'category', data: e.target.value })
            }
          />
        </>
      ) : (
        <>
          <span>显示类别</span>
          <Select
            style={{ width: '100%' }}
            value={formData.category}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              formDataDispatch({ key: 'category', data: e.target.value })
            }
          >
            <option value="markdown">markdown</option>
            <option value="mapping">mapping</option>
            <option value="utils">utils</option>
          </Select>
        </>
      )}
    </>
  );

  const renderType = () => (
    <>
      {isEditMode ? (
        <>
          <span>文档类别</span>
          <Input
            style={{ width: '100%' }}
            value={formData.type}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              formDataDispatch({ key: 'type', data: e.target.value })
            }
          />
        </>
      ) : (
        <>
          <span>文档类别</span>
          <Select style={{ width: '100%' }} onChange={setTypeValue} value={formData.type}>
            {selectData.map(item => (
              <option value={item.key} key={`type-${item.key}`}>
                {item.title}
              </option>
            ))}
          </Select>
        </>
      )}
    </>
  );

  const renderSubType = () => (
    <>
      {isEditMode ? (
        <>
          <span>文档子类</span>
          <Input
            style={{ width: '100%' }}
            value={formData.subType}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              formDataDispatch({ key: 'subType', data: e.target.value })
            }
          />
        </>
      ) : (
        <>
          <span>文档子类</span>
          <Select
            style={{ width: '100%' }}
            value={formData.subType}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              formDataDispatch({ key: 'subType', data: e.target.value })
            }
          >
            {selectData
              .filter(item => item.key === (currentTypeSelectItem || dataItem.type))
              .map(({ children = [] }) =>
                children.map(jtem => (
                  <option value={jtem.key} key={jtem.key}>
                    {jtem.value}
                  </option>
                )),
              )}
          </Select>
        </>
      )}
    </>
  );

  const renderConfirmButtonGroup = () => (
    <>
      <Button onClick={() => setEditMode(!isEditMode)}>编辑</Button>
      <div />
      <Button onClick={reset}>清空</Button>
      <Button onClick={submit} disabled={loading}>
        确定
      </Button>
    </>
  );

  const renderKey = () => {
    return (
      <>
        <span>utils key</span>
        <Input
          style={{ width: '100%' }}
          value={formData.key}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => formDataDispatch({ key: 'key', data: e.target.value })}
        />
      </>
    );
  };

  return (
    <Dialog
      visible={visible}
      title="新建文档"
      onClose={handleCancel}
      animation="zoom"
      maskAnimation="fade"
      mousePosition={pageInfo}
      bodyStyle={{ height: 260 }}
      footer={
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 25%)' }}>{renderConfirmButtonGroup()}</div>
      }
    >
      <div
        style={{ display: 'grid', gridTemplateColumns: '15% 85%', gridTemplateRows: 'repeat(4, 25%)', gridRowGap: 16 }}
      >
        {renderTitle()}
        {renderCategory(isEditMode)}
        {formData.category !== 'utils' && renderType()}
        {formData.category !== 'utils' && renderSubType()}
        {formData.category === 'utils' && renderKey()}
      </div>
    </Dialog>
  );
};

export default EditForm;
