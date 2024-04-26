import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAdverts } from 'redux/operations';
import css from './HomePage.module.css';
import { Sidebar } from 'components/Sidebar/Sidebar';

import { getAdverts, getFilters } from 'redux/selectors';
import { AdvertsList } from 'components/AdvertsList/AdvertsList';

export const Catalog = () => {
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const { items } = useSelector(getAdverts);
  const { totalAdvertsCount } = useSelector(getAdverts);
  let filteredAdverts = [];
  let limit = totalAdvertsCount;

  const { equipment } = useSelector(getFilters);
  if (equipment) {
    const isPositive = (obj, keys) => {
      return keys.every(key => {
        return obj.details[key] > 0;
      });
    };

    filteredAdverts = items.filter(obj => {
      return isPositive(obj, equipment);
    });
    limit = filteredAdverts.length;
  }

  useEffect(() => {
    dispatch(fetchAdverts({ page, limit: 4 }));
  }, [dispatch, page]);

  return (
    <div className={css.backgroundContainer}>
      <div className={`${css.catalog} container`}>
        <Sidebar setPage={setPage} />
        <AdvertsList
          adverts={equipment ? filteredAdverts : items}
          page={page}
          setPage={setPage}
          limit={items.length < 4 ? items.length : limit}
        />
      </div>
    </div>
  );
};
