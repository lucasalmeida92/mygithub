/* eslint-disable no-unused-vars */

import React from 'react';
import ReactDOM from 'react-dom';
import * as TestUtils from 'react-dom/test-utils';
import Header from './index';

it('creates a header element with Header class', () => {
  // Render a Header in the document
  const header = TestUtils.renderIntoDocument(
    <Header />
  );
  const headerNode = ReactDOM.findDOMNode(header);
  // Verify that className equals 'Header'
  expect(headerNode.className).toEqual('Header');
});
