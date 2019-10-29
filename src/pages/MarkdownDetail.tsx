import React from 'react';
import './css/MarkdownDetail.css';
import 'github-markdown-css/github-markdown.css';

export interface MarkdownDetailProps {
  dataSource: string;
}

export default (props: MarkdownDetailProps) => (
  <div className="MarkdownDetail markdown-body">
    <div className="wrapper">
      <div className="content" dangerouslySetInnerHTML={{ __html: props.dataSource || '' }}></div>
    </div>
  </div>
);
