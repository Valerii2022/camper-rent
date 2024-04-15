import css from './Header.module.css';
import { Link, NavLink } from 'react-router-dom';
import { ReactComponent as LogoIcon } from '../../image/van.svg';
import { ReactComponent as PhoneIcon } from '../../image/phone.svg';
import { ReactComponent as EmailIcon } from '../../image/email.svg';

export const Header = () => {
  const handleActiveElementClick = event => {
    event.currentTarget.blur();
  };

  return (
    <header className={css.headerWrapper}>
      <div className="container">
        <div className={css.headerInner}>
          <LogoIcon width="60" height="32" />
          <nav>
            <ul className={css.navigate}>
              <li>
                <NavLink
                  className={css.link}
                  to="/"
                  onClick={handleActiveElementClick}
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={css.link}
                  to="/catalog"
                  onClick={handleActiveElementClick}
                >
                  Catalog
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={css.link}
                  to="/favourites"
                  onClick={handleActiveElementClick}
                >
                  Favourites
                </NavLink>
              </li>
            </ul>
          </nav>
          <ul className={css.contacts}>
            <li className={css.contactsItem}>
              <Link to="tel:+380772552525" className={css.contactLink}>
                <PhoneIcon width="24" height="24" className={css.icon} />
                +38 (077) 255-25-25
              </Link>
            </li>
            <li className={css.contactsItem}>
              <Link
                to="mailto:camper-rental@test.com"
                className={css.contactLink}
              >
                <EmailIcon width="24" height="24" className={css.icon} />
                camper-rental@test.com
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};
