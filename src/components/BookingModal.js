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
    name: event.name || event["Event Name"],
    city: event.city,
    state: event.state,
    date,
    time,
  };
    const updated = [...old, booking];

    // Force overwrite
    localStorage.setItem("bookings", JSON.stringify(updated));

    // 🔥 Force hard reload (fixes Cypress timing)
    window.location.href = "/my-bookings";
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