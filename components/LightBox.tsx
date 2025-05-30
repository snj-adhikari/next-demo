import React, { useState, useCallback } from 'react';
import styles from  '../styles/components/_light-box.module.scss';

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

  return (
    <div className={styles.lightbox__container}>
      <img
        src={images[0]}
        alt={alt}
        className={styles.lightbox__thumbnail}
        onClick={openLightbox}
      />

      {isOpen && (
        <div className={styles.lightbox__overlay} onClick={closeLightbox}>
          <div className={styles.lightbox__content} onClick={(e) => e.stopPropagation()}>
            <button className={styles.lightbox__closeButton} onClick={closeLightbox}>
              &times;
            </button>

            {hasMultipleImages && (
              <button
                className={`${styles.lightbox__prevButton} ${isFirstImage ? styles.lightbox__prevButton_hidden : ''}`}
                onClick={prevImage}
                disabled={isFirstImage}
              >
                &lt;
              </button>
            )}

            <img src={images[currentIndex]} alt={alt} className={styles.lightbox__image} />

            {hasMultipleImages && (
              <button
                className={`${styles.lightbox__nextButton} ${isLastImage ? styles.lightbox__nextButton_hidden : ''}`}
                onClick={nextImage}
                disabled={isLastImage}
              >
                &gt;
              </button>
            )}

            {hasMultipleImages && (
              <div className={styles.lightbox__thumbnails}>
                {images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`${alt} - Thumbnail ${index + 1}`}
                    className={`${styles.lightbox__thumbnail_small} ${index === currentIndex ? styles.lightbox__thumbnail_active : ''}`}
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