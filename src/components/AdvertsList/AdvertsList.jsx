import css from './AdvertsList.module.css';
import { ReactComponent as HeartIcon } from '../../image/heart.svg';
import { ReactComponent as StarIcon } from '../../image/star.svg';
import { ReactComponent as LocationIcon } from '../../image/location.svg';
import { AdvertDetails } from 'components/AdvertDetails/AdvertDetails';
import { useState } from 'react';
import { Modal } from 'components/Modal/Modal';

export const AdvertsList = ({ adverts }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [id, setId] = useState(null);

  const handleModalOpening = () => {
    setModalIsOpen(!modalIsOpen);
  };

  return (
    <>
      <div className={css.catalogContent}>
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
            return (
              <li key={_id}>
                <img src={gallery[0]} alt={name} width={200} />
                <h2>{name}</h2>
                <div>
                  <span>€{price}</span>
                  <HeartIcon width="32" height="32" />
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
                <button
                  id={_id}
                  onClick={e => {
                    setId(e.target.id);
                    setModalIsOpen(true);
                  }}
                >
                  Show more
                </button>
              </li>
            );
          })}
        </ul>
        <button>Load more</button>
      </div>
      {modalIsOpen && <Modal currentId={id} modalIsOpen={handleModalOpening} />}
    </>
  );
};
