import React from 'react';
import { Car } from '../interfaces';
import CarCard from './CarCard';
import styles from '../styles/modules/_car-list.module.scss';

interface CarListProps {
  cars: Car[];
}

const CarList: React.FC<CarListProps> = ({ cars }) => {
  const carListClassName = 'car-list';
  return (
    <div className={styles[carListClassName]}>
      {cars?.map((car) => (
        <div key={car.uuid} className={styles[carListClassName + '__make']}>
          <h2 className={styles[carListClassName + '__make-title']}>{car.title}</h2>
          <div className={styles[carListClassName + '__families']}>
            {car.families.map((family) => (
              <CarCard key={family.uuid} family={family} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CarList;