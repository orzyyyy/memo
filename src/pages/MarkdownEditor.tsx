import React from 'react';
import marked from 'marked';
import 'github-markdown-css/github-markdown.css';
import './css/MarkdownEditor.css';
import LineNumber from '../component/LineNumber';

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
    const lineNumber = textLines.length;
    const columnIndex = textLines[textLines.length - 1].length;
    // eslint-disable-next-line
    console.log(lineNumber + ', ' + columnIndex);
  };

  return (
    <div className="markdown-editor-wrapper">
      <LineNumber>
        <textarea className="markdown-body" onChange={onChange} value={value} onKeyUp={onKeyUp} />
      </LineNumber>
      <div className="content markdown-body" dangerouslySetInnerHTML={{ __html: marked(value || '') }} />
    </div>
  );
};

export default MarkdownEditor;
