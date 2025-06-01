import React from 'react';
import { Car, PageData } from "../interfaces";
import PageInfo from "./PageInfo";
import CarList from "./CarList";
import styles from '../styles/modules/_page-template.module.scss';

interface PageTemplateProps {
  pageInfo?: PageData;
  cars?: Car[];
}
const PageTemplate: React.FC<PageTemplateProps> = ({ pageInfo, cars }) => {
  return (
    <div className={styles.pageTemplate}>
      <PageInfo pageInfo={pageInfo} />
      <CarList cars={cars} />
    </div>
  );
};

export default PageTemplate;