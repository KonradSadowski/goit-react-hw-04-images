import React from 'react';
import css from './Button.module.css';

const Button = ({ onClick }) => {
  return (
    <button type="button" className={css.LoadMoreButton} onClick={onClick}>
      Load more
    </button>
  );
};

export default Button;
