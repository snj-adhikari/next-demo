import React, { useState, useCallback } from 'react';
import styles from  '../styles/modules/_light-box.module.scss';

interface LightboxProps {
  images: string[];
  alt: string;
}

const Lightbox: React.FC<LightboxProps> = ({ images, alt }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeLightbox = useCallback(() => {
    setIsOpen(false);
  }, []);

  const selectImage = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  const nextImage = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  }, [images.length]);

  const prevImage = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  }, [images.length]);

  const hasMultipleImages = images.length > 1;
  const isFirstImage = currentIndex === 0;
  const isLastImage = currentIndex === images.length - 1;

  if (!images || images.length === 0) {
    return null;
  }

  const lightboxClassName = 'lightbox';

  return (
    <div className={styles[lightboxClassName + '__container']}>
      <img
        src={images[0]}
        alt={alt}
        className={styles[lightboxClassName + '__thumbnail']}
        onClick={openLightbox}
      />

      {isOpen && (
        <div className={styles[lightboxClassName + '__overlay']} onClick={closeLightbox}>
          <div className={styles[lightboxClassName + '__content']} onClick={(e) => e.stopPropagation()}>
            <button className={styles[lightboxClassName + '__close-button']} onClick={closeLightbox}>
              &times;
            </button>

            {hasMultipleImages && (
              <button
                className={`${styles[lightboxClassName + '__prev-button']} ${isFirstImage ? styles[lightboxClassName + '__prev-button_hidden'] : ''}`}
                onClick={prevImage}
                disabled={isFirstImage}
              >
                &lt;
              </button>
            )}

            <img
              src={images[currentIndex]}
              alt={alt}
              className={styles[lightboxClassName + '__image']}
              data-testid="lightbox-image"
            />

            {hasMultipleImages && (
              <button
                className={`${styles[lightboxClassName + '__next-button']} ${isLastImage ? styles[lightboxClassName + '__next-button--hidden'] : ''}`}
                onClick={nextImage}
                disabled={isLastImage}
              >
                &gt;
              </button>
            )}

            {hasMultipleImages && (
              <div className={styles[lightboxClassName + '__thumbnails']}>
                {images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`${alt} - Thumbnail ${index + 1}`}
                    className={`${styles[lightboxClassName + '__thumbnail--small']} ${index === currentIndex ? styles[lightboxClassName + '__thumbnail--active'] : ''}`}
                    onClick={() => selectImage(index)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Lightbox;