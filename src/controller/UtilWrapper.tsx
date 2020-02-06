import React, { useEffect, useState } from 'react';
import { getPathNameFromUrl, camelCase } from '../utils';
import marked from 'marked';
import 'github-markdown-css/github-markdown.css';

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
        setCurrentUtil(<target.default innerHTML={result} className="markdown-body" />);
      });
    };

    loadModule();
  }, [utilName, moduleName]);

  return currentUtil ? currentUtil : null;
};

export default UtilWrapper;
