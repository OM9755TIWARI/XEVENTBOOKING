import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("bookings");

    if (stored) {
      setBookings(JSON.parse(stored));
    }
  }, []);

  return (
    <>
      <Navbar />

      <div className="container">

        <h1>My Bookings</h1>

        {bookings.map((b, i) => {
          // SUPPORT BOTH FORMATS
          const eventName = b.eventName || b.name;

          return (
            <div key={i} className="booking-card">

              {/* REQUIRED */}
              <h3>{eventName}</h3>

              <p>{b.address}</p>
              <p>{b.city}, {b.state}</p>
              <p>{b.date}</p>
              <p>{b.time}</p>

            </div>
          );
        })}

      </div>
    </>
  );
}