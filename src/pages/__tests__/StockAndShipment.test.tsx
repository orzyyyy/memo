import React from 'react';
import { mount } from 'enzyme';
import StockAndShipment from '../StockAndShipment';

describe('StockAndShipment', () => {
  const formData = {
    materialType: 0,
    materialTypeError: false,
    materialTypeMessage: 'error',
    materialCost: 100,
    materialCostError: false,
    materialCostMessage: 'error',
    type: 0,
    calcuteType: 0,
    length: 101,
    lengthError: false,
    lengthMessage: 'error',
    width: 102,
    widthError: false,
    widthMessage: 'error',
    height: 103,
    heightError: false,
    heightMessage: 'error',
    weight: 104,
    weightError: false,
    weightMessage: 'error',
    predictWeight: 105,
    freight: 106,
    freightError: false,
    freightMessage: 'error',
    extraCost: 107,
    description: '',
  };

  const formOptions = {
    materialType: [{ text: 'materialTypeText', value: 'materialTypeValue' }],
    calcuteType: [{ text: 'typeText', value: 'typeValue' }],
  };

  const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});

  afterAll(() => {
    errorSpy.mockRestore();
    warnSpy.mockRestore();
  });

  it('render correctly', () => {
    const onChange = jest.fn();
    const onSubmit = jest.fn();
    const onSpecificationInputBlur = jest.fn();
    const wrapper = mount(
      <StockAndShipment
        onChange={onChange}
        onSubmit={onSubmit}
        formData={formData}
        formOptions={formOptions}
        onSpecificationInputBlur={onSpecificationInputBlur}
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('AppBar should work', () => {
    const onChange = jest.fn();
    const onSubmit = jest.fn();
    const onSpecificationInputBlur = jest.fn();
    const wrapper: any = mount(
      <StockAndShipment
        onChange={onChange}
        onSubmit={onSubmit}
        formData={formData}
        formOptions={formOptions}
        onSpecificationInputBlur={onSpecificationInputBlur}
      />,
    );
    expect(wrapper.find('h6').text()).toBe('入库');
    wrapper
      .find('ForwardRef(AppBar)')
      .find('button')
      .props()
      .onClick({ text: '', value: '' }, 'type');
    expect(onChange).toHaveBeenCalledWith({ text: '', value: '' }, 'type');
    wrapper.setProps({ formData: Object.assign({}, formData, { type: 1 }) });
    expect(wrapper.find('h6').text()).toBe('出库');
  });

  it('Select of calcuteType', () => {
    const onChange = jest.fn();
    const onSubmit = jest.fn();
    const onSpecificationInputBlur = jest.fn();
    const wrapper: any = mount(
      <StockAndShipment
        onChange={onChange}
        onSubmit={onSubmit}
        formData={formData}
        formOptions={formOptions}
        onSpecificationInputBlur={onSpecificationInputBlur}
      />,
    );
    expect(wrapper.find('ForwardRef(Select)').props().value).toBe(0);
    wrapper
      .find('ForwardRef(Select)')
      .props()
      .onChange(null, { props: { children: 'test1', value: 1 } });
    expect(onChange).toHaveBeenCalledWith(
      {
        text: 'test1',
        value: 1,
      },
      'select',
    );
    wrapper.setProps({ formData: Object.assign({}, formData, { calcuteType: 1 }) });
    expect(wrapper.find('ForwardRef(Select)').props().value).toBe(1);
  });

  it('renderSpecification', () => {
    const onChange = jest.fn();
    const onSubmit = jest.fn();
    const onSpecificationInputBlur = jest.fn();
    const wrapper: any = mount(
      <StockAndShipment
        onChange={onChange}
        onSubmit={onSubmit}
        formData={formData}
        formOptions={formOptions}
        onSpecificationInputBlur={onSpecificationInputBlur}
      />,
    );
    expect(
      wrapper
        .find('label')
        .at(1)
        .text(),
    ).toBe('长 *');
    expect(
      wrapper
        .find('label')
        .at(2)
        .text(),
    ).toBe('高 *');
    expect(wrapper.find('label')).toHaveLength(9);

    wrapper
      .find('ForwardRef(Input)')
      .at(1)
      .props()
      .onChange({ target: { value: 1000 }, key: 'length' });
    expect(onChange).toHaveBeenCalledWith({ text: 1000, value: 1000 }, 'input', 'length');
    wrapper
      .find('ForwardRef(Input)')
      .at(2)
      .props()
      .onChange({ target: { value: 999 }, key: 'height' });
    expect(onChange).toHaveBeenCalledWith({ text: 999, value: 999 }, 'input', 'height');

    wrapper.setProps({ formData: Object.assign({}, formData, { calcuteType: 1 }) });
    expect(
      wrapper
        .find('label')
        .at(1)
        .text(),
    ).toBe('长 *');
    expect(
      wrapper
        .find('label')
        .at(2)
        .text(),
    ).toBe('宽 *');
    expect(
      wrapper
        .find('label')
        .at(3)
        .text(),
    ).toBe('高 *');
    expect(wrapper.find('label')).toHaveLength(10);

    wrapper
      .find('ForwardRef(Input)')
      .at(1)
      .props()
      .onChange({ target: { value: 1000 }, key: 'length' });
    expect(onChange).toHaveBeenCalledWith({ text: 1000, value: 1000 }, 'input', 'length');
    wrapper
      .find('ForwardRef(Input)')
      .at(2)
      .props()
      .onChange({ target: { value: 999 }, key: 'width' });
    expect(onChange).toHaveBeenCalledWith({ text: 999, value: 999 }, 'input', 'width');
    wrapper
      .find('ForwardRef(Input)')
      .at(3)
      .props()
      .onChange({ target: { value: 998 }, key: 'height' });
    expect(onChange).toHaveBeenCalledWith({ text: 998, value: 998 }, 'input', 'height');

    wrapper.setProps({ formData: Object.assign({}, formData, { calcuteType: 2 }) });
    expect(wrapper.find('label')).toHaveLength(6);
  });

  it('inputs', () => {
    const onChange = jest.fn();
    const onSubmit = jest.fn();
    const onSpecificationInputBlur = jest.fn();
    const wrapper: any = mount(
      <StockAndShipment
        onChange={onChange}
        onSubmit={onSubmit}
        formData={formData}
        formOptions={formOptions}
        onSpecificationInputBlur={onSpecificationInputBlur}
      />,
    );
    wrapper
      .find('ForwardRef(Input)')
      .at(3)
      .props()
      .onChange({ target: { value: 997 }, key: 'weight' });
    expect(onChange).toHaveBeenCalledWith({ text: 997, value: 997 }, 'input', 'weight');

    wrapper
      .find('ForwardRef(Input)')
      .at(4)
      .props()
      .onChange({ target: { value: 996 }, key: 'materialCost' });
    expect(onChange).toHaveBeenCalledWith({ text: 996, value: 996 }, 'input', 'materialCost');
  });
});
