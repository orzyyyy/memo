import { Controller, Request } from '../utils/decorator';
import md5 from 'blueimp-md5';
import { getWriteMappingPaths, updateSider } from '../utils/document';
import DocumentService from '../service/DocumentService';
import { Context } from 'koa';

export interface MappingProps {
  [x: string]: any;
  createTime?: number;
  modifyTime?: number;
  id: string;
  title?: string;
  url?: string;
  type?: string;
  subType?: string;
  category?: 'mapping' | 'markdown';
  visible?: boolean;
}

@Controller('/document')
export default class MarkdownController {
  @Request({ url: '/update', method: 'post' })
  async updateTargetDocument(ctx: Context) {
    const {
      layout,
      id,
      title,
      type,
      subType,
      category,
      format,
    } = ctx.request.body;
    if (!id) {
      throw Error('id is undefined');
    }
    const service = new DocumentService();
    // formatted by prettier
    if (format) {
      service.formattedByPrettier(layout);
    }
    // update mapping
    service.updateMapping({
      id,
      title,
      modifyTime: new Date().getTime(),
      type,
      subType,
      category,
    });
    // update layout for mapping, content for markdown
    const writeFilesPaths = getWriteMappingPaths(category, id);
    const originContent = service.getOriginContent(
      writeFilesPaths[0],
      layout,
      id,
    );
    updateSider();
    service.updateContent(category, writeFilesPaths, originContent);
  }

  @Request({ url: '/add', method: 'post' })
  async initDocument(ctx: Context) {
    const { title, type, subType, category } = ctx.request.body;
    const service = new DocumentService();
    const timeStamp = new Date().getTime();
    const id = md5(timeStamp.toString());
    const writeFilesPaths = getWriteMappingPaths(category, id);
    service.initHtmlTemplate(category, id);
    service.updateMapping({
      id,
      title,
      type,
      subType,
      category,
    });
    service.updateContent(category, writeFilesPaths);
    updateSider();
    return id;
  }

  @Request({ url: '/delete', method: 'delete' })
  async deleteTargetDocument(ctx: Context) {
    const { id, category } = ctx.request.body;
    const service = new DocumentService();
    const writeFilesPaths = getWriteMappingPaths(category, id);
    service.deleteTargetDocument(writeFilesPaths);
    service.updateMapping({ id }, true);
    updateSider();
  }

  @Request({ url: '/hide', method: 'post' })
  async hideTargetDocument(ctx: Context) {
    const { id } = ctx.request.body;
    const service = new DocumentService();
    const item = service.getOriginMappingItem(id);
    item.visible = false;
    service.updateMapping(item);
    updateSider();
  }
}
