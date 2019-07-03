import React, { Component } from 'react';
import MarkDownDetail from './MarkdownDetail';
import { Col, Row, Input, Button } from 'antd';
import { MarkdownEditorSaveProps } from '../controller/MarkdownEditorDataController';
const { TextArea } = Input;

export interface MarkdownEditorProps {
  targetId: string;
  dataSource: string;
  onSave: ({ id, layout, format }: MarkdownEditorSaveProps) => void;
}
export interface MarkdownEditorState {
  textareaValue: string;
}

export default class MarkdownEditor extends Component<
  MarkdownEditorProps,
  MarkdownEditorState
> {
  static getDerivedStateFromProps(
    prevProps: MarkdownEditorProps,
    prevState: MarkdownEditorState,
  ) {
    if (!prevState.textareaValue) {
      return { textareaValue: prevProps.dataSource };
    }
    return null;
  }

  state: MarkdownEditorState = {
    textareaValue: '',
  };

  componentDidMount = () => {
    document.onkeydown = e => {
      const { ctrlKey, keyCode } = e;
      // ctrl + s
      if (ctrlKey && keyCode === 83) {
        e.preventDefault();
        this.props.onSave({
          id: this.props.targetId,
          layout: this.state.textareaValue,
          format: true,
        });
      } else {
        e.stopPropagation();
      }
    };
  };

  handleOnChange = (e: any) => {
    this.setState({ textareaValue: e.target.value });
  };

  handleSave = () => {
    const onSave = this.props.onSave;
    if (onSave) {
      onSave({ id: this.props.targetId, layout: this.state.textareaValue });
    }
  };

  render() {
    const { textareaValue } = this.state;
    return (
      <Row gutter={16} style={{ padding: 15, width: '100%' }}>
        <Col span={12}>
          <TextArea
            style={{ height: '90vh', fontSize: 16 }}
            onChange={this.handleOnChange}
            value={textareaValue}
          />
        </Col>
        <Col
          span={12}
          style={{
            height: '90vh',
            overflow: 'auto',
            paddingLeft: 24,
            fontSize: 16,
          }}
        >
          <MarkDownDetail dataSource={textareaValue} />
        </Col>
        <Col span={8} push={8} style={{ marginTop: 24 }}>
          <Button block onClick={this.handleSave}>
            提交
          </Button>
        </Col>
      </Row>
    );
  }
}
