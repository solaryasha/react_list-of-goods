import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Things } from '../Things/Things';
import { Select } from '../Select/Select';

export class GoodsList extends Component {
  state = {
    isShown: false,
    goods: this.props.things,
    selectedValue: '1',
  }

  clickHandler = () => {
    this.setState({ isShown: true });
  }

  reverseHandler = () => {
    this.setState(prevState => ({
      goods: [...prevState.goods].reverse(),
    }));
  }

  sortAlphabeticallyHandler = () => {
    this.setState(prevState => ({
      goods: [...prevState.goods].sort((a, b) => a.localeCompare(b)),
    }));
  }

  resetHandler = () => {
    const { things } = this.props;

    this.setState(() => ({
      goods: things,
      selectedValue: '1',
    }));
  }

  sortLengthHandler = () => {
    this.setState(prevState => ({
      goods: [...prevState.goods].sort((a, b) => a.length - b.length),
    }));
  }

  changeHandler = ({ target }) => {
    const { value } = target;
    const { things } = this.props;

    this.setState(() => ({
      goods: [...things].filter(thing => thing.length >= value),
      selectedValue: value,
    }));
  }

  render() {
    const { isShown, goods, selectedValue } = this.state;

    return (
      <>
        { isShown
          ? <Things content={goods} />
          : null
        }
        { !isShown
          ? <button type="button" onClick={this.clickHandler}>Show list</button>
          : null
        }
        <button type="button" onClick={this.reverseHandler}>Reverse</button>
        <button type="button" onClick={this.sortAlphabeticallyHandler}>
          Sort alphabetically
        </button>
        <button type="button" onClick={this.resetHandler}>
          Reset
        </button>
        <button type="button" onClick={this.sortLengthHandler}>
          Sort by length
        </button>
        <Select
          onChange={this.changeHandler}
          value={selectedValue}
        />
      </>
    );
  }
}

GoodsList.propTypes = {
  things: PropTypes.arrayOf(PropTypes.string).isRequired,
};
