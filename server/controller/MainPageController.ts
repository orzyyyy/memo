import { Controller, Request } from '../utils/decorator';
import MainPageService from '../service/MainPageService';

@Controller('/')
export default class MainPageController {
  @Request({ url: '/', method: 'get' })
  async getMainPage(ctx: any) {
    const service = new MainPageService();
    ctx.type = 'html';
    ctx.response.body = service.getDist();
  }
}
