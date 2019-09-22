import { Controller, Request } from '../utils/decorator';
import ToyService from '../service/ToyService';
import { Context } from 'koa';

const common = async (key: string) => {
  const service = new ToyService();
  const { result } = await service.getDataBySqlKey(key);
  return result;
};

@Controller('/toy')
export default class MainPageController {
  @Request({ url: '/get/:key', method: 'get' })
  async getDataByGet(ctx: Context) {
    const { key } = ctx.params;
    ctx.response.body = await common(key);
  }

  @Request({ url: '/post/:key', method: 'post' })
  async getDataByPost(ctx: Context) {
    const { key } = ctx.params;
    ctx.response.body = await common(key);
  }
}
