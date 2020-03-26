import { getTimeStamp, getDateStamp } from './common';

const handleWithSystemVariables = (sql: string) => {
  const timeStamp = getTimeStamp();
  const dateStamp = getDateStamp();
  return sql.replace(/@@dateStamp/g, dateStamp).replace(/@@timeStamp/g, timeStamp);
};

export const replacePlaceholderWithParams = (sql: string, params: any) => {
  let result = handleWithSystemVariables(sql);
  const variables = [];
  // these rules are for `@xxx`
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
  const customedVariables = sql.match(/@(.+?)[^ ]*/g) || [];
  for (const item of customedVariables) {
    const key = item
      // remove all line break, \r and \n
      .replace(/[\r]/g, '')
      .replace(/[\n]/g, '')
      // remove all ()
      .replace(/[()]/g, '')
      // remove all space
      .replace(/ +/g, '')
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
