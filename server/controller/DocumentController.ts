import { Controller, Request } from '../utils/decorator';
import md5 from 'blueimp-md5';
import { getWriteMappingPaths, updateSider, DocumentCategoryProps } from '../utils/document';
import DocumentService from '../service/DocumentService';

export interface MappingProps {
  createTime?: number;
  modifyTime?: number;
  id: string;
  title?: string;
  url?: string;
  type?: string;
  subType?: string;
  category?: DocumentCategoryProps;
  visible?: boolean;
  // use for documentation of utils, such as `assets/document/slice-image.md`
  key?: string;
}

@Controller('/document')
export default class DocumentController {
  constructor(private service: DocumentService) {
    this.service = new DocumentService();
  }

  @Request({ url: '/update/mapping', method: 'post' })
  async updateTargetMapping(ctx: any) {
    const { layout, id, title, type, subType, category, format } = ctx.request.body;
    if (!id) {
      throw Error('id is undefined');
    }
    const service = this.service;
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
    updateSider();
  }

  @Request({ url: '/add', method: 'post' })
  async initDocument(ctx: any) {
    const { title, type, subType, category, key } = ctx.request.body;
    const service = this.service;
    const timeStamp = new Date().getTime();
    const id = key || md5(timeStamp.toString());
    const writeFilesPaths = getWriteMappingPaths(category, id);
    service.initHtmlTemplate(category, id);
    service.updateMapping({ id, title, type, subType, category, key });
    service.updateContent(category, writeFilesPaths);
    updateSider();
    return id;
  }

  @Request({ url: '/delete', method: 'delete' })
  async deleteTargetDocument(ctx: any) {
    const { id, category } = ctx.request.body;
    const service = this.service;
    const writeFilesPaths = getWriteMappingPaths(category, id);
    service.deleteTargetDocument(writeFilesPaths);
    service.updateMapping({ id }, true);
    updateSider();
  }

  @Request({ url: '/hide', method: 'post' })
  async hideTargetDocument(ctx: any) {
    const { id } = ctx.request.body;
    const service = this.service;
    const item = service.getOriginMappingItem(id);
    item.visible = false;
    service.updateMapping(item);
    updateSider();
  }

  @Request({ url: '/update/content', method: 'post' })
  async updateTargetContent(ctx: any) {
    const { layout, id, format, category } = ctx.request.body;
    if (!id) {
      throw Error('id is undefined');
    }
    const service = this.service;
    // update layout for mapping, content for markdown
    const writeFilesPaths = getWriteMappingPaths(category, id);
    let content = service.getOriginContent(writeFilesPaths[0], layout, id);
    // formatted by prettier
    if (format) {
      content = service.formattedByPrettier(content);
    }
    service.updateContent(category, writeFilesPaths, content);
    service.updateMapping({ id, modifyTime: new Date().getTime() });
    return content;
  }
}
