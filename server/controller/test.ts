import { Controller, Request } from '../utils/decorator';

@Controller('/test')
export class TestController {
  static routes: any;
  @Request({ url: '/test', method: 'get' })
  async Hello(ctx: any) {
    ctx.body = 'success';
  }
}
