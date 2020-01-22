import React, { useEffect, useState } from 'react';
import { getPathNameFromUrl, camelCase } from '../utils';
import marked from 'marked';

const UtilWrapper = () => {
  const utilName: string = getPathNameFromUrl();
  const moduleName = camelCase(utilName);

  const [currentUtil, setCurrentUtil] = useState();

  useEffect(() => {
    const fetchDocument = async () => {
      const response = await fetch(`../assets/document/${utilName}.md`);
      const result = await response.text();
      return marked(result || '');
    };

    const loadModule = () => {
      import(`../pages/${moduleName}.tsx`).then(async target => {
        const result = await fetchDocument();
        setCurrentUtil(<target.default innerHTML={result} />);
      });
    };

    loadModule();
  }, [utilName, moduleName]);

  return currentUtil ? currentUtil : null;
};

export default UtilWrapper;
