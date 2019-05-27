import React, { Component } from 'react';
import MarkdownEditor from './MarkdownEditor';

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

  render() {
    const { dataSource } = this.state;
    return (
      <MarkdownEditor
        targetId={this.props.match.params.id}
        dataSource={dataSource}
      />
    );
  }
}
