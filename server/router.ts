import Router from 'koa-router';
import fs from 'fs-extra';
import path from 'path';

const KoaRouter = new Router();
const cwd = process.cwd();

const addMapping = (router: any, mapping: any) => {
  // tslint:disable-next-line: forin
  for (const url in mapping) {
    let routerPath = url.substring(4);
    if (url.startsWith('GET ')) {
      router.get(routerPath, mapping[url]);
    } else if (url.startsWith('POST ')) {
      routerPath = url.substring(5);
      router.post(routerPath, mapping[url]);
    } else if (url.startsWith('DELETE ')) {
      routerPath = url.substring(7);
      router.delete(routerPath, mapping[url]);
    } else if (url.startsWith('PUT ')) {
      routerPath = url.substring(4);
      router.put(routerPath, mapping[url]);
    } else {
      console.error(`invalid URL: ${url}`);
    }
  }
};

const addControllers = (router: any) => {
  const files = fs.readdirSync(path.join(cwd, '/server/controller'));
  const jsFiles = files.filter((f: string) => {
    return f.endsWith('.js');
  });

  for (const file of jsFiles) {
    const mapping = require(path.join(cwd, '/server/controller/', file))
      .default;
    addMapping(router, mapping);
  }
};

addControllers(KoaRouter);

export default { router: KoaRouter };
