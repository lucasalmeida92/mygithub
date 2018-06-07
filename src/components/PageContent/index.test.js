/* eslint-disable no-unused-vars */
import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import PageContent from './index';

describe('PageContent', () => {
  it('should render a PageContent without any children', () => {
    const wrapper = shallow(
      <PageContent></PageContent>
    );
    expect(wrapper.find('div').children().children()).toHaveLength(0);
  });
  it('should render a PageContent with a <p> element', () => {
    const content = <p>Some content</p>;
    const wrapper = shallow(
      <PageContent>{ content }</PageContent>
    );
    expect(wrapper.contains(content)).toEqual(true);
    expect(wrapper.find('div').children()).toHaveLength(2);
  });
});
