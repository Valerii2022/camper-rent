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

export const Sidebar = () => {
  return (
    <aside className={css.sidebar}>
      <form>
        <label>
          Location
          <LocationIcon width="32" height="32" />
          <input type="text" placeholder="City" />
        </label>
        <h2>Filters</h2>
        <h3>Vehicle equipment</h3>
        <ul>
          <li>
            <ACIcon width="32" height="32" />
            AC
          </li>
          <li>
            <GearIcon width="32" height="32" />
            Automatic
          </li>
          <li>
            <FoodIcon width="32" height="32" />
            Kitchen
          </li>
          <li>
            <TVIcon width="32" height="32" />
            TV
          </li>
          <li>
            <ShowerIcon width="32" height="32" />
            Shower/WC
          </li>
        </ul>
        <h3>Vehicle type</h3>
        <ul>
          <li>
            <VanIcon width="32" height="32" />
            Van
          </li>
          <li>
            <IntegratedIcon width="32" height="32" />
            Fully Integrated
          </li>
          <li>
            <AlcoveIcon width="32" height="32" />
            Alcove
          </li>
        </ul>
        <button>Search</button>
      </form>
    </aside>
  );
};
