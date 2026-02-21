import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

export default function MyBookings() {
  const [bookings, setBookings] = useState(null); // null first

  useEffect(() => {
    const load = () => {
      const data = localStorage.getItem("bookings");

      if (data) {
        setBookings(JSON.parse(data));
      } else {
        setBookings([]);
      }
    };

    load();

    window.addEventListener("storage", load);

    return () => {
      window.removeEventListener("storage", load);
    };
  }, []);

  // Block render until loaded
  if (bookings === null) {
    return null;
  }

  return (
    <>
      <Navbar />

      <div className="container">

        {/* REQUIRED */}
        <h1>My Bookings</h1>

        {bookings.map((b, i) => (
          <div key={i} className="booking-card">

            {/* REQUIRED */}
            <h3>{b.name}</h3>

            <p>{b.city}, {b.state}</p>
            <p>{b.date}</p>
            <p>{b.time}</p>

          </div>
        ))}

      </div>
    </>
  );
}