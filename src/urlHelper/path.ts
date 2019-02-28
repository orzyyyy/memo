/*eslint-disable */
const proxy: any = null;
const isDev = process.env.NODE_ENV === "development";

const prod = {};

const dev = {};

const path = isDev ? dev : prod;

export { path, proxy, isDev };
