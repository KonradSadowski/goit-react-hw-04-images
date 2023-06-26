import React, { Component } from 'react';
import css from './Modal.module.css';
class Modal extends Component {
  handleKeyDown = event => {
    if (event.key === 'Escape') {
      this.props.onClose();
    }
  };

  handleClick = event => {
    if (event.target === event.currentTarget) {
      this.props.onClose();
    }
  };

  render() {
    const { image } = this.props;

    return (
      <div
        className={css.Overlay}
        onClick={this.handleClick}
        onKeyDown={this.handleKeyDown}
        tabIndex={0}
      >
        <div className={css.Modal}>
          <img src={image.largeImageURL} alt="" />
        </div>
      </div>
    );
  }
}

export default Modal;
