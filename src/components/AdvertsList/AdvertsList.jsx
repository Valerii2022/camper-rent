import css from './AdvertsList.module.css';
import { ReactComponent as HeartIcon } from '../../image/heart.svg';
import { ReactComponent as ActiveHeartIcon } from '../../image/active-heart.svg';
import { ReactComponent as StarIcon } from '../../image/star.svg';
import { ReactComponent as LocationIcon } from '../../image/location.svg';
import { AdvertDetails } from 'components/AdvertDetails/AdvertDetails';
import { useState } from 'react';
import { Modal } from 'components/Modal/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { getAdverts, getFavourites, getFilters } from 'redux/selectors';
import { addFavourites, deleteFavourites } from 'redux/favouritesSlise';
import { BookingSuccessModal } from 'components/Modal/BookingSuccessModal';
import { fetchAdverts } from 'redux/operations';
import { Button } from 'components/Button/Button';
import { reverseLocation } from 'utils/reverseLocation';

export const AdvertsList = ({ adverts, page, setPage, limit, catalog }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [successModalIsOpen, setSuccessModalIsOpen] = useState(false);
  const [id, setId] = useState(null);

  const dispatch = useDispatch();
  const favourites = useSelector(getFavourites);
  const { totalAdvertsCount } = useSelector(getAdverts);
  const { type, location, transmition } = useSelector(getFilters);

  const handleModalOpening = () => {
    setModalIsOpen(!modalIsOpen);
  };

  const handleSuccessModalOpening = () => {
    setSuccessModalIsOpen(!successModalIsOpen);
    setModalIsOpen(false);
  };

  const handleShowMoreBtnClick = e => {
    setId(e.currentTarget.id);
    setModalIsOpen(true);
    document.body.classList.add('lock');
  };

  const handleFavouritesAdd = e => {
    dispatch(addFavourites(e.currentTarget.id));
  };

  const handleFavouritesDelete = e => {
    dispatch(deleteFavourites(e.currentTarget.id));
  };

  const handleLoadMoreBtnclick = () => {
    if (catalog) {
      dispatch(
        fetchAdverts({ page: page + 1, type, limit: 4, transmition, location })
      );
    } else {
      dispatch(fetchAdverts);
    }
    setPage(page + 1);
  };

  return (
    <>
      <div className={css.catalogContent}>
        {adverts.length > 0 ? (
          <ul className={css.advertsList}>
            {adverts.map(advert => {
              const {
                _id,
                name,
                price,
                rating,
                reviews,
                location,
                description,
                gallery,
              } = advert;
              const isFavourite = favourites.includes(advert._id);
              const shortdescription = description.slice(0, 60);

              return (
                <li key={_id} className={css.advert}>
                  <div className={css.advertImg}>
                    <img src={gallery[0]} alt={name} height={310} />
                  </div>
                  <div className={css.advertContent}>
                    <div>
                      <div className={css.advertHeader}>
                        <h2 className={css.title}>{name}</h2>
                        <div className={css.advertPrice}>
                          <span>
                            €
                            {price.toLocaleString('ru-RU', {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}
                          </span>
                          {isFavourite ? (
                            <ActiveHeartIcon
                              id={advert._id}
                              width="24"
                              height="24"
                              onClick={handleFavouritesDelete}
                              className={css.heartIcon}
                            />
                          ) : (
                            <HeartIcon
                              id={advert._id}
                              width="24"
                              height="24"
                              onClick={handleFavouritesAdd}
                              className={css.heartIcon}
                            />
                          )}
                        </div>
                      </div>
                      <div className={css.reviewsWrapper}>
                        <span className={css.review}>
                          <StarIcon width="16" height="16" />
                          {rating}({reviews.length} Reviews)
                        </span>
                        <span>
                          <LocationIcon width="16" height="16" />
                          {reverseLocation(location)}
                        </span>
                      </div>
                    </div>
                    <p className={css.description}>{shortdescription}...</p>
                    <div className={css.advertsListWrap}>
                      <AdvertDetails advert={advert} />
                    </div>
                    <div id={_id} onClick={handleShowMoreBtnClick}>
                      <Button title="Show more" />
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className={css.emptyList}>There are no adverts yet...</p>
        )}

        {limit <= totalAdvertsCount &&
          limit >= 4 &&
          adverts.length % 4 === 0 && (
            <div onClick={handleLoadMoreBtnclick} className={css.btnWrapper}>
              <Button title="Load more" transparent />
            </div>
          )}
      </div>

      {modalIsOpen && (
        <Modal
          currentId={id}
          modalIsOpen={handleModalOpening}
          successModalOpening={handleSuccessModalOpening}
        />
      )}

      {successModalIsOpen && (
        <BookingSuccessModal modalIsOpen={handleSuccessModalOpening} />
      )}
    </>
  );
};
