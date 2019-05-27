import React, { Component } from 'react';
import MarkdownEditor from './MarkdownEditor';
import { message } from 'antd';

export interface MarkdownEditorDataControllerProps {
  match: any;
}
export interface MarkdownEditorDataControllerState {
  dataSource: string;
}

export default class MarkdownEditorDataController extends Component<
  MarkdownEditorDataControllerProps,
  MarkdownEditorDataControllerState
> {
  state: MarkdownEditorDataControllerState = {
    dataSource: '',
  };

  componentDidMount() {
    const targetId = this.props.match.params.id;
    this.getTargetMarkdown(targetId);
  }

  getTargetMarkdown = async (targetId: string) => {
    const response = await fetch(`./assets/markdown/${targetId}.md`);
    const result = await response.text();
    this.setState({ dataSource: result });
  };

  handleSave = async ({ id, layout }: { id: string; layout: string }) => {
    const response = await fetch('save/update', {
      body: JSON.stringify({ id, layout }),
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
    const { dataSource } = this.state;
    return (
      <MarkdownEditor
        targetId={this.props.match.params.id}
        dataSource={dataSource}
        onSave={this.handleSave}
      />
    );
  }
}
