import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';
import { Header } from 'components/Header/Headert';
import css from './Layout.module.css';

const Layout = () => {
  return (
    <div className={css.mainContainer}>
      <Header />
      <main className={css.mainContent}>
        <Suspense fallback={<div>Loading...</div>}>
          <Outlet />
        </Suspense>
      </main>
      <footer className={css.footer}>footer</footer>
    </div>
  );
};
export default Layout;
