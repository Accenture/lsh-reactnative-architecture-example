import React from 'react';
import { shallow } from 'enzyme';
import Loader from './index';

describe('Tests loader component', () => {
  it('matches snapshot', () => {
    const comp = shallow(<Loader />);
    expect(comp).toMatchSnapshot();
  });
});
