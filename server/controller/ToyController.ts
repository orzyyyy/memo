import { Controller, Request } from '../utils/decorator';
import ToyService from '../service/ToyService';
import { Context } from 'koa';

@Controller('/toy')
export default class ToyController {
  constructor(private service: ToyService) {
    this.service = new ToyService();
  }

  @Request({ url: '/get/:key', method: 'get' })
  async getDataByGet(ctx: Context) {
    const { key } = ctx.params;
    const { result } = await this.service.getDataBySqlKey(key, ctx.query);
    return result;
  }

  @Request({ url: '/post/:key', method: 'post' })
  async getDataByPost(ctx: Context) {
    const { key } = ctx.params;
    const { result } = await this.service.getDataBySqlKey(key, ctx.request.body);
    return result;
  }

  @Request({ url: '/put/:key', method: 'put' })
  async getDataByPut(ctx: Context) {
    const { key } = ctx.params;
    const { result } = await this.service.getDataBySqlKey(key, ctx.request.body);
    return result;
  }

  @Request({ url: '/delete/:key', method: 'delete' })
  async getDataByDelete(ctx: Context) {
    const { key } = ctx.params;
    const { result } = await this.service.getDataBySqlKey(key, ctx.request.body);
    return result;
  }
}
