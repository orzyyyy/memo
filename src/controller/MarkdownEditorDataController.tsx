import React, { Component } from 'react';
import { message } from 'antd';

export interface MarkdownEditorDataControllerProps {
  match: any;
}
export interface MarkdownEditorDataControllerState {
  dataSource: string;
  [moduleName: string]: any;
}
export interface MarkdownEditorSaveProps {
  id: string;
  layout: string;
  format?: boolean;
}

export default class MarkdownEditorDataController extends Component<
  MarkdownEditorDataControllerProps,
  MarkdownEditorDataControllerState
> {
  state: MarkdownEditorDataControllerState = {
    MarkdownEditor: null,
    MarkdownDetail: null,
    dataSource: '',
  };

  componentDidMount() {
    const { path, params } = this.props.match;
    const targetId = params.id;
    this.loadModule(
      path.includes('edit') ? 'MarkdownEditor' : 'MarkdownDetail',
      targetId,
    );
  }

  loadModule = (moduleName: string, targetId: string) => {
    import(`../pages/${moduleName}`).then(target =>
      this.setState({ [moduleName]: target.default || target }, () => {
        this.getTargetMarkdown(targetId);
      }),
    );
  };

  getTargetMarkdown = async (targetId: string) => {
    const response = await fetch(`../../assets/markdown/${targetId}.md`);
    const result = await response.text();
    this.setState({ dataSource: result });
  };

  handleSave = async ({ id, layout, format }: MarkdownEditorSaveProps) => {
    const response = await fetch('../../document/update', {
      body: JSON.stringify({ id, layout, category: 'markdown', format }),
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
    const result = await response.json();
    if (result) {
      message.success('保存成功');
      this.getTargetMarkdown(id);
    } else {
      message.error('保存失败');
    }
  };

  render() {
    const { dataSource, MarkdownEditor, MarkdownDetail } = this.state;
    return (
      <>
        {MarkdownEditor && (
          <MarkdownEditor
            targetId={this.props.match.params.id}
            dataSource={dataSource}
            onSave={this.handleSave}
          />
        )}
        {MarkdownDetail && <MarkdownDetail dataSource={dataSource} />}
      </>
    );
  }
}
