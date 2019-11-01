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
});
