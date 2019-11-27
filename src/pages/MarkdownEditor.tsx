import React from 'react';
import marked from 'marked';
import 'github-markdown-css/github-markdown.css';

export interface MarkdownEditorProps {
  onSave?: () => void;
  value: string;
  onChange: (value: string) => void;
}
export interface MarkdownEditorState {
  textareaValue: string;
}

const MarkdownEditor = ({ value, onChange }: MarkdownEditorProps) => (
  <div style={{ display: 'grid', fontSize: 16, gridTemplateColumns: '50% 50%', padding: 24 }}>
    <textarea style={{ marginRight: 24 }} onChange={e => onChange(e.target.value)} value={value} />
    <div className="content markdown-body" dangerouslySetInnerHTML={{ __html: marked(value || '') }} />
  </div>
);

export default MarkdownEditor;
