import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAdverts, fetchTotalAdverts } from 'redux/operations';
import css from './HomePage.module.css';
import { Sidebar } from 'components/Sidebar/Sidebar';

import { getAdverts, getFilters } from 'redux/selectors';
import { AdvertsList } from 'components/AdvertsList/AdvertsList';

export const Catalog = () => {
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const { items } = useSelector(getAdverts);
  const { totalAdverts } = useSelector(getAdverts);
  const { location, type, equipment, transmission } = useSelector(getFilters);

  useEffect(() => {
    dispatch(fetchTotalAdverts());
  }, []);

  useEffect(() => {
    // dispatch(fetchTotalAdverts());
    dispatch(fetchAdverts({ page, location, type, equipment, transmission }));
  }, [dispatch, location, page, type, equipment, transmission]);

  const typeFilteredAdverts = totalAdverts.filter(el => el.form === type);
  const locationFilteredAdverts = totalAdverts.filter(
    el => el.location === location
  );

  return (
    <div className={css.backgroundContainer}>
      <div className={`${css.catalog} container`}>
        <Sidebar setPage={setPage} />
        <AdvertsList
          adverts={items}
          page={page}
          setPage={setPage}
          limit={
            typeFilteredAdverts.length || locationFilteredAdverts.length || 13
          }
        />
      </div>
    </div>
  );
};
