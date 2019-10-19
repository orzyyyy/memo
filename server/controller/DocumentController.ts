import { Controller, Request } from '../utils/decorator';
import md5 from 'blueimp-md5';
import {
  getWriteMappingPaths,
  updateSider,
  DocumentCategoryProps,
} from '../utils/document';
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
  category?: DocumentCategoryProps;
  visible?: boolean;
}

@Controller('/document')
export default class DocumentController {
  constructor(private service: DocumentService) {
    this.service = new DocumentService();
  }

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
  async initDocument(ctx: Context) {
    const { title, type, subType, category } = ctx.request.body;
    const service = this.service;
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
    const service = this.service;
    const writeFilesPaths = getWriteMappingPaths(category, id);
    service.deleteTargetDocument(writeFilesPaths);
    service.updateMapping({ id }, true);
    updateSider();
  }

  @Request({ url: '/hide', method: 'post' })
  async hideTargetDocument(ctx: Context) {
    const { id } = ctx.request.body;
    const service = this.service;
    const item = service.getOriginMappingItem(id);
    item.visible = false;
    service.updateMapping(item);
    updateSider();
  }
}
