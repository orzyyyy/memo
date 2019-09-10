// Forks from https://github.com/benjycui/omit.js
export function omit<T, K extends keyof T>(
  obj: T,
  fields: Array<K>,
): Pick<T, Exclude<keyof T, K>> {
  const shallowCopy = {
    ...obj,
  };
  for (let i = 0; i < fields.length; i++) {
    const key = fields[i];
    delete shallowCopy[key];
  }
  return shallowCopy;
}
