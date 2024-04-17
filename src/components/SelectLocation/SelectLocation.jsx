import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import { fetchAdverts } from 'redux/operations';
import { getAdverts } from 'redux/selectors';

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
    { value: null, label: 'All locations' },
    ...uniqueLocations.map(el => {
      return { value: el, label: el };
    }),
  ];

  const selectStyles = {
    control: () => ({
      borderRadius: '14px',
      backgroundColor: '#f7f7fb',
      height: '48px',
      display: 'flex',
      padding: '0',
      width: '250px',
      paddingLeft: '30px',
      paddingRight: '14px',
      borderRight: 'none',
      color: '#121417',
      fontSize: '18px',
      fontWeight: '500',
      lineHeight: '1.11',
    }),
    valueContainer: styles => ({
      ...styles,
      minWidth: '60px',
    }),
    option: (styles, { isFocused }) => {
      return {
        ...styles,
        backgroundColor: 'transparent',
        color: isFocused ? '#121417' : 'rgba(18, 20, 23, 0.20)',
        fontSize: '16px',
        fontWeight: '500',
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
        color: '#121417',
      };
    },
    dropdownIndicator: (styles, state) => ({
      ...styles,
      svg: {
        fill: '#121417',
      },
      cursor: 'pointer',
      transition: 'transform 250ms linear',
      transform: state.isFocused ? 'rotate(180deg)' : null,
    }),
    menu: styles => ({
      ...styles,
      borderRadius: '10px',
      paddingLeft: '18px',
      paddingTop: '10px',
      paddingBottom: '18px',
      paddingRight: '8px',
    }),
    menuList: styles => ({
      ...styles,
      '::-webkit-scrollbar': {
        width: '8px',
        height: '0px',
      },
      '::-webkit-scrollbar-thumb': {
        background: 'rgba(18, 20, 23, 0.05)',
        borderRadius: '10px',
      },
    }),
  };

  return (
    <>
      <Select
        defaultValue={location}
        onChange={handleChangeInput}
        maxMenuHeight={188}
        placeholder="All locations"
        options={locationOptions}
        styles={selectStyles}
        components={{
          IndicatorSeparator: () => null,
        }}
      />
    </>
  );
};
