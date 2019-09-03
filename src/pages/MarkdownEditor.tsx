import React from 'react';
import MarkDownDetail from './MarkdownDetail';
import { Col, Row, Input, Button } from 'antd';
const { TextArea } = Input;

export interface MarkdownEditorProps {
  onSave: () => void;
  value: string;
  onChange: (value: string) => void;
}
export interface MarkdownEditorState {
  textareaValue: string;
}

const MarkdownEditor = ({ value, onSave, onChange }: MarkdownEditorProps) => (
  <Row gutter={16} style={{ padding: 15, width: '100%' }}>
    <Col span={12}>
      <TextArea
        style={{ height: '90vh', fontSize: 16 }}
        onChange={e => onChange(e.target.value)}
        value={value}
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
      <MarkDownDetail dataSource={value} />
    </Col>
    <Col span={8} push={8} style={{ marginTop: 24 }}>
      <Button block onClick={onSave}>
        提交
      </Button>
    </Col>
  </Row>
);

export default MarkdownEditor;
