import css from './Sidebar.module.css';
import { ReactComponent as ACIcon } from '../../image/AC.svg';
import { ReactComponent as GearIcon } from '../../image/gear.svg';
import { ReactComponent as FoodIcon } from '../../image/food.svg';
import { ReactComponent as TVIcon } from '../../image/TV.svg';
import { ReactComponent as ShowerIcon } from '../../image/shower.svg';
import { ReactComponent as VanIcon } from '../../image/van-option.svg';
import { ReactComponent as IntegratedIcon } from '../../image/integrated.svg';
import { ReactComponent as AlcoveIcon } from '../../image/alcove.svg';
import { ReactComponent as LocationIcon } from '../../image/location.svg';
import { SelectLocation } from 'components/SelectLocation/SelectLocation';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addFilter } from 'redux/favouritesSlise';
import { fetchAdverts } from 'redux/operations';
import { Button } from 'components/Button/Button';

export const Sidebar = ({ setPage }) => {
  const [location, setLocation] = useState('');
  const [type, setType] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      addFilter({ location: '', type: '', equipment: [], transmission: '' })
    );
  }, []);

  const handleChangeRadioBtn = e => {
    const { id } = e.target;
    setType(id);
  };

  const handleSubmitForm = e => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = [];
    let transmission = '';
    formData.forEach((_, key) => {
      if (key !== 'type' && key !== 'automatic') {
        data.push(key);
      }
      if (key === 'automatic') {
        transmission = key;
      }
    });
    setPage(1);
    dispatch(addFilter({ location, type, equipment: data, transmission }));
    dispatch(fetchAdverts({ page: 1, location, type, transmission }));
  };

  return (
    <aside className={css.sidebar}>
      <form onSubmit={handleSubmitForm}>
        <label className={css.locationLabel}>
          Location
          <LocationIcon width="18" height="20" className={css.locationIcon} />
          <SelectLocation locationChanging={setLocation} />
        </label>
        <h2 className={css.title}>Filters</h2>
        <div className={css.optionWrapper}>
          <div>
            <h3 className={css.subtitle}>Vehicle equipment</h3>
            <ul className={css.optionsList}>
              <li>
                <input
                  type="checkbox"
                  id="airConditioner"
                  className={css.filterInput}
                  name="airConditioner"
                />
                <label htmlFor="airConditioner" className={css.filterLabel}>
                  <ACIcon width="32" height="32" />
                  AC
                </label>
              </li>
              <li>
                <input
                  type="checkbox"
                  id="automatic"
                  className={css.filterInput}
                  name="automatic"
                />
                <label htmlFor="automatic" className={css.filterLabel}>
                  <GearIcon width="32" height="32" />
                  Automatic
                </label>
              </li>
              <li>
                <input
                  type="checkbox"
                  id="kitchen"
                  className={css.filterInput}
                  name="kitchen"
                />
                <label htmlFor="kitchen" className={css.filterLabel}>
                  <FoodIcon width="32" height="32" />
                  Kitchen
                </label>
              </li>
              <li>
                <input
                  type="checkbox"
                  id="TV"
                  className={css.filterInput}
                  name="TV"
                />
                <label htmlFor="TV" className={css.filterLabel}>
                  <TVIcon width="32" height="32" />
                  TV
                </label>
              </li>
              <li>
                <input
                  type="checkbox"
                  id="shower"
                  className={css.filterInput}
                  name="shower"
                />
                <label htmlFor="shower" className={css.filterLabel}>
                  <ShowerIcon width="32" height="32" />
                  Shower/WC
                </label>
              </li>
            </ul>
          </div>
          <div>
            <h3 className={css.subtitle}>Vehicle type</h3>
            <ul className={css.optionsList}>
              <li>
                <input
                  type="radio"
                  id="panelTruck"
                  className={css.filterInput}
                  name="type"
                  onChange={handleChangeRadioBtn}
                />
                <label htmlFor="panelTruck" className={css.filterLabel}>
                  <VanIcon width="32" height="32" />
                  Van
                </label>
              </li>
              <li>
                <input
                  type="radio"
                  id="fullyIntegrated"
                  className={css.filterInput}
                  name="type"
                  onChange={handleChangeRadioBtn}
                />
                <label htmlFor="fullyIntegrated" className={css.filterLabel}>
                  <IntegratedIcon width="32" height="32" />
                  Fully Integrated
                </label>
              </li>
              <li>
                <input
                  type="radio"
                  id="alcove"
                  className={css.filterInput}
                  name="type"
                  onChange={handleChangeRadioBtn}
                />
                <label htmlFor="alcove" className={css.filterLabel}>
                  <AlcoveIcon width="32" height="32" />
                  Alcove
                </label>
              </li>
            </ul>
          </div>
        </div>
        <Button title="Search" />
      </form>
    </aside>
  );
};
