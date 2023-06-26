import React, { Component } from 'react';
import axios from 'axios';
import Searchbar from './components/Searchbar/Searchbar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Button from './components/Button/Button';
import Loader from './components/Loader/Loader';
import Modal from './components/Modal/Modal';
import css from 'App.module.css';
const API_KEY = '35858797-639b225fbbec7c1b27496629b';

class App extends Component {
  state = {
    searchQuery: '',
    images: [],
    isLoading: false,
    selectedImage: null,
    page: 1,
    error: null,
  };

  handleSubmit = query => {
    this.setState({ searchQuery: query, images: [], page: 1 });
  };

  handleImageClick = image => {
    this.setState({ selectedImage: image });
  };

  handleLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  async componentDidUpdate(prevProps, prevState) {
    const { searchQuery, page } = this.state;

    if (prevState.searchQuery !== searchQuery || prevState.page !== page) {
      this.setState({ isLoading: true });

      try {
        const response = await axios.get('https://pixabay.com/api/', {
          params: {
            q: searchQuery,
            page: page,
            key: API_KEY,
            image_type: 'photo',
            orientation: 'horizontal',
            per_page: 12,
          },
        });

        this.setState(prevState => ({
          images: [...prevState.images, ...response.data.hits],
          isLoading: false,
        }));
      } catch (error) {
        this.setState({ error });
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  render() {
    const { images, isLoading, selectedImage, error } = this.state;
    if (error) {
      return <div>Oops, something went wrong</div>;
    }

    return (
      <div className={css.App}>
        <Searchbar onSubmit={this.handleSubmit} />

        {images.length > 0 && (
          <ImageGallery images={images} onImageClick={this.handleImageClick} />
        )}
        {isLoading && <Loader />}
        {images.length > 0 && !isLoading && (
          <Button onClick={this.handleLoadMore} />
        )}

        {selectedImage && (
          <Modal
            image={selectedImage}
            onClose={() => this.setState({ selectedImage: null })}
          />
        )}
      </div>
    );
  }
}

export default App;
