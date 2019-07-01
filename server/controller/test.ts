import { Controller, Request } from '../utils/decorator';

@Controller('/test')
export default class TestController {
  @Request({ url: '/test', method: 'get' })
  async Hello(ctx: any) {
    ctx.body = 'success';
  }
}
