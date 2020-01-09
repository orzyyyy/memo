import { Controller, Request } from '../utils/decorator';
import { runCmd } from 'nino-cli/dist/utils/common';
import { joinWithRootPath } from '../utils/common';

@Controller('/github')
export default class MainPageController {
  @Request({ url: '/update', method: 'post' })
  async update() {
    runCmd('sh', [joinWithRootPath('scripts/update.sh')]);
    return 'success';
  }
}
