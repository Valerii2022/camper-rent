// import { CalendarInput } from 'components/Calendar/Calendar';

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
        <h2>Book your campervan now</h2>
        <p>Stay connected! We are always ready to help you.</p>
        <label>
          <input type="text" placeholder="Name" name="name" required />
        </label>
        <label>
          <input type="email" placeholder="Email" name="email" required />
        </label>
        <label placeholder="Оберіть дату">
          <input type="date" name="date" placeholder="Booking date" required />
        </label>
        {/* <CalendarInput /> */}
        <label>
          <textarea placeholder="Comment" name="comment" />
        </label>
        <button>Send</button>
      </form>
    </>
  );
};
