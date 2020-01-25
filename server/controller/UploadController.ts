import { Controller, Request } from '../utils/decorator';
import fs from 'fs-extra';
import { joinWithRootPath, getDateStamp } from '../utils/common';

@Controller('/upload')
export default class PrintController {
  @Request({ url: '/', method: 'post' })
  async print(ctx: any) {
    const originFiles = ctx.request.files?.file;
    const files = originFiles.length > 1 ? Array.from(originFiles) : [originFiles];
    await new Promise(resolve => {
      files.map((file: any) => {
        const uploadPath = joinWithRootPath(`upload/${getDateStamp()}/${file.name}`);
        fs.ensureFileSync(uploadPath);
        const reader = fs.createReadStream(file.path);
        const upStream = fs.createWriteStream(uploadPath);
        reader.pipe(upStream);
        resolve();
      });
    });
  }
}
