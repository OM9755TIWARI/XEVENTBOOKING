import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getStates, getCities } from "../utils/api";
import "../styles.css";

export default function SearchBar() {
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [state, setState] = useState("");
  const [city, setCity] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  /* Load States (with retry) */
  useEffect(() => {
    const loadStates = async () => {
      try {
        setLoading(true);

        const res = await getStates();
        setStates(res.data);

        setError("");
      } catch (err) {
        console.log("Server sleeping... retrying");

        setError("Waking up server...");

        // Retry after 3s
        setTimeout(loadStates, 3000);
      } finally {
        setLoading(false);
      }
    };

    loadStates();
  }, []);

  /* Load Cities (with error handling) */
  useEffect(() => {
    const loadCities = async () => {
      if (!state) return;

      try {
        const res = await getCities(state);
        setCities(res.data);
      } catch (err) {
        console.log("City fetch failed", err);
      }
    };

    loadCities();
  }, [state]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!state || !city) return;

    navigate(`/search?state=${state}&city=${city}`);
  };

  return (
    <>

      {/* Loading / Error Message */}
      {loading && <p>Loading states...</p>}
      {error && <p>{error}</p>}

      <form onSubmit={handleSubmit}>

        {/* REQUIRED ID */}
        <div id="state">
          <select
            value={state}
            onChange={(e) => setState(e.target.value)}
            disabled={loading}
          >
            <option value="">Select State</option>

            {states.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        {/* REQUIRED ID */}
        <div id="city">
          <select
            value={city}
            onChange={(e) => setCity(e.target.value)}
            disabled={!state}
          >
            <option value="">Select City</option>

            {cities.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        {/* REQUIRED BUTTON */}
        <button
          id="searchBtn"
          type="submit"
          disabled={loading}
        >
          Search
        </button>

      </form>
    </>
  );
}