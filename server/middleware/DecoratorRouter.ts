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
      let flag = true;

      if (callback) {
        flag = callback(controller);
      }

      if (flag) {
        app.use(require(controller).default.routes());
      }
    });

  await next();
};

export default DecoratorRouter;
