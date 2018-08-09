import React from 'react';
import { shallow } from 'enzyme';
import Header from './index';

describe('Tests header component', () => {
  it('matches snapshot', () => {
    const comp = shallow(<Header />);
    expect(comp).toMatchSnapshot();
  });
});
