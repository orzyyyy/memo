import React from 'react';
import Markdown from 'react-markdown/with-html';
import './css/MarkdownDetail.css';

export interface MarkdownDetailProps {
  dataSource: string;
}

export default (props: MarkdownDetailProps) => (
  <div className="MarkdownDetail">
    <div className="wrapper">
      <div className="content">
        <Markdown source={props.dataSource} escapeHtml={false} />
      </div>
    </div>
  </div>
);
