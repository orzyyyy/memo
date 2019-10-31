export const replacePlaceholderWithParams = (sql: string, params: any) => {
  let result = sql;
  const variables = [];
  // SELECT * FROM dictionary where value = @value
  // => ['@value']
  // SELECT * FROM dictionary where value = @value;
  // => ['@value;']
  // SELECT * FROM dictionary where value = @value and id = @id;
  // => ['@value', '@id;']
  // `SELECT * FROM dictionary where value = @value
  //  and id = @id;
  // `
  // => ['@value', '@id;\n']
  const originVariables = sql.match(/@(.+?)[^ ]*/g) || [];
  for (const item of originVariables) {
    const key = item
      // remove all line break, \r and \n
      .replace(/[\r]/g, '')
      .replace(/[\n]/g, '')
      // remove all ()
      /* eslint-disable-next-line no-useless-escape */
      .replace(/[\()]/g, '')
      // remove all space
      /* eslint-disable-next-line no-useless-escape */
      .replace(/\ +/g, '')
      // remove all ; @ ,
      .replace(/[;@,]/g, '');
    variables.push(key);
  }

  for (const item of variables) {
    let value = params[item];
    if (value !== undefined) {
      const targetVariable = `@${item}`;
      const reg = new RegExp(targetVariable, 'g');
      if (typeof value === 'string') {
        value = `'${value}'`;
      }
      result = result.replace(reg, value);
    }
  }

  return result;
};
