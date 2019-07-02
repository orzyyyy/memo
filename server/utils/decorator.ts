import KoaRouter from 'koa-router';
// import path from 'path';

function injectService(service: string[], propsList: any) {
  for (const item of service) {
    propsList[item] = item;
  }
}

export function Controller(prefix: string, service: string[] = []) {
  const router: any = new KoaRouter();
  if (prefix) {
    router.prefix(prefix);
  }
  return function(target: any) {
    const propsList = Object.getOwnPropertyDescriptors(target.prototype);
    injectService(service, propsList);
    for (const v in propsList) {
      if (v !== 'constructor' && !service.includes(v)) {
        const fn = propsList[v].value;
        fn(router);
      }
    }
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
