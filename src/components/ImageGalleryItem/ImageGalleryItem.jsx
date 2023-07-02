import React from 'react';
import css from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ image, onImageClick }) => {
  const handleClick = () => {
    onImageClick(image);
  };

  return (
    <li className={css.ImageGalleryItem}>
      <img
        className={css.ImageGalleryItemImg}
        src={image.webformatURL}
        alt=""
        onClick={handleClick}
      />
    </li>
  );
};

export default ImageGalleryItem;
