import React from 'react';
import { shallow } from 'enzyme';
import LoginInput from './index';

describe('Tests login input component', () => {
  it('matches snapshot', () => {
    const comp = shallow(<LoginInput />);
    expect(comp).toMatchSnapshot();
  });
});
