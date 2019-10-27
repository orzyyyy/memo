/* eslint-disable require-atomic-updates */
import KoaRouter from 'koa-router';
import { Context } from 'koa';

export type HttpMehtod = 'get' | 'post' | 'put' | 'delete';

export function Controller(prefix: string, notUsedFunctions: string[] = []) {
  const router: any = new KoaRouter();
  if (prefix) {
    router.prefix(prefix);
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

export function Request({ url, method }: { url: string; method: HttpMehtod }) {
  return function(_target: any, _name: string, descriptor: any) {
    const fn = descriptor.value;
    const Constructor = _target.constructor || function() {};
    const Prototype = new Constructor();
    descriptor.value = (router: KoaRouter) => {
      router[method](url, async (ctx: Context, next: any) => {
        const result = await fn.call(Prototype, ctx, next);
        if (result !== undefined) {
          ctx.response.body = result;
          return result;
        }
        ctx.response.body = 'success';
        return 'success';
      });
    };
  };
}
