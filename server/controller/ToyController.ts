import { Controller, Request } from '../utils/decorator';
import ToyService from '../service/ToyService';

@Controller('/toy')
export default class MainPageController {
  @Request({ url: '/get/:key', method: 'get' })
  async getDataByGet(ctx: any) {
    const { key } = ctx.params;
    const service = new ToyService();
    ctx.response.body = await service.getDataBySqlKey(key);
  }

  @Request({ url: '/post/:key', method: 'post' })
  async getDataByPost(ctx: any) {
    const { key } = ctx.params;
    const service = new ToyService();
    ctx.response.body = await service.getDataBySqlKey(key);
  }
}
