import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import css from './Modal.module.css';
import { ReactComponent as ClosetIcon } from '../../image/close.svg';
import { ReactComponent as StarIcon } from '../../image/star.svg';
import { ReactComponent as LocationIcon } from '../../image/location.svg';
import { ReactComponent as ActiveStarIcon } from '../../image/star.svg';
import { ReactComponent as TransparentStarIcon } from '../../image/transparent-star.svg';
import { useSelector } from 'react-redux';
import { getAdverts } from 'redux/selectors';
import { nanoid } from 'nanoid';
import { BookingForm } from 'components/BookingForm/BookingForm';
import { AdvertDetails } from 'components/AdvertDetails/AdvertDetails';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ modalIsOpen, currentId, successModalOpening }) => {
  const [information, setInformation] = useState(false);

  const [features, setFeatures] = useState(false);
  const { items } = useSelector(getAdverts);
  const currentAdvert = items.find(el => el._id === currentId);
  const {
    name,
    price,
    rating,
    reviews,
    location,
    description,
    gallery,
    form,
    consumption,
    tank,
    length,
    width,
    height,
  } = currentAdvert;
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        modalIsOpen();
        document.body.classList.remove('lock');
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [modalIsOpen]);

  const handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      modalIsOpen();
      document.body.classList.remove('lock');
    }
  };

  const handleInfoBtnClick = () => {
    setInformation(true);
  };

  return createPortal(
    <div className={css.overlay} onClick={handleBackdropClick}>
      <div className={css.modal}>
        <ClosetIcon
          className={css.closeIcon}
          width="24"
          height="24"
          onClick={() => {
            modalIsOpen();
            document.body.classList.remove('lock');
          }}
        />
        {currentAdvert && (
          <div>
            <h2>{name}</h2>
            <div>
              <span>
                €
                {price.toLocaleString('ru-RU', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
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
            {gallery && (
              <ul>
                {gallery.map(el => {
                  return (
                    <li key={nanoid(3)}>
                      <img src={el} alt={name} width={100} />
                    </li>
                  );
                })}
              </ul>
            )}
            <p>{description}</p>
            <ul>
              <li>
                <button
                  onClick={() => {
                    handleInfoBtnClick();
                    setFeatures(true);
                  }}
                >
                  Features
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    handleInfoBtnClick();
                    setFeatures(false);
                  }}
                >
                  Reviews
                </button>
              </li>
            </ul>
            {information && (
              <div>
                {features ? (
                  <div>
                    <AdvertDetails advert={currentAdvert} />
                    <div>
                      <h2>Vehicle details</h2>
                      <ul>
                        <li>
                          <p>Form</p>
                          <p>{form}</p>
                        </li>
                        <li>
                          <p>Length</p>
                          <p>{length}</p>
                        </li>
                        <li>
                          <p>Width</p>
                          <p>{width}</p>
                        </li>
                        <li>
                          <p>Height</p>
                          <p>{height}</p>
                        </li>
                        <li>
                          <p>Tank</p>
                          <p>{tank}</p>
                        </li>
                        <li>
                          <p>Consumption</p>
                          <p>{consumption}</p>
                        </li>
                      </ul>
                    </div>
                  </div>
                ) : (
                  <div>
                    {reviews ? (
                      <ul>
                        {reviews.map(el => {
                          const avatar = el.reviewer_name.charAt(0);
                          const activeStars = Array(
                            parseInt(el.reviewer_rating)
                          ).fill(<ActiveStarIcon width="32" height="32" />);
                          const transparentStars = Array(
                            5 - parseInt(el.reviewer_rating)
                          ).fill(
                            <TransparentStarIcon width="32" height="32" />
                          );
                          const allStars = [
                            ...activeStars,
                            ...transparentStars,
                          ];
                          return (
                            <li key={nanoid(3)}>
                              <div className={css.reviewAvatar}>{avatar}</div>
                              <p>{el.reviewer_name}</p>
                              <div>
                                <div>
                                  {allStars.map((star, index) => (
                                    <span key={index}>{star}</span>
                                  ))}
                                </div>
                                {el.reviewer_rating}
                              </div>
                              <p>{el.comment}</p>
                            </li>
                          );
                        })}
                      </ul>
                    ) : (
                      'No reviews yet'
                    )}
                  </div>
                )}
                <BookingForm modalIsOpen={successModalOpening} />
              </div>
            )}
          </div>
        )}
      </div>
    </div>,
    modalRoot
  );
};
