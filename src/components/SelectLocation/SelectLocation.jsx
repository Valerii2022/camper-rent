import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import { fetchAdverts } from 'redux/operations';
import { getAdverts } from 'redux/selectors';
import { reverseLocation } from 'utils/reverseLocation';

export const SelectLocation = ({ locationChanging }) => {
  const [location, setLocation] = useState('');
  const dispatch = useDispatch();
  const { totalAdverts } = useSelector(getAdverts);
  const locations = totalAdverts.map(el => el.location);
  const uniqueSet = new Set(locations);
  const uniqueLocations = Array.from(uniqueSet);

  useEffect(() => {
    dispatch(fetchAdverts({ page: 1, location, type: '' }));
  }, [location, dispatch]);

  const handleChangeInput = e => {
    setLocation(e.value);
    locationChanging(e.value);
  };

  const locationOptions = [
    { value: null, label: 'City' },
    ...uniqueLocations.map(el => {
      const newEl = reverseLocation(el);
      return { value: el, label: newEl };
    }),
  ];

  const selectStyles = {
    // input: styles => ({
    //   ...styles,
    //   height: '52px',
    // }),
    control: () => ({
      borderRadius: '10px',
      backgroundColor: '#f7f7f7',
      height: '56px',
      display: 'flex',
      alignItems: 'center',
      padding: '0',
      width: '360px',
      paddingLeft: '36px',
      paddingRight: '14px',
      borderRight: 'none',
      color: '#101828',
      fontSize: '16px',
      fontWeight: '400',
      lineHeight: '1.25',
    }),
    // valueContainer: styles => ({
    //   ...styles,
    //   height: '52px',
    // }),
    option: (styles, { isFocused }) => {
      return {
        ...styles,
        backgroundColor: 'transparent',
        color: isFocused ? '#101828' : 'rgba(16, 24, 40, 0.40)',
        fontSize: '16px',
        fontWeight: '400',
        lineHeight: '1.25',
        cursor: 'pointer',
        paddingLeft: '0',
        paddingRight: '0',
        paddingTop: '4px',
        paddingBottom: '4px',
      };
    },
    placeholder: styles => {
      return {
        ...styles,
        color: 'rgba(16, 24, 40, 0.6)',
        fontSize: '16px',
        fontWeight: '400',
        lineHeight: '1.25',
      };
    },
    dropdownIndicator: (styles, state) => ({
      ...styles,
      display: 'none',
      // svg: {
      //   fill: '#101828',
      // },
      // cursor: 'pointer',
      // transition: 'transform 250ms linear',
      // transform: state.isFocused ? 'rotate(180deg)' : null,
    }),
    menu: styles => ({
      ...styles,
      borderRadius: '10px',
      paddingLeft: '18px',
      paddingTop: '10px',
      paddingBottom: '18px',
      paddingRight: '8px',
    }),
    // menuList: styles => ({
    //   ...styles,
    //   '::-webkit-scrollbar': {
    //     width: '8px',
    //     height: '0px',
    //   },
    //   '::-webkit-scrollbar-thumb': {
    //     background: 'rgba(16, 24, 40, 0.05)',
    //     borderRadius: '10px',
    //   },
    // }),
  };

  return (
    <>
      <Select
        defaultValue={location}
        onChange={handleChangeInput}
        maxMenuHeight={240}
        placeholder="City"
        options={locationOptions}
        styles={selectStyles}
        components={{
          IndicatorSeparator: () => null,
        }}
      />
    </>
  );
};
