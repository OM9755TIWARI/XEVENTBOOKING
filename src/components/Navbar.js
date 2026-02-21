import { Link } from "react-router-dom";
import "../styles.css";

export default function Navbar() {
  const toggleTheme = () => {
    document.body.classList.toggle("light");
  };

  return (
    <nav>
      <h2>XEEvent</h2>

      <div>
        <Link to="/">Find Events</Link>
        <Link to="/my-bookings">My Bookings</Link>

        <button className="theme-btn" onClick={toggleTheme}>
          🌙
        </button>
      </div>
    </nav>
  );
}