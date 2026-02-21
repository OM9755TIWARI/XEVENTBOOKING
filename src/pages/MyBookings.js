import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import "../styles.css";

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const data =
      JSON.parse(localStorage.getItem("bookings")) || [];

    setBookings(data);
  }, []);

  return (
    <>
      <Navbar />

      <div className="container">

        {/* REQUIRED TAG */}
        <h1>My Bookings</h1>

        {bookings.map((b) => (
          <div key={b.id} className="booking-card">

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