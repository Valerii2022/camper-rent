import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAdverts } from 'redux/operations';
import css from './HomePage.module.css';
import { Sidebar } from 'components/Sidebar/Sidebar';

import { getAdverts, getFavourites } from 'redux/selectors';
import { AdvertsList } from 'components/AdvertsList/AdvertsList';

export const Favourites = () => {
  const dispatch = useDispatch();
  const { items } = useSelector(getAdverts);
  const favourites = useSelector(getFavourites);
  const favouritesItems = items.filter(el => {
    return favourites.includes(el._id);
  });

  useEffect(() => {
    dispatch(fetchAdverts());
  }, [dispatch]);

  return (
    <>
      <div className={`${css.catalog} container`}>
        <Sidebar />
        <AdvertsList adverts={favouritesItems} />
      </div>
    </>
  );
};
