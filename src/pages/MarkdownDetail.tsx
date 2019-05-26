import React, { Component } from 'react';
import Markdown from 'react-markdown';
import { Col, Row, Input } from 'antd';
const { TextArea } = Input;

export interface MarkdownDetailProps {
  match: any;
}

export default class MarkdownDetail extends Component<MarkdownDetailProps> {
  state = {
    textareaValue: '',
  };

  componentDidMount = () => {
    // this.props.match.params.id
  };

  handleOnChange = (e: any) => {
    this.setState({ textareaValue: e.target.value });
  };

  render() {
    const { textareaValue } = this.state;

    return (
      <Row gutter={16} style={{ padding: 15, width: '100%' }}>
        <Col span={12}>
          <TextArea
            style={{ height: '95vh' }}
            onChange={this.handleOnChange}
            value={textareaValue}
          />
        </Col>
        <Col span={12}>
          <Markdown source={textareaValue} />
        </Col>
      </Row>
    );
  }
}
