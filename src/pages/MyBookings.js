import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const loadBookings = () => {
      const stored = localStorage.getItem("bookings");

      if (stored) {
        setBookings(JSON.parse(stored));
      } else {
        setBookings([]);
      }
    };

    loadBookings();

    // 👇 Important: listen for storage changes
    window.addEventListener("storage", loadBookings);

    return () => {
      window.removeEventListener("storage", loadBookings);
    };
  }, []);

  return (
    <>
      <Navbar />

      <div className="container">

        {/* REQUIRED h1 */}
        <h1>My Bookings</h1>

        {bookings.length === 0 && (
          <p>No bookings yet</p>
        )}

        {bookings.map((booking, index) => (
          <div key={index} className="booking-card">

            {/* REQUIRED h3 */}
            <h3>{booking.name}</h3>

            <p>{booking.city}, {booking.state}</p>
            <p>{booking.date}</p>
            <p>{booking.time}</p>

          </div>
        ))}

      </div>
    </>
  );
}