import Navbar from "../components/Navbar";

export default function MyBookings() {

  const bookings =
    JSON.parse(localStorage.getItem("bookings")) || [];

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