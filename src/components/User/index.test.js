/* eslint-disable no-unused-vars */
import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import { User } from './index';
import ConnectedUser from './index';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { removeUser } from '../../redux/actions/UserActions';

const mockStore = configureStore([thunk]);
let mockOnRemoveUser = jest.fn();
let wrapper;
let props = {
  user: {
    data: {
      avatar_url: 'jackguy.jpg',
      name: 'Jack Guy',
      login: 'jackguy',
    }
  },
  onRemoveUser: mockOnRemoveUser
};
let store = mockStore(props);

describe('User', () => {
  it('should render an image, a name, a login and a close button', () => {
    wrapper = shallow(
      <ConnectedUser store={store} />
    ).dive();
    expect(wrapper.find('img').props()).toHaveProperty('src', props.user.data.avatar_url);
    expect(wrapper.find('p').text()).toEqual(props.user.data.name);
    expect(wrapper.find('h3').text()).toEqual(props.user.data.login);
    expect(wrapper.find('a[title="Remove user"]')).toHaveLength(1);
  });

  describe('When the close button is clicked', () => {
    wrapper = shallow(
      <ConnectedUser store={store} onRemoveUser={mockOnRemoveUser} />
    ).dive();
    wrapper.find('a[title="Remove user"]').simulate('click', { preventDefault() {} });

    it('should call the mock onRemoveUser function', () => {
      expect(mockOnRemoveUser.mock.calls.length).toBe(1);
    });

    it('should dispatch REMOVE_USER and RESET_REPOSITORIES actions', () => {
      const actions = store.getActions();
      const expectedActions = [
        { type: 'REMOVE_USER' },
        { type: 'RESET_REPOSITORIES' }
      ]
      expect(actions).toEqual(expectedActions);
    });
  });

});
