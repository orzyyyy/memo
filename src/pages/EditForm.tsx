import React, { Component } from 'react';
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
  onSubmit: (form: FormProps, id?: string | undefined) => void;
  onCancel: () => void;
  loading: boolean;
  dataItem: any;
}
export interface EditFormState {
  currentType: SelectValue;
  extraTypeSelectItem: string;
  extraSubTypeSelectItem: string;
}

class EditForm extends Component<EditFormProps, EditFormState> {
  state = {
    currentType: '',
    extraTypeSelectItem: '',
    extraSubTypeSelectItem: '',
  };

  handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const { form, onSubmit, dataItem } = this.props;
    form.validateFields(
      (err: any, { type, subType, title, category }: FormProps) => {
        if (!err) {
          onSubmit({ title, category, type, subType }, dataItem);
        }
      },
    );
  };

  handleReset = () => {
    this.props.form.resetFields();
  };

  handleOnCancel = () => {
    this.props.onCancel();
    this.handleReset();
  };

  render() {
    const {
      form,
      visible,
      loading,
      selectData,
      dataItem = { type: '', subType: '', category: '', title: '' },
    } = this.props;
    const { getFieldDecorator } = form;
    const {
      currentType,
      extraTypeSelectItem,
      extraSubTypeSelectItem,
    } = this.state;
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
              initialValue: dataItem.title,
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
              initialValue: dataItem.category,
            })(
              <Select>
                <Option value="markdown">markdown</Option>
                <Option value="mapping">mapping</Option>
              </Select>,
            )}
          </Form.Item>
          <Form.Item label="文档类别">
            {getFieldDecorator('type', {
              rules: [
                {
                  required: true,
                  message: '文档类别不能为空',
                },
              ],
              initialValue: dataItem.type,
            })(
              <Select
                showSearch
                onSearch={value =>
                  this.setState({ extraTypeSelectItem: value })
                }
                onChange={value => this.setState({ currentType: value })}
              >
                {selectData.map(item => (
                  <Option value={item.key} key={`type-${item.key}`}>
                    {item.title}
                  </Option>
                ))}
                <Option value={extraTypeSelectItem}>
                  {extraTypeSelectItem}
                </Option>
              </Select>,
            )}
          </Form.Item>
          <Form.Item label="文档子类">
            {getFieldDecorator('subType', {
              rules: [
                {
                  required: true,
                  message: '文档子类不能为空',
                },
              ],
              initialValue: dataItem.subType,
            })(
              <Select
                showSearch
                onSearch={value =>
                  this.setState({ extraSubTypeSelectItem: value })
                }
              >
                {selectData
                  .filter(item =>
                    currentType ? item.key === currentType : true,
                  )
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
              </Select>,
            )}
          </Form.Item>
          <Form.Item wrapperCol={{ span: 24, offset: 16 }}>
            <Button style={{ marginRight: 16 }} onClick={this.handleReset}>
              重置
            </Button>
            <Button type="primary" htmlType="submit" loading={loading}>
              确定
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

export default Form.create()(EditForm);
