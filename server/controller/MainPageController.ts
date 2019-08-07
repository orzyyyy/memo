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

  @Request({ url: '/mapping/*', method: 'get' })
  async getMapping(ctx: any) {
    const { url } = ctx;
    const targetResource = url.replace('/mapping', '');
    const service = new MainPageService();
    ctx.response.body = service.getVendor(targetResource);
  }

  @Request({ url: '/markdown/edit/*', method: 'get' })
  async getMarkdownEditor(ctx: any) {
    const { url } = ctx;
    const targetResource = url.replace('/markdown/edit', '');
    if (!url.includes('vendor')) {
      ctx.status = 200;
    } else {
      const service = new MainPageService();
      ctx.response.body = service.getVendor(targetResource);
    }
  }

  @Request({ url: '/markdown/*', method: 'get' })
  async getMarkdown(ctx: any) {
    const { url } = ctx;
    const targetResource = url.replace('/markdown', '');
    const service = new MainPageService();
    ctx.response.body = service.getVendor(targetResource);
  }

  @Request({ url: '/test', method: 'get' })
  async isLocalEnvironment(ctx: any) {
    ctx.response.body = 'success';
  }
}
