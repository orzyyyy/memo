import { useEffect, useState } from 'react';

export function useResize() {
  const [, setWidth] = useState(document.body.clientWidth);
  const [, setHeight] = useState(document.body.clientHeight);

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
}
