import css from './HomePage.module.css';

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
        <li>Campers</li>
        <li>Camping info</li>
        <li>Contact us</li>
        <li>FAQ</li>
      </ul>
    </div>
  );
};
