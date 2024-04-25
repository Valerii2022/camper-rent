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
import { reverseLocation } from 'utils/reverseLocation';
import { formatString } from 'utils/camperFormFormatter';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ modalIsOpen, currentId, successModalOpening }) => {
  const [features, setFeatures] = useState(true);
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

  return createPortal(
    <div className={css.overlay} onClick={handleBackdropClick}>
      <div className={css.modal}>
        <ClosetIcon
          className={css.closeIcon}
          width="32"
          height="32"
          onClick={() => {
            modalIsOpen();
            document.body.classList.remove('lock');
          }}
        />
        {currentAdvert && (
          <div className={css.modalInner}>
            <h2 className={css.title}>{name}</h2>
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
            <p className={css.price}>
              €
              {price.toLocaleString('ua-UA', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </p>
            {gallery && (
              <ul className={css.gallery}>
                {gallery.map(el => {
                  return (
                    <li key={nanoid(3)} className={css.galleryItem}>
                      <img src={el} alt={name} height={310} />
                    </li>
                  );
                })}
              </ul>
            )}
            <p className={css.description}>{description}</p>
            <ul className={css.detailsList}>
              <li>
                <button
                  className={css.detailsBtn}
                  onClick={() => {
                    setFeatures(true);
                  }}
                >
                  Features
                  {features && <span className={css.line}></span>}
                </button>
              </li>
              <li>
                <button
                  className={css.detailsBtn}
                  onClick={() => {
                    setFeatures(false);
                  }}
                >
                  Reviews
                  {!features && <span className={css.line}></span>}
                </button>
              </li>
            </ul>
            <div className={css.bottomBlock}>
              {features ? (
                <div className={css.infoBlock}>
                  <AdvertDetails advert={currentAdvert} />
                  <div>
                    <h2 className={css.featuresTitle}>Vehicle details</h2>
                    <ul className={css.featuresList}>
                      <li>
                        <p>Form</p>
                        <p>{formatString(form)}</p>
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
                <div className={css.infoBlock}>
                  {reviews ? (
                    <ul className={css.reviewsList}>
                      {reviews.map(el => {
                        const avatar = el.reviewer_name.charAt(0);
                        const activeStars = Array(
                          parseInt(el.reviewer_rating)
                        ).fill(<ActiveStarIcon width="16" height="16" />);
                        const transparentStars = Array(
                          5 - parseInt(el.reviewer_rating)
                        ).fill(<TransparentStarIcon width="16" height="16" />);
                        const allStars = [...activeStars, ...transparentStars];
                        return (
                          <li key={nanoid(3)}>
                            <div className={css.avatarWrapper}>
                              <div className={css.reviewAvatar}>{avatar}</div>
                              <div>
                                <p className={css.reviewerName}>
                                  {el.reviewer_name}
                                </p>
                                <div>
                                  <div>
                                    {allStars.map((star, index) => (
                                      <span key={index}>{star}</span>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </div>
                            <p className={css.comment}>{el.comment}</p>
                          </li>
                        );
                      })}
                    </ul>
                  ) : (
                    'No reviews yet'
                  )}
                </div>
              )}
              <div className={css.formBlock}>
                <BookingForm modalIsOpen={successModalOpening} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>,
    modalRoot
  );
};
