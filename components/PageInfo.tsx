import React from 'react';
import { PageData } from '../interfaces';
import  styles from '../styles/modules/_page-info.module.scss';

interface PageInfoProps {
  pageInfo: PageData;
}

const PageInfo: React.FC<PageInfoProps> = ({ pageInfo }) => {
  return (
    <div className={styles.pageInfo}>
      <h1 className={styles.pageInfo__title}>{pageInfo?.title}</h1>
      <p className={styles.pageInfo__content}>{pageInfo?.content}</p>
    </div>
  );
};

export default PageInfo;