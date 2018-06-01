import React, { Component } from 'react';
import FA from 'react-fontawesome';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { removeUser } from '../../redux/actions/UserActions';
import { resetRepositories } from '../../redux/actions/RepositoriesActions';
import './index.scss';

const mapStateToProps = (state, props) => ({
  user: state.user
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    removeUser,
    resetRepositories
  }, dispatch);
};

class User extends Component {
  constructor(props) {
    super(props);

    this.handleCloseButton = this.handleCloseButton.bind(this);
  }

  handleCloseButton(e) {
    e.preventDefault();
    this.props.removeUser();
    this.props.resetRepositories();
  }

  render() {
    const data = this.props.user.data;

    if(data) {
      return (
        <div className="User">
          <div className="User__wrapper">
            <img className="User__avatar" src={data.avatar_url} alt={data.name} />
            <div className="User__right">
              <h3 className="User__username">{ data.login }</h3>
              <p className="User__name">{ data.name }</p>
            </div>
            <a className="User__close-button" href="javascript:void(0)" title="Remove user" onClick={this.handleCloseButton}>X</a>
          </div>
        </div>
      );
    } else {
      return null;
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(User);

