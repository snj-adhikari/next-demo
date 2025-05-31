import React from 'react';
import { Family } from '../interfaces';
import styles from  '../styles/modules/_car-card.module.scss';
import Lightbox from './LightBox';
import { formatPrice } from '../utils/helpers';

interface CarCardProps {
  family: Family;
}

const CarCard: React.FC<CarCardProps> = ({ family }) => {
  return (
    <div className={styles.carCard}>
      <div className={styles.carCard__content}>
        <h3 className={styles.carCard__title}>{family.title}</h3>
        
        <p className={styles.carCard__price}>
          Price 💰: <span>${formatPrice(family.familyPrice?.min)} - ${formatPrice(family.familyPrice?.max)}</span> 
        </p>
      </div>
      {family.baseVariantImages.length > 0 && (
        <Lightbox images={family.baseVariantImages} alt={family.title} />
      )}
     
    </div>
  );
};

export default CarCard;