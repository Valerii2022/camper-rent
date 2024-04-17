import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAdverts } from 'redux/operations';
import css from './HomePage.module.css';
import { Sidebar } from 'components/Sidebar/Sidebar';

import { getAdverts } from 'redux/selectors';
import { AdvertsList } from 'components/AdvertsList/AdvertsList';

export const Catalog = () => {
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const { items } = useSelector(getAdverts);

  useEffect(() => {
    dispatch(fetchAdverts({ page }));
  }, [dispatch, page]);

  return (
    <>
      <div className={`${css.catalog} container`}>
        <Sidebar />
        <AdvertsList adverts={items} page={page} setPage={setPage} />
      </div>
    </>
  );
};
