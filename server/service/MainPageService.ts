import fs from 'fs-extra';
import { joinWithRootPath } from '../utils/common';

export default class MainPageService {
  getDist = () => fs.createReadStream(joinWithRootPath('dist/index.html'));
}
