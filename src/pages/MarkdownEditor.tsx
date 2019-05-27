import React, { Component } from 'react';
import Markdown from 'react-markdown';
import { Col, Row, Input, Button, message } from 'antd';
const { TextArea } = Input;

export interface MarkdownDetailProps {
  match: any;
}

export default class MarkdownDetail extends Component<MarkdownDetailProps> {
  state = {
    textareaValue: '',
  };

  handleOnChange = (e: any) => {
    this.setState({ textareaValue: e.target.value });
  };

  handleSave = async () => {
    const response = await fetch('save/update', {
      body: JSON.stringify({
        id: this.props.match.params.id,
        layout: this.state.textareaValue,
      }),
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
    const result = await response.json();
    if (result) {
      message.success('保存成功');
    } else {
      message.error('保存失败');
    }
  };

  render() {
    const { textareaValue } = this.state;

    return (
      <Row gutter={16} style={{ padding: 15, width: '100%' }}>
        <Col span={12}>
          <TextArea
            style={{ height: '90vh' }}
            onChange={this.handleOnChange}
            value={textareaValue}
          />
        </Col>
        <Col span={12} style={{ height: '90vh', overflow: 'auto' }}>
          <Markdown source={textareaValue} escapeHtml={false} />
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
