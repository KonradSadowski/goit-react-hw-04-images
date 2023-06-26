import React, { Component } from 'react';
import css from './Button.module.css';
class Button extends Component {
  render() {
    const { onClick } = this.props;

    return (
      <button type="button" className={css.LoadMoreButton} onClick={onClick}>
        Load more
      </button>
    );
  }
}

export default Button;
