import css from './AdvertsList.module.css';
import { ReactComponent as HeartIcon } from '../../image/heart.svg';
import { ReactComponent as ActiveHeartIcon } from '../../image/active-heart.svg';
import { ReactComponent as StarIcon } from '../../image/star.svg';
import { ReactComponent as LocationIcon } from '../../image/location.svg';
import { AdvertDetails } from 'components/AdvertDetails/AdvertDetails';
import { useState } from 'react';
import { Modal } from 'components/Modal/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { getFavourites } from 'redux/selectors';
import { addFavourites, deleteFavourites } from 'redux/favouritesSlise';
import { BookingSuccessModal } from 'components/Modal/BookingSuccessModal';

export const AdvertsList = ({ adverts }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [successModalIsOpen, setSuccessModalIsOpen] = useState(false);
  const [id, setId] = useState(null);

  const dispatch = useDispatch();

  const favourites = useSelector(getFavourites);

  const handleModalOpening = () => {
    setModalIsOpen(!modalIsOpen);
  };

  const handleSuccessModalOpening = () => {
    setSuccessModalIsOpen(!successModalIsOpen);
    setModalIsOpen(false);
  };

  const handleShowMoreBtnClick = e => {
    setId(e.target.id);
    setModalIsOpen(true);
    document.body.classList.add('lock');
  };

  const handleFavouritesAdd = e => {
    dispatch(addFavourites(e.currentTarget.id));
  };

  const handleFavouritesDelete = e => {
    dispatch(deleteFavourites(e.currentTarget.id));
  };

  return (
    <>
      <div className={css.catalogContent}>
        {adverts.length > 0 ? (
          <ul>
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

              return (
                <li key={_id}>
                  <img src={gallery[0]} alt={name} width={200} />
                  <h2>{name}</h2>
                  <div>
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
                        width="32"
                        height="32"
                        onClick={handleFavouritesDelete}
                      />
                    ) : (
                      <HeartIcon
                        id={advert._id}
                        width="32"
                        height="32"
                        onClick={handleFavouritesAdd}
                      />
                    )}
                  </div>
                  <div>
                    <StarIcon width="32" height="32" />
                    <span>
                      {rating}({reviews.length} Reviews)
                    </span>
                  </div>
                  <div>
                    <LocationIcon width="32" height="32" />
                    <span>{location}</span>
                  </div>
                  <p>{description}</p>
                  <AdvertDetails advert={advert} />
                  <button id={_id} onClick={handleShowMoreBtnClick}>
                    Show more
                  </button>
                </li>
              );
            })}
          </ul>
        ) : (
          <p>There are no adverts yet...</p>
        )}

        {adverts.length > 4 && <button>Load more</button>}
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
