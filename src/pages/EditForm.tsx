import React, { Component } from 'react';
import { Form, Input, Modal, Select, Cascader, Button } from 'antd';
import { SiderProps } from './MainPageDataController';
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
  cascaderData: SiderProps[];
  onSubmit: (form: FormProps) => void;
  onCancel: () => void;
}
export interface EditFormState {
  visible: boolean;
}

class EditForm extends Component<EditFormProps, EditFormState> {
  handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const { form, onSubmit } = this.props;
    form.validateFields((err: any, { docType, title, category }: any) => {
      if (!err) {
        onSubmit({
          title,
          category,
          type: docType[0],
          subType: docType[1],
        });
      }
    });
  };

  transformCascaderData = () => {
    const { cascaderData } = this.props;
    const result: any[] = [];

    for (const item of cascaderData.filter(target => target.children)) {
      const { key, title, children = [] } = item;
      const tempChildren = [];
      for (const child of children) {
        tempChildren.push({
          label: child.key,
          value: child.value,
        });
      }
      result.push({
        label: title,
        value: key,
        children: tempChildren,
      });
    }

    return result;
  };

  handleReset = () => {
    this.props.form.resetFields();
  };

  handleOnCancel = () => {
    const { onCancel } = this.props;
    onCancel();
    this.handleReset();
  };

  render() {
    const { form, visible } = this.props;
    const { getFieldDecorator } = form;
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
    return (
      <Modal
        visible={visible}
        title="新建文档"
        footer={null}
        onCancel={this.handleOnCancel}
      >
        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
          <Form.Item label="名称">
            {getFieldDecorator('title', {
              rules: [
                {
                  required: true,
                  message: '名称不能为空',
                },
              ],
            })(<Input />)}
          </Form.Item>
          <Form.Item label="显示类别">
            {getFieldDecorator('category', {
              rules: [
                {
                  required: true,
                  message: '显示类别不能为空',
                },
              ],
            })(
              <Select>
                <Option value="markdown">markdown</Option>
                <Option value="mapping">mapping</Option>
              </Select>,
            )}
          </Form.Item>
          <Form.Item label="文档类别">
            {getFieldDecorator('docType', {
              rules: [
                {
                  required: true,
                  message: '文档类别不能为空',
                },
              ],
            })(
              <Cascader
                expandTrigger="hover"
                options={this.transformCascaderData()}
                placeholder=""
              />,
            )}
          </Form.Item>
          <Form.Item wrapperCol={{ span: 24, offset: 16 }}>
            <Button style={{ marginRight: 16 }} onClick={this.handleReset}>
              重置
            </Button>
            <Button type="primary" htmlType="submit">
              确定
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

export default Form.create()(EditForm);
