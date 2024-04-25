import css from './AdvertDetails.module.css';
import { ReactComponent as UsersIcon } from '../../image/user.svg';
import { ReactComponent as GearIcon } from '../../image/gear.svg';
import { ReactComponent as PetrolIcon } from '../../image/fuel.svg';
import { ReactComponent as FoodIcon } from '../../image/food.svg';
import { ReactComponent as BedIcon } from '../../image/bed.svg';
import { ReactComponent as AirConditionerIcon } from '../../image/air-conditioner.svg';
import { ReactComponent as CDIcon } from '../../image/CD.svg';
import { ReactComponent as TVIcon } from '../../image/TV.svg';
import { ReactComponent as FreezerIcon } from '../../image/freezer.svg';
import { ReactComponent as HobIcon } from '../../image/hob.svg';
import { ReactComponent as MicrowaveIcon } from '../../image/microwave.svg';
import { ReactComponent as RadioIcon } from '../../image/radio.svg';
import { ReactComponent as ShowerIcon } from '../../image/shower.svg';
import { ReactComponent as ToiletIcon } from '../../image/toilet.svg';
import { ReactComponent as WaterIcon } from '../../image/water.svg';
import { ReactComponent as GasIcon } from '../../image/gas.svg';

export const AdvertDetails = ({ advert }) => {
  const { adults, children, transmission, details, engine } = advert;
  return (
    <ul className={css.detailsList}>
      {adults !== 0 && (
        <li>
          <UsersIcon width="20" height="20" />
          {adults} adults
        </li>
      )}
      {children !== 0 && (
        <li>
          <UsersIcon width="20" height="20" />
          {children} children
        </li>
      )}
      {transmission && (
        <li>
          <GearIcon width="20" height="20" />
          {transmission}
        </li>
      )}
      {engine && (
        <li>
          <PetrolIcon width="20" height="20" />
          {engine}
        </li>
      )}
      {details.kitchen !== 0 && (
        <li>
          <FoodIcon width="20" height="20" />
          {details.kitchen > 1 ? `${details.kitchen} kitchen` : 'kitchen'}
        </li>
      )}
      {details.beds !== 0 && (
        <li>
          <BedIcon width="20" height="20" />
          {details.beds > 1 ? `${details.beds} beds` : 'bed'}
        </li>
      )}
      {details.airConditioner !== 0 && (
        <li>
          <AirConditionerIcon width="20" height="20" />
          {details.airConditioner > 1
            ? `${details.airConditioner} Air Conditioner`
            : 'Air Conditioner'}
        </li>
      )}
      {details.CD !== 0 && (
        <li>
          <CDIcon width="20" height="20" />
          {details.CD > 1 ? `${details.CD} CD` : 'CD'}
        </li>
      )}
      {details.TV !== 0 && (
        <li>
          <TVIcon width="20" height="20" />
          {details.TV > 1 ? `${details.TV} TV` : 'TV'}
        </li>
      )}
      {details.freezer !== 0 && (
        <li>
          <FreezerIcon width="20" height="20" />
          {details.freezer > 1 ? `${details.freezer} freezer` : 'freezer'}
        </li>
      )}
      {details.hob !== 0 && (
        <li>
          <HobIcon width="20" height="20" />
          {details.hob > 1 ? `${details.hob} freezer` : 'freezer'}
        </li>
      )}
      {details.microwave !== 0 && (
        <li>
          <MicrowaveIcon width="20" height="20" />
          {details.microwave > 1
            ? `${details.microwave} microwave`
            : 'microwave'}
        </li>
      )}
      {details.radio !== 0 && (
        <li>
          <RadioIcon width="20" height="20" />
          {details.radio > 1 ? `${details.radio} radio` : 'radio'}
        </li>
      )}
      {details.shower !== 0 && (
        <li>
          <ShowerIcon width="20" height="20" />
          {details.shower > 1 ? `${details.shower} shower` : 'shower'}
        </li>
      )}
      {details.toilet !== 0 && (
        <li>
          <ToiletIcon width="20" height="20" />
          {details.toilet > 1 ? `${details.toilet} toilet` : 'toilet'}
        </li>
      )}
      {details.water && (
        <li>
          <WaterIcon width="20" height="20" />
          water
        </li>
      )}
      {details.gas && (
        <li>
          <GasIcon width="20" height="20" />
          gas
        </li>
      )}
    </ul>
  );
};
