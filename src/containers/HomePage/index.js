import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchUserData } from '../../redux/actions/UserActions';
import './index.scss';

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
      <div className="HomePage">
        <div className="HomePage__content">
          <p className="HomePage__instruction">Enter your GitHub username:</p>
          <form>
            <input className="HomePage__input" type="text" placeholder="ex: lucasalmeida92" onChange={this._handleUsernameChange}/>
            <button className="button HomePage__load-button" onClick={this._handleLoadReposClick}>Load Repositories</button>
          </form>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
