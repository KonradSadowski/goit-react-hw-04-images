import React, { Component } from 'react';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';
class ImageGallery extends Component {
  render() {
    const { images, onImageClick } = this.props;

    return (
      <ul className={css.ImageGallery}>
        {images.map(image => (
          <ImageGalleryItem
            key={image.id}
            image={image}
            onImageClick={onImageClick}
          />
        ))}
      </ul>
    );
  }
}

export default ImageGallery;
