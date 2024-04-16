import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; // Підключення стилів для react-datepicker

export const CalendarInput = () => {
  const [selectedDate, setSelectedDate] = useState(null); // Стан для зберігання вибраної дати

  return (
    <div>
      <h2>Виберіть дату:</h2>
      <DatePicker
        selected={selectedDate} // Поточно вибрана дата
        onChange={date => setSelectedDate(date)} // Обробник події зміни дати
        dateFormat="dd/MM/yyyy" // Формат дати
        isClearable // Дозволяє очищати вибрану дату
        placeholderText="Оберіть дату" // Текст-підказка
      />
    </div>
  );
};
