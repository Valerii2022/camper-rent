import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAdverts, fetchTotalAdverts } from 'redux/operations';
import css from './HomePage.module.css';
import { Sidebar } from 'components/Sidebar/Sidebar';

import { getAdverts, getFavourites, getFilters } from 'redux/selectors';
import { AdvertsList } from 'components/AdvertsList/AdvertsList';

export const Favourites = () => {
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const { totalAdverts } = useSelector(getAdverts);
  const { location, type, equipment, transmission } = useSelector(getFilters);
  const favourites = useSelector(getFavourites);
  const favouritesItems = totalAdverts.filter(el => {
    return favourites.includes(el._id);
  });

  const end = 4 * page;

  const favouritesForPagination = favouritesItems.slice(0, end);

  const typeFilteredAdverts = favouritesForPagination.filter(
    el => el.form === type
  );
  // const locationFilteredAdverts = favouritesForPagination.filter(
  //   el => el.location === location
  // );

  useEffect(() => {
    dispatch(fetchTotalAdverts());
  }, []);

  useEffect(() => {
    // dispatch(fetchTotalAdverts());
    dispatch(fetchAdverts({ page, location, type, equipment, transmission }));
  }, [dispatch, location, page, type, equipment, transmission]);

  return (
    <div className={css.backgroundContainer}>
      <div className={`${css.catalog} container`}>
        <Sidebar setPage={setPage} />
        <AdvertsList
          adverts={
            typeFilteredAdverts.length !== 0
              ? typeFilteredAdverts
              : favouritesItems
          }
          page={page}
          setPage={setPage}
          limit={typeFilteredAdverts.length || favouritesItems.length}
        />
      </div>
    </div>
  );
};
