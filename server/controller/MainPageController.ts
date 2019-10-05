import { Controller, Request } from '../utils/decorator';
import MainPageService from '../service/MainPageService';
import { Context } from 'koa';

@Controller('/')
export default class MainPageController {
  @Request({ url: '/', method: 'get' })
  async getMainPage(ctx: Context) {
    const service = new MainPageService();
    ctx.type = 'html';
    return service.getDist();
  }
}
