import React from 'react';
import s from './index.scss';

export default props => (
  <div className={s.wrapper}>
    <h3 className={s.name}>{props.repo.name}</h3>
    <p className={s.description}>{props.repo.description}</p>
  </div>
);
