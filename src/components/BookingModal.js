import { useState } from "react";
import "../styles.css";

export default function BookingModal({ event, close }) {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

const saveBooking = () => {
  if (!date || !time) return;

  const old =
    JSON.parse(localStorage.getItem("bookings")) || [];

  const booking = {
    name: event.name,   // MUST be name
    city: event.city,
    state: event.state,
    date,
    time,
  };

  const updated = [...old, booking];

  // Force sync save
  localStorage.removeItem("bookings");
  localStorage.setItem("bookings", JSON.stringify(updated));

  // Force reload for Cypress
  window.dispatchEvent(new Event("storage"));

  close();
};

  return (
    <div className="modal">

      <div className="modal-box">

        <h3>Book Event</h3>

        <input
          type="date"
          onChange={(e) => setDate(e.target.value)}
        />

        {/* REQUIRED P TAGS */}
        <div className="time-box">
          <p onClick={() => setTime("Today")}>Today</p>
          <p onClick={() => setTime("Morning")}>Morning</p>
          <p onClick={() => setTime("Afternoon")}>Afternoon</p>
          <p onClick={() => setTime("Evening")}>Evening</p>
        </div>

        <button onClick={saveBooking}>
          Confirm
        </button>

        <button onClick={close}>
          Cancel
        </button>

      </div>
    </div>
  );
}