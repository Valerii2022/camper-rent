export const BookingForm = () => {
  return (
    <form>
      <h2>Book your campervan now</h2>
      <p>Stay connected! We are always ready to help you.</p>
      <label>
        <input type="text" placeholder="Name" name="name" />
      </label>
      <label>
        <input type="email" placeholder="Email" name="email" />
      </label>
      <label>
        <input type="text" placeholder="Booking date" name="date" />
      </label>
      <label>
        <textarea placeholder="Comment" name="comment" />
      </label>
      <button>Send</button>
    </form>
  );
};
