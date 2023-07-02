import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Searchbar from './components/Searchbar/Searchbar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Button from './components/Button/Button';
import Loader from './components/Loader/Loader';
import Modal from './components/Modal/Modal';
import css from 'App.module.css';

const API_KEY = '35858797-639b225fbbec7c1b27496629b';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);

  const handleSubmit = query => {
    setSearchQuery(query);
    setImages([]);
    setPage(1);
  };

  const handleImageClick = image => {
    setSelectedImage(image);
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (searchQuery === '') return;

      setIsLoading(true);

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

        setImages(prevImages => [...prevImages, ...response.data.hits]);
        setIsLoading(false);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [searchQuery, page]);

  if (error) {
    return <div>Oops, something went wrong</div>;
  }

  return (
    <div className={css.App}>
      <Searchbar onSubmit={handleSubmit} />

      {images.length > 0 && (
        <ImageGallery images={images} onImageClick={handleImageClick} />
      )}
      {isLoading && <Loader />}
      {images.length > 0 && !isLoading && <Button onClick={handleLoadMore} />}

      {selectedImage && (
        <Modal image={selectedImage} onClose={() => setSelectedImage(null)} />
      )}
    </div>
  );
};

export default App;
