import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import KoaStatic from 'koa-static';
import fs from 'fs-extra';
import path from 'path';
import { info } from './utils/log';
import { joinWithRootPath } from './utils/common';

const initRouter = (targetApp: any) => {
  fs.readdirSync(joinWithRootPath('bin/controller'))
    .filter((filePath: string) => filePath.endsWith('.js'))
    .map((controllerPath: any) => {
      const controller = path.join(__dirname, 'controller', controllerPath);
      targetApp.use(require(controller).default.routes());
    });
};

const app = new Koa();

app.use(bodyParser());
initRouter(app);
app.use(KoaStatic(joinWithRootPath('dist')));

export default app.listen(9099, () => {
  info('listen at port 9099');
});
