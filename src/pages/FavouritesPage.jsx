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
  const favourites = useSelector(getFavourites);
  const favouritesItems = items.filter(el => {
    return favourites.includes(el._id);
  });
  const { totalAdvertsCount } = useSelector(getAdverts);
  const { equipment } = useSelector(getFilters);

  const end = 4 * page;

  let filteredAdverts = [];
  let limit = totalAdvertsCount;

  if (equipment) {
    const isPositive = (obj, keys) => {
      return keys.every(key => {
        return obj.details[key] > 0;
      });
    };

    filteredAdverts = favouritesItems.filter(obj => {
      return isPositive(obj, equipment);
    });
    limit = filteredAdverts.length;
  }

  useEffect(() => {
    dispatch(fetchAdverts({ page: 1, limit: 13 }));
  }, [dispatch]);

  return (
    <div className={css.backgroundContainer}>
      <div className={`${css.catalog} container`}>
        <Sidebar setPage={setPage} />
        <AdvertsList
          adverts={
            equipment
              ? filteredAdverts.slice(0, end)
              : favouritesItems.slice(0, end)
          }
          page={page}
          setPage={setPage}
          limit={favouritesItems.length < 4 ? favouritesItems.length : limit}
        />
      </div>
    </div>
  );
};
