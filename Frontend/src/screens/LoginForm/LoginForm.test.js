import React from 'react';
import { shallow } from 'enzyme';
import LoginForm from './index';

describe('Tests login form component', () => {
  const store = {
    loginStore: {
      email: '',
      password: '',
      jwtToken: '',
    },
    languageStore: {
      key: 1,
    },
  };
  it('matches snapshot', () => {
    const comp = shallow(<LoginForm.wrappedComponent {...store} />);
    expect(comp).toMatchSnapshot();
  });
});
