import React from 'react';
import { shallow } from 'enzyme';
import CardSection from './index';

describe('Tests card section component', () => {
  it('matches snapshot', () => {
    const comp = shallow(<CardSection />);
    expect(comp).toMatchSnapshot();
  });
});
