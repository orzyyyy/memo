import React from 'react';
import Upload from '../component/Upload';

const SlicingImage = () => {
  return (
    <Upload
      fileList={[
        {
          url: 'https://peko-bot.github.io/chika-component/assets/d19f18a8ly1g0akzu7cq5j20u016gnpe.jpg',
          name: 'test',
          id: 1,
        },
      ]}
      style={{ padding: 6 }}
    />
  );
};

export default SlicingImage;
