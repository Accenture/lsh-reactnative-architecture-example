import React from 'react';
import { shallow } from 'enzyme';
import Card from './index';

describe('Tests card component', () => {
  it('matches snapshot', () => {
    const comp = shallow(<Card />);
    expect(comp).toMatchSnapshot();
  });
});
