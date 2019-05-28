import React from 'react';
import Markdown from 'react-markdown';

export interface MarkdownDetailProps {
  dataSource: string;
}

export default (props: MarkdownDetailProps) => (
  <div style={{ height: '95vh', overflow: 'auto' }}>
    <Markdown source={props.dataSource} escapeHtml={false} />;
  </div>
);
