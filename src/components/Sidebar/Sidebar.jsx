import css from './Sidebar.module.css';
import { ReactComponent as ACIcon } from '../../image/AC.svg';
import { ReactComponent as GearIcon } from '../../image/gear.svg';
import { ReactComponent as FoodIcon } from '../../image/food.svg';
import { ReactComponent as TVIcon } from '../../image/TV.svg';
import { ReactComponent as ShowerIcon } from '../../image/shower.svg';
import { ReactComponent as VanIcon } from '../../image/van.svg';
import { ReactComponent as IntegratedIcon } from '../../image/integrated.svg';
import { ReactComponent as AlcoveIcon } from '../../image/alcove.svg';
import { ReactComponent as LocationIcon } from '../../image/location.svg';
import { SelectLocation } from 'components/SelectLocation/SelectLocation';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addFilter } from 'redux/favouritesSlise';
import { fetchAdverts } from 'redux/operations';

export const Sidebar = () => {
  const [location, setLocation] = useState('');
  const [type, setType] = useState('');

  const dispatch = useDispatch();

  const handleChangeRadioBtn = e => {
    const { id } = e.target;
    setType(id);
  };

  const handleSubmitForm = e => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = [];
    formData.forEach((_, key) => {
      if (key !== 'type') {
        data.push(key);
      }
    });
    dispatch(addFilter({ location, type, equipment: data }));
    dispatch(fetchAdverts({ page: 1, location, type }));
  };

  return (
    <aside className={css.sidebar}>
      <form onSubmit={handleSubmitForm}>
        <label>
          Location
          <LocationIcon width="32" height="32" />
          <SelectLocation locationChanging={setLocation} />
        </label>
        <h2>Filters</h2>
        <h3>Vehicle equipment</h3>
        <ul>
          <li>
            <input
              type="checkbox"
              id="AC"
              className={css.filterInput}
              name="AC"
            />
            <label htmlFor="AC" className={css.filterLabel}>
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
        <h3>Vehicle type</h3>
        <ul>
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
        <button>Search</button>
      </form>
    </aside>
  );
};