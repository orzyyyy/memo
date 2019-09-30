import { useEffect, useState } from 'react';

export function useResize() {
  const [width, setWidth] = useState(document.body.clientWidth);
  const [height, setHeight] = useState(document.body.clientHeight);

  useEffect(() => {
    const handleResize = () => {
      setWidth(document.body.clientWidth);
      setHeight(document.body.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });
  return [width, height, setWidth, setHeight];
}
