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
  const cardClassName = 'car-card';
  return (
    <div className={styles[cardClassName]}>
      {family.baseVariantImages.length > 0 && (
        <Lightbox images={family.baseVariantImages} alt={family.title} />
      )}
      <div className={styles[cardClassName+'__content']}>
        <h3 className={styles[cardClassName+'__title']}>{family.title}</h3>
        
        <p className={styles[cardClassName+'__price']}>
          Price:💰 {isPriceUnavailable ? 'Contact Dealer' : <span>{minPriceText} - {maxPriceText}</span>}
        </p>
      </div>
    </div>
  );
};

export default CarCard;