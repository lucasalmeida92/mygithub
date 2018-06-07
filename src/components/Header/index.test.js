/* eslint-disable no-unused-vars */
import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import Header from './index';

describe('Header', () => {
  it('should be a <h1> element', () => {
    const wrapper = shallow(
      <Header />
    );
    expect(wrapper.find('h1')).toHaveLength(1);
  });
});


