import { Controller, Request } from '../utils/decorator';
import { runCmd } from 'nino-cli/dist/utils/common';
import { joinWithRootPath } from '../utils/common';

@Controller('/github')
export default class GithubController {
  @Request({ url: '/update', method: 'post', queue: true })
  async update(ctx: any) {
    const { ref } = ctx.request.body;

    if (ref === 'refs/heads/master') {
      runCmd('sh', [joinWithRootPath('scripts/update.sh')]);
      return 'rebuild start.';
    }
    return 'not at branch master.';
  }
}
