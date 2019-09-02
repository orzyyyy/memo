import React from 'react';
import './css/mapping.css';
import { Canvas, Toolbar } from 'mini-xmind';
import { DataSource } from 'mini-xmind/lib/canvas';

export interface MappingDetailProps {
  dataSource: DataSource;
  onChange: (data: DataSource) => void;
}

const MappingDetail = (props: MappingDetailProps) => (
  <div className="mapping">
    <Toolbar />
    <Canvas
      data={props.dataSource}
      className="canvas-wrapper"
      orientation="v"
      onChange={props.onChange}
    />
  </div>
);

export default MappingDetail;
