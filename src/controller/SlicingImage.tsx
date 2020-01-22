import React, { useEffect, useState } from 'react';
import SlicingImage from '../pages/SlicingImage';
import marked from 'marked';

const SlicingImageController = () => {
  const [innerHTML, setInnerHTML] = useState('');

  useEffect(() => {
    const fetchDocument = async () => {
      const response = await fetch('../assets/document/slice-image.md');
      const result = await response.text();
      setInnerHTML(marked(result || ''));
    };

    fetchDocument();
  });

  return <SlicingImage innerHTML={innerHTML} />;
};

export default SlicingImageController;
