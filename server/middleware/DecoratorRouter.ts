import { Context } from 'koa';
import fs from 'fs-extra';
import path from 'path';

const DecoratorRouter = (controllerRootPath: string, callback?: (url: string) => boolean) => async (
  { app }: Context,
  next: Function,
) => {
  fs.readdirSync(controllerRootPath)
    .filter((filePath: string) => path.extname(filePath) === '.js')
    .map((controllerPath: string) => {
      const controller = path.join(controllerRootPath, controllerPath);

      if ((callback && callback(controller)) || callback === undefined) {
        const routes = require(controller).default.routes();
        app.use(routes);
      }
    });

  await next();
};

export default DecoratorRouter;
