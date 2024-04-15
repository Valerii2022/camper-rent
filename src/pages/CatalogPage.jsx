import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchAdverts } from 'redux/operations';
import css from './HomePage.module.css';
import { Sidebar } from 'components/Sidebar/Sidebar';
import { ReactComponent as HeartIcon } from '../image/heart.svg';
import { ReactComponent as StarIcon } from '../image/star.svg';
import { ReactComponent as LocationIcon } from '../image/location.svg';
import { ReactComponent as UsersIcon } from '../image/user.svg';
import { ReactComponent as GearIcon } from '../image/gear.svg';
import { ReactComponent as PetrolIcon } from '../image/fuel.svg';
import { ReactComponent as FoodIcon } from '../image/food.svg';
import { ReactComponent as BedIcon } from '../image/bed.svg';
import { ReactComponent as ACIcon } from '../image/AC.svg';

export const Catalog = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAdverts());
  }, [dispatch]);

  return (
    <>
      <div className={`${css.catalog} container`}>
        <Sidebar />
        <div className={css.catalogContent}>
          <ul>
            <li>
              <img
                src="https://5.imimg.com/data5/SELLER/Default/2021/3/YP/YC/TI/14979358/tata-magic-express-10-seater-school-van-250x250.jpg"
                alt=""
              />
              <h2>Mavericks</h2>
              <div>
                <span>€8000.00</span>
                <HeartIcon width="32" height="32" />
              </div>
              <div>
                <StarIcon width="32" height="32" />
                <span>4.4(2 Reviews)</span>
              </div>
              <div>
                <LocationIcon width="32" height="32" />
                <span>Kyiv, Ukraine</span>
              </div>
              <p>
                Embrace simplicity and freedom with the Mavericks panel truck,
                an ideal choice for solo travelers or couples seeking a compact
                and efficient way to explore the open roads.
              </p>
              <ul>
                <li>
                  <UsersIcon width="32" height="32" />2 adults
                </li>
                <li>
                  <GearIcon width="32" height="32" />
                  Automatic
                </li>
                <li>
                  <PetrolIcon width="32" height="32" />
                  Petrol
                </li>
                <li>
                  <FoodIcon width="32" height="32" />
                  Kitchen
                </li>
                <li>
                  <BedIcon width="32" height="32" />1 beds
                </li>
                <li>
                  <ACIcon width="32" height="32" />
                  AC
                </li>
              </ul>
              <button>Show more</button>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};
