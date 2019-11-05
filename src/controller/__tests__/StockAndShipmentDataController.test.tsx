import React from 'react';
import { shallow, mount } from 'enzyme';
import StockAndShipmentDataController from '../StockAndShipmentDataController';
import fetchMock from 'fetch-mock';

describe('StockAndShipmentDataController', () => {
  const formData = {
    materialType: 1,
    materialTypeError: true,
    materialTypeMessage: '该项不能为空',
    materialCost: '',
    materialCostError: true,
    materialCostMessage: '该项不能为空',
    type: 0,
    length: 2,
    lengthError: true,
    lengthMessage: '该项不能为空',
    width: 3,
    widthError: true,
    widthMessage: '该项不能为空',
    height: 4,
    heightError: true,
    heightMessage: '该项不能为空',
    weight: 5,
    weightError: true,
    weightMessage: '该项不能为空',
    predictWeight: 0,
    freight: '',
    freightError: true,
    freightMessage: '该项不能为空',
    extraCost: '',
    description: '',
    calcuteType: 0,
  };

  const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});

  beforeEach(() => {});

  afterAll(() => {
    errorSpy.mockRestore();
    warnSpy.mockRestore();
  });

  afterEach(() => {
    fetchMock.restore();
  });

  it('onSubmit', async () => {
    const wrapper: any = await shallow(<StockAndShipmentDataController />);
    let result = await wrapper
      .find('Inbound')
      .props()
      .onSubmit();
    expect(result).toBeFalsy();
  });

  it('AppBar should work', () => {
    const wrapper: any = mount(<StockAndShipmentDataController />);
    expect(wrapper.find('h6').text()).toBe('入库');
    wrapper
      .find('ForwardRef(AppBar)')
      .find('button')
      .props()
      .onClick({ text: '', value: '' }, 'type');
    wrapper.setProps({ formData: Object.assign({}, formData, { type: 1 }) });
    expect(wrapper.find('h6').text()).toBe('出库');
  });
});
