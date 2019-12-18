import React from 'react';
import marked from 'marked';
import 'github-markdown-css/github-markdown.css';
import './css/MarkdownEditor.css';

export interface MarkdownEditorProps {
  onSave?: () => void;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}
export interface MarkdownEditorState {
  textareaValue: string;
}

const MarkdownEditor = ({ value, onChange }: MarkdownEditorProps) => {
  const onKeyUp = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const textLines = e.currentTarget.value.substr(0, e.currentTarget.selectionStart).split('\n');
    const currentLineNumber = textLines.length;
    const currentColumnIndex = textLines[textLines.length - 1].length;
    console.log('Current Line Number ' + currentLineNumber + ' Current Column Index ' + currentColumnIndex);
  };

  return (
    <div style={{ display: 'grid', fontSize: 16, gridTemplateColumns: '50% 50%', padding: 24 }}>
      <textarea
        style={{ marginRight: 24 }}
        className="markdown-body"
        onChange={onChange}
        value={value}
        onKeyUp={onKeyUp}
      />
      <div className="content markdown-body" dangerouslySetInnerHTML={{ __html: marked(value || '') }} />
    </div>
  );
};

export default MarkdownEditor;
