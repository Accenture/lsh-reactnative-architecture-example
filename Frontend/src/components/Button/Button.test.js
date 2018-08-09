import React from 'react';
import { shallow } from 'enzyme';
import Button from './index';

describe('Tests button component', () => {
  it('matches snapshot', () => {
    const comp = shallow(<Button />);
    expect(comp).toMatchSnapshot();
  });
});
