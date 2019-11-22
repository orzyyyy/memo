import React from 'react';
import './css/MarkdownDetail.css';
import 'github-markdown-css/github-markdown.css';

export interface MarkdownDetailProps {
  dataSource: string;
}

const MarkdownDetail = (props: MarkdownDetailProps) => (
  <div className="MarkdownDetail markdown-body">
    <div className="wrapper">
      <div className="content" dangerouslySetInnerHTML={{ __html: props.dataSource || '' }} />
    </div>
  </div>
);

export default MarkdownDetail;
