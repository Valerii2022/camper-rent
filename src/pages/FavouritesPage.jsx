import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAdverts } from 'redux/operations';
import css from './HomePage.module.css';
import { Sidebar } from 'components/Sidebar/Sidebar';
import { getAdverts, getFavourites, getFilters } from 'redux/selectors';
import { AdvertsList } from 'components/AdvertsList/AdvertsList';

export const Favourites = () => {
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const { items } = useSelector(getAdverts);
  const { location, type, equipment, transmission } = useSelector(getFilters);
  const favourites = useSelector(getFavourites);
  const favouritesItems = items.filter(el => {
    return favourites.includes(el._id);
  });

  const end = 4 * page;

  useEffect(() => {
    dispatch(
      fetchAdverts({ page, location, type, equipment, transmission, limit: 13 })
    );
  }, [dispatch, location, page, type, equipment, transmission]);

  return (
    <div className={css.backgroundContainer}>
      <div className={`${css.catalog} container`}>
        <Sidebar setPage={setPage} />
        <AdvertsList
          adverts={favouritesItems.slice(0, end)}
          page={page}
          setPage={setPage}
          limit={favouritesItems.length}
        />
      </div>
    </div>
  );
};
