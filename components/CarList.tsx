import React from 'react';
import { Car } from '../interfaces';
import CarCard from './CarCard';
import styles from '../styles/components/_car-list.module.scss';

interface CarListProps {
  cars: Car[];
}

const CarList: React.FC<CarListProps> = ({ cars }) => {
  return (
    <div className={styles.carList}>
      {cars?.map((car) => (
        <div key={car.uuid} className={styles.carList__make}>
          <h2 className={styles.carList__makeTitle}>{car.title}</h2>
          <div className={styles.carList__families}>
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