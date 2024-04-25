import css from './HomePage.module.css';
import { ReactComponent as CampersIcon } from '../image/campers.svg';
import { ReactComponent as ContactIcon } from '../image/contact.svg';
import { ReactComponent as InfoIcon } from '../image/camping-info.svg';
import { ReactComponent as FAQIcon } from '../image/faq.svg';

export const Home = () => {
  return (
    <div className={css.hero}>
      <div className={css.titleWrapper}>
        <h1 className={css.title}>Camper rentals</h1>
        <h2 className={css.subtitle}> of Ukraine</h2>
        <div className={css.text}>
          <p>Rent an RV from a local owner in Ukraine</p>
          <p>Book your perfect motorhome easily, safely and affordably</p>
        </div>
      </div>
      <ul className={css.generalInfo}>
        <li>
          <CampersIcon width="60" height="60" className={css.infoIcon} />
          Campers
        </li>
        <li>
          <InfoIcon width="60" height="60" className={css.infoIcon} />
          Camping info
        </li>
        <li>
          <ContactIcon width="60" height="60" className={css.infoIcon} />
          Contact us
        </li>
        <li>
          <FAQIcon width="80" height="80" className={css.infoIcon} />
          FAQ
        </li>
      </ul>
    </div>
  );
};
