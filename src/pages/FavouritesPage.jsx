import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAdverts, fetchTotalAdverts } from 'redux/operations';
import css from './HomePage.module.css';
import { Sidebar } from 'components/Sidebar/Sidebar';

import { getAdverts, getFavourites } from 'redux/selectors';
import { AdvertsList } from 'components/AdvertsList/AdvertsList';

export const Favourites = () => {
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const { items } = useSelector(getAdverts);
  const favourites = useSelector(getFavourites);
  const favouritesItems = items.filter(el => {
    return favourites.includes(el._id);
  });

  useEffect(() => {
    dispatch(fetchTotalAdverts());
    dispatch(fetchAdverts({ page }));
  }, [dispatch, page]);

  return (
    <>
      <div className={`${css.catalog} container`}>
        <Sidebar />
        <AdvertsList adverts={favouritesItems} page={page} setPage={setPage} />
      </div>
    </>
  );
};
