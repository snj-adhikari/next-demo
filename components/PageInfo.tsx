import React from 'react';
import { PageData } from '../interfaces';
import '../styles/components/_page-info.module.scss';

interface PageInfoProps {
  pageInfo: PageData;
}

const PageInfo: React.FC<PageInfoProps> = ({ pageInfo }) => {
  return (
    <div className="page-info">
      <h1 className="page-info__title">{pageInfo?.title}</h1>
      <p className="page-info__content">{pageInfo?.content}</p>
    </div>
  );
};

export default PageInfo;