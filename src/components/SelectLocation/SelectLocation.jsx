import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { locations } from './locations';

export const SelectLocation = ({ locationChanging, currentLocation }) => {
  const [location, setLocation] = useState(currentLocation);

  const handleChangeInput = e => {
    setLocation(e.value);
    locationChanging(e.value);
  };

  useEffect(() => {
    setLocation(currentLocation);
  }, [currentLocation]);

  const selectStyles = {
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
    }),
    menu: styles => ({
      ...styles,
      borderRadius: '10px',
      paddingLeft: '18px',
      paddingTop: '10px',
      paddingBottom: '18px',
      paddingRight: '8px',
    }),
  };

  return (
    <>
      <Select
        // defaultValue={location}
        value={location}
        onChange={handleChangeInput}
        maxMenuHeight={240}
        placeholder={location ? location : 'City'}
        options={locations}
        styles={selectStyles}
        components={{
          IndicatorSeparator: () => null,
        }}
      />
    </>
  );
};
