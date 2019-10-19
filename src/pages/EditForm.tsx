/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Form, Input, Modal, Select, Button, Row, Col } from 'antd';
import { SiderProps } from '../controller/MainPageDataController';
import { SelectValue } from 'antd/lib/select';
import { DocumentCategoryProps } from '../../server/utils/document';
const { Option } = Select;

export interface FormProps {
  title: string;
  category: DocumentCategoryProps;
  type: string;
  subType: string;
}
export interface EditFormProps {
  visible: boolean;
  selectData: SiderProps[];
  onSubmit: (form?: FormProps, dataItem?: any) => void;
  onCancel: () => void;
  loading: boolean;
  dataItem: any;
}
export interface EditFormState {
  currentType: SelectValue;
  extraTypeSelectItem: string;
  extraSubTypeSelectItem: string;
}

const formItemLayout = {
  labelCol: {
    xs: { span: 4 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 },
  },
};

let isInit = true;

const renderTitle = () => (
  <Form.Item
    label="标题"
    name="title"
    required
    rules={[
      {
        required: true,
        message: '标题不能为空',
      },
    ]}
  >
    <Input />
  </Form.Item>
);

const renderCategory = (isEditMode: boolean) => (
  <Form.Item
    label="显示类别"
    name="category"
    required
    rules={[
      {
        required: true,
        message: '显示类别不能为空',
      },
    ]}
  >
    {isEditMode ? (
      <Input />
    ) : (
      <Select>
        <Option value="markdown">markdown</Option>
        <Option value="mapping">mapping</Option>
      </Select>
    )}
  </Form.Item>
);

const EditForm = ({
  visible,
  loading,
  selectData,
  onCancel,
  onSubmit,
  dataItem = { type: '', subType: '', category: '', title: '' },
}: EditFormProps) => {
  const [form] = Form.useForm();
  const [currentTypeSelectItem, setCurrentTypeSelectItem] = useState(dataItem.type);
  const [isEditMode, setEditMode] = useState(false);

  const onFinish = ({ type, subType, title, category }: FormProps) => {
    onSubmit({ title, category, type, subType }, dataItem);
  };

  const onFinishFailed = ({ errorFields }: any) => {
    form.scrollToField(errorFields[0].name);
    onSubmit();
  };

  const handleCancel = () => {
    isInit = true;
    setCurrentTypeSelectItem(null);
    onCancel();
  };

  const setTypeValue = (type: any) => {
    form.setFieldsValue({ type });
    setCurrentTypeSelectItem(type);
  };

  const renderType = () => (
    <Form.Item
      label="文档类别"
      name="type"
      required
      rules={[
        {
          required: true,
          message: '文档类别不能为空',
        },
      ]}
    >
      {isEditMode ? (
        <Input />
      ) : (
        <Select onChange={setTypeValue}>
          {selectData.map(item => (
            <Option value={item.key} key={`type-${item.key}`}>
              {item.title}
            </Option>
          ))}
        </Select>
      )}
    </Form.Item>
  );

  const renderSubType = () => (
    <Form.Item
      label="文档子类"
      name="subType"
      required
      rules={[
        {
          required: true,
          message: '文档子类不能为空',
        },
      ]}
    >
      {isEditMode ? (
        <Input />
      ) : (
        <Select>
          {selectData
            .filter(item => item.key === (currentTypeSelectItem || dataItem.type))
            .map(({ children = [] }) =>
              children.map(jtem => (
                <Option value={jtem.key} key={jtem.key}>
                  {jtem.value}
                </Option>
              )),
            )}
        </Select>
      )}
    </Form.Item>
  );

  const renderConfirmButtonGroup = () => (
    <Form.Item>
      <Row>
        <Col span={6} push={3}>
          <Button onClick={() => setEditMode(!isEditMode)}>编辑</Button>
        </Col>
        <Col span={12} push={12}>
          <Row gutter={18}>
            <Col span={9}>
              <Button type="danger" onClick={() => form.resetFields()}>
                清空
              </Button>
            </Col>
            <Col span={6}>
              <Button type="primary" onClick={() => form.submit()} loading={loading}>
                确定
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </Form.Item>
  );

  const formValues = form.getFieldsValue();
  if (!dataItem.id) {
    if (isInit) {
      form.resetFields();
    } else {
      form.setFieldsValue(Object.assign({}, dataItem, formValues));
    }
  } else {
    isInit
      ? form.setFieldsValue(Object.assign({}, formValues, dataItem))
      : form.setFieldsValue(Object.assign({}, dataItem, formValues));
  }

  return (
    <Modal visible={visible} title="新建文档" footer={null} onCancel={handleCancel}>
      <Form
        {...formItemLayout}
        name="edit-form"
        form={form}
        onFinish={onFinish as any}
        onFinishFailed={onFinishFailed}
        onValuesChange={() => (isInit = false)}
      >
        {renderTitle()}
        {renderCategory(isEditMode)}
        {renderType()}
        {renderSubType()}
        {renderConfirmButtonGroup()}
      </Form>
    </Modal>
  );
};

export default EditForm;
