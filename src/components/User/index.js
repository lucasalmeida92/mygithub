import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { removeUser } from '../../redux/actions/UserActions';
import { resetRepositories } from '../../redux/actions/RepositoriesActions';
import s from './index.scss';

const mapStateToProps = (state, props) => ({
  user: state.user
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    removeUser,
    resetRepositories
  }, dispatch);
};

export class User extends Component {
  constructor(props) {
    super(props);

    this.handleCloseButton = this.handleCloseButton.bind(this);
  }

  handleCloseButton(e) {
    e.preventDefault();
    this.props.removeUser();
    this.props.resetRepositories();
    this.props.onRemoveUser && this.props.onRemoveUser();
  }

  render() {
    const data = this.props.user.data;

    if(data) {
      return (
        <div className={s.user}>
          <div className={s.wrapper}>
            <img className={s.avatar} src={data.avatar_url} alt={data.name} />
            <div className={s.right}>
              <h3 className={s.username}>{ data.login }</h3>
              <p className={s.name}>{ data.name }</p>
            </div>
            <a className={s.closeButton} href="javascript:void(0)" title="Remove user" onClick={this.handleCloseButton}>X</a>
          </div>
        </div>
      );
    } else {
      return null;
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(User);

