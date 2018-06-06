import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { filterRepositories } from '../../../redux/actions/RepositoriesActions';
import s from './index.scss';

const mapStateToProps = (state, props) => ({
  filters: state.repositories.filters
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    filterRepositories,
  }, dispatch);
};

class Filters extends Component {
  constructor(props) {
    super(props);

    const { filters } = this.props;
    this.state = {
      filters: {
        orderBy: filters.orderBy,
        stars: {
          count: filters.stars.count,
          operation: 'min'
        }
      }
    };

    this._handleMinStarsChange = this._handleMinStarsChange.bind(this);
    this._handleOrderByChange = this._handleOrderByChange.bind(this);
    this._applyFilters = this._applyFilters.bind(this);
  }

  _handleMinStarsChange(e) {
    const value = e.target.value;
    this.setState({
      filters: {
        stars: {
          count: parseInt(e.target.value),
          operation: 'min'
        }
      }
    });
  }

  _handleOrderByChange(e) {
    const value = e.target.value;
    this.setState({
      filters: {
        orderBy: value
      }
    });
  }

  _applyFilters(e) {
    e.preventDefault();
    this.props.filterRepositories(this.state.filters);
  }

  render() {
    let { filters } = this.props;

    return (
      <form className={s.wrapper}>
        <label>
          <span className={s.fieldLegend}>Order by:</span>
          <select className={s.select} onChange={this._handleOrderByChange}>
            <option value="first_modified">First modified</option>
            <option selected value="last_modified">Last modified</option>
            <option value="name_asc">Name (ascending)</option>
            <option value="name_desc">Name (descending)</option>
            <option value="stars_asc">Stars (ascending)</option>
            <option value="stars_desc">Stars (descending)</option>
          </select>
        </label>
        <label>
          <span className={s.fieldLegend}>Min. of stars:</span>
          <input className={s.input} type="number" placeholder="0" onChange={this._handleMinStarsChange} />
        </label>
        <button className={`button button--small ${s.applyButton}`} onClick={this._applyFilters}>Apply Filters</button>
      </form>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Filters);
