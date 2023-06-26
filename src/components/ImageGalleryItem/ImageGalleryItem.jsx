import React, { Component } from 'react';
import css from './ImageGalleryItem.module.css';
class ImageGalleryItem extends Component {
  handleClick = () => {
    this.props.onImageClick(this.props.image);
  };

  render() {
    const { image } = this.props;

    return (
      <li className={css.ImageGalleryItem}>
        <img
          className={css.ImageGalleryItemImg}
          src={image.webformatURL}
          alt=""
          onClick={this.handleClick}
        />
      </li>
    );
  }
}

export default ImageGalleryItem;
