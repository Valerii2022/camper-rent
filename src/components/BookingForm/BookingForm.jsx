import { CalendarInput } from 'components/Calendar/Calendar';
import { Button } from 'components/Button/Button';
import css from './BookingForm.module.css';

export const BookingForm = ({ modalIsOpen }) => {
  const handleSubmitForm = e => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });
    console.table(data);
    modalIsOpen();
  };

  return (
    <>
      <form onSubmit={handleSubmitForm}>
        <h2 className={css.title}>Book your campervan now</h2>
        <p className={css.subtitle}>
          Stay connected! We are always ready to help you.
        </p>
        <div className={css.formInner}>
          <label>
            <input
              className={css.input}
              type="text"
              placeholder="Name"
              name="name"
              required
            />
          </label>
          <label>
            <input
              className={css.input}
              type="email"
              placeholder="Email"
              name="email"
              required
            />
          </label>
          <CalendarInput />
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
