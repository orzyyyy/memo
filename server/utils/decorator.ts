import KoaRouter from 'koa-router';

export function Controller(prefix: string) {
  const router: any = new KoaRouter();
  if (prefix) {
    router.prefix(prefix);
  }
  return function(target: any) {
    const reqList = Object.getOwnPropertyDescriptors(target.prototype);
    for (const v in reqList) {
      if (v !== 'constructor') {
        const fn = reqList[v].value;
        fn(router);
      }
    }
    router.prototype.routes = null;
    return router;
  };
}

export function Request({
  url,
  method,
}: {
  url: string;
  method: 'get' | 'post' | 'put' | 'delete';
}) {
  return function(_target: any, _name: string, descriptor: any) {
    const fn = descriptor.value;
    descriptor.value = (router: any) => {
      router[method](url, async (ctx: any, next: any) => {
        await fn(ctx, next);
      });
    };
  };
}
