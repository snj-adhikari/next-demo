import React from 'react';
import { PageData } from '../interfaces';
import  styles from '../styles/modules/_page-info.module.scss';

interface PageInfoProps {
  pageInfo: PageData;
}

const PageInfo: React.FC<PageInfoProps> = ({ pageInfo }) => {
  const pageInfoClassName = 'page-info';
  return (
    <div className={styles[pageInfoClassName]}>
      <h1 className={styles[pageInfoClassName +'__title']}>{pageInfo?.title}</h1>
      <p className={styles[pageInfoClassName +'__content']} data-testid="page-info-content">{pageInfo?.content}</p>
    </div>
  );
};

export default PageInfo;