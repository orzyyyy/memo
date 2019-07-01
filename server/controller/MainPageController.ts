import fs from 'fs-extra';
import path from 'path';
import { Controller, Request } from '../utils/decorator';

@Controller('/')
export default class MainPageController {
  @Request({ url: '/', method: 'get' })
  async getMainPage(ctx: any) {
    ctx.type = 'html';
    ctx.response.body = fs.createReadStream(
      path.join(process.cwd(), 'dist', 'index.html'),
    );
  }
}
