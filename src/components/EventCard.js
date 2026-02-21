import { useState } from "react";
import BookingModal from "./BookingModal";
import "../styles.css";

export default function EventCard({ event }) {
  const [open, setOpen] = useState(false);

  
  const eventName = event.name || event["Event Name"];

  return (
    <div className="event-card">

      {/* REQUIRED TAG */}
      <h3>{eventName}</h3>

      <p>{event.address}</p>
      <p>{event.city}, {event.state}</p>
      <p>{event.rating}</p>

      {/* REQUIRED TEXT */}
      <button onClick={() => setOpen(true)}>
        Book FREE Event
      </button>

      {open && (
        <BookingModal
          event={{ ...event, name: eventName }} // pass fixed name
          close={() => setOpen(false)}
        />
      )}
    </div>
  );
}