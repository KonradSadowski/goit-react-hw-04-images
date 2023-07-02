import React, { useEffect } from 'react';
import css from './Modal.module.css';

const Modal = ({ image, onClose }) => {
  useEffect(() => {
    const handleKeyDown = event => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const handleClick = event => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={css.Overlay} onClick={handleClick} tabIndex={0}>
      <div className={css.Modal}>
        <img src={image.largeImageURL} alt="" />
      </div>
    </div>
  );
};

export default Modal;
