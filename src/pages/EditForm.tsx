import React, { useState } from 'react';
import { Form, Input, Modal, Select, Button } from 'antd';
import { SiderProps } from '../controller/MainPageDataController';
import { SelectValue } from 'antd/lib/select';
const { Option } = Select;

export interface FormProps {
  title: string;
  category: 'markdown' | 'mapping';
  type: string;
  subType: string;
}
export interface EditFormProps {
  form: any;
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

const EditForm = ({
  visible,
  loading,
  selectData,
  onCancel,
  onSubmit,
  dataItem = { type: '', subType: '', category: '', title: '' },
}: EditFormProps) => {
  const [form] = Form.useForm();
  const [currentType, setCurrentType] = useState('');
  const [extraTypeSelectItem, setExtraTypeSelectItem] = useState('');
  const [extraSubTypeSelectItem, setExtraSubTypeSelectItem] = useState('');

  const onFinish = ({ type, subType, title, category }: FormProps) => {
    onSubmit({ title, category, type, subType }, dataItem);
  };

  const onFinishFailed = ({ errorFields }: any) => {
    form.scrollToField(errorFields[0].name);
    onSubmit();
  };

  const handleReset = () => {
    form.resetFields();
  };

  const handleOnCancel = () => {
    onCancel();
    handleReset();
  };

  return (
    <Modal
      visible={visible}
      title="新建文档"
      footer={null}
      onCancel={handleOnCancel}
    >
      <Form
        {...formItemLayout}
        name="edit-form"
        onFinish={onFinish as any}
        onFinishFailed={onFinishFailed}
        initialValues={{
          title: dataItem.title,
          category: dataItem.category,
          type: dataItem.type,
          subType: dataItem.subType,
        }}
      >
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
          <Select>
            <Option value="markdown">markdown</Option>
            <Option value="mapping">mapping</Option>
          </Select>
        </Form.Item>
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
          <Select
            showSearch
            onSearch={value => setExtraTypeSelectItem(value)}
            onChange={value => setCurrentType(value as string)}
          >
            {selectData.map(item => (
              <Option value={item.key} key={`type-${item.key}`}>
                {item.title}
              </Option>
            ))}
            <Option value={extraTypeSelectItem}>{extraTypeSelectItem}</Option>
          </Select>
        </Form.Item>
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
          <Select
            showSearch
            onSearch={value => setExtraSubTypeSelectItem(value)}
          >
            {selectData
              .filter(item => (currentType ? item.key === currentType : true))
              .map(({ children = [] }) =>
                children.map(jtem => (
                  <Option value={jtem.key} key={jtem.key}>
                    {jtem.value}
                  </Option>
                )),
              )}
            <Option value={extraSubTypeSelectItem}>
              {extraSubTypeSelectItem}
            </Option>
          </Select>
        </Form.Item>
        <Form.Item wrapperCol={{ span: 24, offset: 16 }}>
          <>
            <Button style={{ marginRight: 16 }} onClick={handleReset}>
              重置
            </Button>
            <Button type="primary" htmlType="submit" loading={loading}>
              确定
            </Button>
          </>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditForm;
