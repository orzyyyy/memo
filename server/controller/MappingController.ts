import fs from 'fs-extra';
import path from 'path';
import { updateMappingRouter } from './MarkdownController';
import { Controller, Request } from '../utils/decorator';

@Controller('/del')
export default class MappingController {
  @Request({ url: '/mapping', method: 'delete' })
  async del(ctx: any) {
    const { id, category } = ctx.request.body;
    const mappingPaths = [
      `src/assets/mapping/${id}.json`,
      `dist/assets/mapping/${id}.json`,
    ];
    const markdownPaths = [
      `src/assets/markdown/${id}.md`,
      `dist/assets/markdown/${id}.md`,
    ];
    let targetPaths: string[] = [];

    switch (category) {
      case 'mapping':
        targetPaths = mappingPaths;
        break;

      case 'markdown':
        targetPaths = markdownPaths;
        break;

      default:
        break;
    }

    try {
      for (const item of targetPaths) {
        if (fs.existsSync(item)) {
          fs.unlinkSync(path.join(process.cwd(), item));
        } else {
          throw Error(`${item} doesn't exist.`);
        }
      }
      updateMappingRouter({ id } as any, true);
      ctx.response.body = true;
    } catch (error) {
      ctx.response.body = false;
    }
  }
}
