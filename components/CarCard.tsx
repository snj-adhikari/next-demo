import React from 'react';
import { Family } from '../interfaces';
import styles from  '../styles/modules/_car-card.module.scss';
import Lightbox from './LightBox';
import { formatPrice } from '../utils/helpers';

interface CarCardProps {
  family: Family;
}

const CarCard: React.FC<CarCardProps> = ({ family }) => {
  const minPriceText = formatPrice(family.familyPrice?.min);
  const maxPriceText = formatPrice(family.familyPrice?.max);
  const isPriceUnavailable = minPriceText === '' && maxPriceText === '';
  return (
    <div className={styles.carCard}>
      {family.baseVariantImages.length > 0 && (
        <Lightbox images={family.baseVariantImages} alt={family.title} />
      )}
      <div className={styles.carCard__content}>
        <h3 className={styles.carCard__title}>{family.title}</h3>
        
        <p className={styles.carCard__price}>
          Price:💰 {isPriceUnavailable ? 'Contact Dealer' : <span>{minPriceText} - {maxPriceText}</span>}
        </p>
      </div>
    </div>
  );
};

export default CarCard;