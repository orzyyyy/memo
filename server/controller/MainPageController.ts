import fs from 'fs-extra';
import { Controller, Request } from '../utils/decorator';
import { joinWithRootPath } from '../utils/common';

@Controller('/')
export default class MainPageController {
  @Request({ url: '/', method: 'get' })
  async getMainPage(ctx: any) {
    ctx.type = 'html';
    ctx.response.body = fs.createReadStream(
      joinWithRootPath('dist/index.html'),
    );
  }
}
