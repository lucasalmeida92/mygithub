import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchUserData } from '../../redux/actions/UserActions';
import s from './index.scss';

const mapStateToProps = (state, props) => ({
  user: state.user
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    fetchUserData
  }, dispatch);
};

class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: ''
    };

    this._handleUsernameChange = this._handleUsernameChange.bind(this);
    this._handleLoadReposClick = this._handleLoadReposClick.bind(this);
  }

  _handleUsernameChange(e) {
    const value = e.target.value;
    this.setState({ username: value });
  }

  _handleLoadReposClick(e) {
    e.preventDefault();
    const username = this.state.username;
    if(username.length > 0) {
      this.props.fetchUserData(username);
      this.props.history.push(`/${username}`);
    }
  }

  render() {
    return (
      <div className={s.content}>
        <p className={s.instruction}>Enter your GitHub username:</p>
        <form>
          <input className={s.input} type="text" placeholder="ex: lucasalmeida92" onChange={this._handleUsernameChange}/>
          <button className={`button ${s.loadButton}`} onClick={this._handleLoadReposClick}>Load Repositories</button>
        </form>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
