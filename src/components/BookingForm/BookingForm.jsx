import { CalendarInput } from 'components/Calendar/Calendar';
import { Button } from 'components/Button/Button';
import css from './BookingForm.module.css';
import { useState } from 'react';

export const BookingForm = ({ modalIsOpen }) => {
  const [name, setName] = useState('');
  const [isNameValid, setIsNameValid] = useState(true);
  const [isNameEmpty, setIsNameEmpty] = useState(false);
  const [email, setEmail] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isEmailEmpty, setIsEmailEmpty] = useState(false);
  const [date, setDate] = useState('');
  const [isDateEmpty, setIsDateEmpty] = useState(false);

  const namePattern = /^[a-zA-Z]*$/;
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const handleSubmitForm = e => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });
    data.date = date;
    const isNameValid = nameValidate(data.name);
    const isEmailValid = emailValidate(data.email);
    const isDateValid = dateValidate(data.date);
    if (isNameValid && isEmailValid && isDateValid) {
      console.table(data);
      modalIsOpen();
    }
  };

  const nameValidate = name => {
    if (name === '') {
      setIsNameEmpty(true);
      return;
    }
    const isValidName = namePattern.test(name);
    if (!isValidName || name.length < 3) {
      setIsNameValid(false);
      return;
    }
    return true;
  };

  const emailValidate = email => {
    if (email === '') {
      setIsEmailEmpty(true);
      return;
    }
    const isValidEmail = emailPattern.test(email);
    if (!isValidEmail) {
      setIsEmailValid(false);
      return;
    }
    return true;
  };

  const dateValidate = date => {
    if (date === '') {
      setIsDateEmpty(true);
      return;
    }
    return true;
  };

  return (
    <>
      <form noValidate onSubmit={handleSubmitForm}>
        <h2 className={css.title}>Book your campervan now</h2>
        <p className={css.subtitle}>
          Stay connected! We are always ready to help you.
        </p>
        <div className={css.formInner}>
          <label>
            <input
              style={{
                border: isNameEmpty || !isNameValid ? '1px solid #e44848' : '',
              }}
              className={css.input}
              value={name}
              onChange={e => {
                setIsNameEmpty(false);
                setIsNameValid(true);
                setName(e.target.value);
              }}
              type="text"
              placeholder="Name"
              name="name"
            />
            <div className={css.errorsWrapper}>
              {isNameEmpty && <p className={css.error}>Required field</p>}
              {!isNameValid && (
                <p className={css.error}>Only Latin, minimum 3 characters</p>
              )}
            </div>
          </label>
          <label>
            <input
              style={{
                border:
                  isEmailEmpty || !isEmailValid ? '1px solid #e44848' : '',
              }}
              className={css.input}
              value={email}
              onChange={e => {
                setIsEmailEmpty(false);
                setIsEmailValid(true);
                setEmail(e.target.value);
              }}
              type="email"
              placeholder="Email"
              name="email"
            />
            <div className={css.errorsWrapper}>
              {isEmailEmpty && <p className={css.error}>Required field</p>}
              {!isEmailValid && (
                <p className={css.error}>
                  Email need to be in format - example@example.example
                </p>
              )}
            </div>
          </label>
          <CalendarInput
            setDate={setDate}
            isDateEmpty={isDateEmpty}
            setIsDateEmpty={setIsDateEmpty}
          />
          <label>
            <textarea
              placeholder="Comment"
              name="comment"
              className={css.textarea}
            ></textarea>
          </label>
        </div>
        <Button title="Send" />
      </form>
    </>
  );
};
