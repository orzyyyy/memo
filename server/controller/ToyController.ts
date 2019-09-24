import { Controller, Request } from '../utils/decorator';
import ToyService from '../service/ToyService';
import { Context } from 'koa';

const getData = async (key: string, query: any) => {
  const service = new ToyService();
  const { result } = await service.getDataBySqlKey(key, query);
  return result;
};

const common = async (ctx: Context) => {
  const { key } = ctx.params;
  const result = await getData(key, ctx.query);
  return result;
};

@Controller('/toy')
export default class MainPageController {
  @Request({ url: '/get/:key', method: 'get' })
  async getDataByGet(ctx: Context) {
    return common(ctx);
  }

  @Request({ url: '/post/:key', method: 'post' })
  async getDataByPost(ctx: Context) {
    return common(ctx);
  }
}
