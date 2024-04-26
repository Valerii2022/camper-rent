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
  const { location, type, equipment, transmission } = useSelector(getFilters);

  useEffect(() => {
    dispatch(
      fetchAdverts({ page, location, type, equipment, transmission, limit: 4 })
    );
  }, [dispatch, location, page, type, equipment, transmission]);

  return (
    <div className={css.backgroundContainer}>
      <div className={`${css.catalog} container`}>
        <Sidebar setPage={setPage} />
        <AdvertsList
          adverts={items}
          page={page}
          setPage={setPage}
          limit={items.length < 4 ? items.length : totalAdvertsCount}
        />
      </div>
    </div>
  );
};
