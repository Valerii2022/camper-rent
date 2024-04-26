import React, { useState } from 'react';
import DatePicker, { CalendarContainer } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import css from './Calendar.module.css';
import { ReactComponent as CalendarIcon } from '../../image/calendar.svg';

const MyContainer = ({ className, children }) => {
  return (
    <CalendarContainer className={className}>
      <div className={css.calendarContainerInner}>{children}</div>
    </CalendarContainer>
  );
};

export const CalendarInput = ({ setDate, isDateEmpty, setIsDateEmpty }) => {
  const [selectedDate, setSelectedDate] = useState(null);

  return (
    <>
      <DatePicker
        showIcon
        icon={<CalendarIcon className={css.icon} />}
        toggleCalendarOnIconClick
        closeOnScroll={true}
        selected={selectedDate}
        calendarContainer={MyContainer}
        required
        className={
          isDateEmpty ? `${css.input} ${css.errorInput}` : `${css.input}`
        }
        onChange={date => {
          setDate(date);
          setIsDateEmpty(false);
          return setSelectedDate(date);
        }}
        dateFormat="MM/dd/YYYY"
        placeholderText="Booking date"
      />
      <div className={css.errorsWrapper}>
        {isDateEmpty && <p className={css.error}>Required field</p>}
      </div>
    </>
  );
};

// https://reactdatepicker.com/
