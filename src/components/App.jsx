import { Route, Routes, Navigate } from 'react-router-dom';
import Layout from './Layout/Layout';
import { Home } from 'pages/HomePage';
import { Catalog } from 'pages/CatalogPage';
import { Favourites } from 'pages/FavouritesPage';

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="catalog" element={<Catalog />} />
        <Route path="favourites" element={<Favourites />} />
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};
