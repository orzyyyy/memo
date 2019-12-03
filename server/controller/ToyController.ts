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
  // 页面传过来的高度为垂直于截面的长度，对应库表中的长度
  @Request({ url: '/good/in', method: 'post' })
  async addGood(ctx: Context) {
    const params = ctx.request.body;
    const materialDetail = await this.service.getDataBySqlKey('get-detail-by-material-id', {
      materialId: params.materialId,
    });
    const originWeight = materialDetail.result[0]['库存重量'];
    // type == 0 为入库，库存增加；type == 1 为出库，库存减少
    const updateStatus = params.type ? -1 : 1;
    params.newWeight = originWeight + params.weight * updateStatus;
    await this.service.getDataBySqlKey('goods-in', params);
  }

  // 更新材料类型
  // 入库前先检查目标数据是否已经存在
  @Request({ url: '/good/type/in', method: 'post' })
  async addMaterialType(ctx: Context) {
    const params = ctx.request.body;
    const realParams = Object.assign(
      {
        材质: 0,
        长: 0,
        宽: 0,
        高: 0,
        卖出方式: 0,
        制作标准: 0,
        制作方式: 0,
        处理工艺: 0,
        单价: 0,
        锯费: 0,
        产地: '',
        类别1: 0,
        类别2: 0,
        类别3: 0,
        类别4: 0,
      },
      params,
    );
    const materialDetail = await this.service.getDataBySqlKey('get-material-type-by-detail', realParams);
    if (materialDetail.result.length) {
      return '当前规格已存在';
    }
    await this.service.getDataBySqlKey('add-material-type', realParams);
  }
}
