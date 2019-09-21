import { Context } from 'koa';
import toml from 'toml';
import fs from 'fs-extra';
import path from 'path';
import { HttpMehtod } from '../utils/decorator';
import { error } from '../utils/log';

export interface SqlInstanceProps {
  sql: string;
  method: HttpMehtod;
  path?: string;
}

const initResourcePath = (resourcePath: string | string[]) => {
  let paths = [];
  if (typeof resourcePath === 'string') {
    paths.push(resourcePath);
  } else {
    paths = resourcePath;
  }
  return paths;
};

export const getAllSqlInstances = (
  paths: string[],
  isInjectPath = true,
): SqlInstanceProps[] => {
  const instances = [];
  for (const dirPath of paths) {
    const resourcePath = fs.readdirSync(dirPath);
    for (const fileUrls of resourcePath) {
      const fileUrl = path.join(dirPath, fileUrls);
      const resourceFile = fs.readFileSync(fileUrl, 'utf-8');
      const result = toml.parse(resourceFile);
      if (isInjectPath) {
        result.path = fileUrl;
      }
      instances.push(result);
    }
  }
  return instances;
};

const checkRepeatedKey = (instances: SqlInstanceProps[]) => {
  let keys = [];
  let repeatedKeys = [];
  for (const instance of instances) {
    keys.push(Object.keys(instance)[0]);
  }

  const len = keys.length;
  keys = keys.sort();
  for (let i = 0; i < len - 1; i++) {
    if (keys[i] === keys[i + 1]) {
      repeatedKeys.push(keys[i]);
    }
  }
  repeatedKeys = Array.from(new Set(repeatedKeys));

  for (const instance of instances) {
    const key = Object.keys(instance)[0];
    for (const item of repeatedKeys) {
      if (key === item) {
        error(`repeated key ${key} in ${instance.path}`);
      }
    }
  }

  if (repeatedKeys.length) {
    throw Error('please check keys in sql files');
  }
};

const CheckSqlTomlResource = (resourcePath: string | string[]) => {
  const paths = initResourcePath(resourcePath);
  const sqls = getAllSqlInstances(paths);
  checkRepeatedKey(sqls);

  return async (_: Context, next: Function) => {
    await next();
  };
};

export default CheckSqlTomlResource;
