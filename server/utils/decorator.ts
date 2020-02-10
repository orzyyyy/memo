import KoaRouter from '@koa/router';
import { Context } from 'koa';

export type HttpMehtod = 'get' | 'post' | 'put' | 'delete';
export type QueueInstanceProps = { [key: string]: { func: Function; prototype: any; ctx: Context; next: any }[] };

export function Controller(prefix: string, notUsedFunctions: string[] = []) {
  const router: any = new KoaRouter();
  if (prefix) {
    router.prefix('/api/memo' + prefix);
  }
  return function(target: any) {
    const propsList = Object.getOwnPropertyDescriptors(target.prototype);
    for (const functionName in propsList) {
      if (functionName !== 'constructor' && !notUsedFunctions.includes(functionName)) {
        const fn = propsList[functionName].value;
        fn(router);
      }
    }
    return router;
  };
}

async function executeFunc(targetFuncList: QueueInstanceProps[]) {
  const { func, prototype, ctx, next }: any = targetFuncList.pop();
  const result = await func.call(prototype, ctx, next);
  ctx.response.body = result || 'success';
}

export function Request({ url, method, queue }: { url: string; method: HttpMehtod; queue?: number | boolean }) {
  return function(_target: any, _name: string, descriptor: any) {
    const fn = descriptor.value;
    const Constructor = _target.constructor || function() {};
    const Prototype = new Constructor();
    descriptor.value = (router: KoaRouter) => {
      router[method](url, async (ctx: Context, next: any) => {
        // initial for every url with queue. Such as url `/test`
        // set an obj {}, obj[url] = [];
        // the queue object will looks like
        // {
        //   '/test1': [func1, func2, func3, ...]
        //   '/test2': [func1, func2, func3, ...]
        // }
        // each url is independent of each other.
        if ((ctx.app as any).queue === undefined) {
          (ctx.app as any).queue = {};
        }

        const currentQueue = (ctx.app as any).queue;
        if (Object.keys(queue || 0).length === 0) {
          if (!currentQueue[ctx.url]) {
            currentQueue[ctx.url] = [];
          }
          currentQueue[ctx.url].push({ func: fn, prototype: Prototype, ctx, next });
        }

        const targetFuncList = currentQueue[ctx.url];
        if (targetFuncList.length === 1) {
          await executeFunc(targetFuncList);
        } else {
          while (targetFuncList.length !== 0) {
            await new Promise(resolve => {
              ctx.res.on('finish', async () => {
                await executeFunc(targetFuncList);
                resolve();
              });
            });
          }
        }
      });
    };
  };
}
