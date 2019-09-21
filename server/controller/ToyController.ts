import { Controller, Request } from '../utils/decorator';
import ToyService from '../service/ToyService';

@Controller('/toy')
export default class MainPageController {
  @Request({ url: '/', method: 'get' })
  async getMainPage(ctx: any) {
    const { key } = ctx.query;
    const service = new ToyService();
    ctx.response.body = await service.getDataBySqlKey(key);
  }
}
