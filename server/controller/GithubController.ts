import { Controller, Request } from '../utils/decorator';
import { Context } from 'koa';
import { runCmd } from 'nino-cli/dist/utils/common';
import { joinWithRootPath } from '../utils/common';

@Controller('/github')
export default class MainPageController {
  @Request({ url: '/update', method: 'get' })
  async update(ctx: Context) {
    const { token } = ctx.query;
    if (!token) {
      return 'failed';
    }
    runCmd('sh', [joinWithRootPath('scripts/update.sh')]);
    return 'success';
  }
}
