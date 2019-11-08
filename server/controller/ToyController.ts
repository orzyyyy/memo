import { Controller, Request } from '../utils/decorator';
import ToyService from '../service/ToyService';
import { Context } from 'koa';

@Controller('/toy')
export default class ToyController {
  constructor(private service: ToyService) {
    this.service = new ToyService();
  }

  @Request({ url: '/get/:key', method: 'get' })
  async getDataByGet(ctx: Context) {
    const { key } = ctx.params;
    const { result } = await this.service.getDataBySqlKey(key, ctx.query);
    return result;
  }

  @Request({ url: '/post/:key', method: 'post' })
  async getDataByPost(ctx: Context) {
    const { key } = ctx.params;
    const { result } = await this.service.getDataBySqlKey(key, ctx.request.body);
    return result;
  }

  @Request({ url: '/put/:key', method: 'put' })
  async getDataByPut(ctx: Context) {
    const { key } = ctx.params;
    const { result } = await this.service.getDataBySqlKey(key, ctx.request.body);
    return result;
  }

  @Request({ url: '/delete/:key', method: 'delete' })
  async getDataByDelete(ctx: Context) {
    const { key } = ctx.params;
    const { result } = await this.service.getDataBySqlKey(key, ctx.request.body);
    return result;
  }

  // 入 / 出库更新数据
  // 先查到原有库存，然后确定是加还是减
  // 注意合并成一个操作，或者说合并到一个环境去执行 sql，使用数据库默认的事务来管理写入和回滚
  @Request({ url: '/good/in', method: 'post' })
  async addGood(ctx: Context) {
    const params = ctx.request.body;
    const materialDetail = await this.service.getDataBySqlKey('get-detail-by-material-id', {
      materialId: params.materialId,
    });
    const originLength = materialDetail.result[0]['库存长度'];
    const originWeight = materialDetail.result[0]['库存重量'];
    // type == 0 为入库，库存增加；type == 1 为出库，库存减少
    const updateStatus = params.type ? -1 : 1;
    // 页面传过来的高度为垂直于截面的长度，对应库表中的长度
    params.newLength = originLength + params.height * updateStatus;
    params.newWeight = originWeight + params.weight * updateStatus;
    await this.service.getDataBySqlKey('goods-in', params);
  }

  // 更新材料类型
  // 入库前先检查目标数据是否已经存在
  @Request({ url: '/good/type/in', method: 'post' })
  async addMaterialType(ctx: Context) {
    const params = ctx.request.body;
    const materialDetail = await this.service.getDataBySqlKey(
      'get-material-type-by-detail',
      Object.assign({ 类别: -1, 材质: -1, 长: -1, 宽: -1, 高: -1 }, params),
    );
    if (materialDetail.result.length) {
      return '当前规格已存在';
    }
    await this.service.getDataBySqlKey('add-material-type', params);
  }
}
