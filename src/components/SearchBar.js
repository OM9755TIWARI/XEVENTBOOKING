import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getStates, getCities } from "../utils/api";
import "../styles.css";

export default function SearchBar() {
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  const [showStates, setShowStates] = useState(false);
  const [showCities, setShowCities] = useState(false);

  const navigate = useNavigate();

  /* Load States */
  useEffect(() => {
    const loadStates = async () => {
      try {
        const res = await getStates();
        setStates(res.data);
      } catch {
        setTimeout(loadStates, 3000);
      }
    };

    loadStates();
  }, []);

  /* Load Cities */
  useEffect(() => {
    const loadCities = async () => {
      if (!selectedState) return;

      try {
        const res = await getCities(selectedState);
        setCities(res.data);
      } catch {
        console.log("City fetch failed");
      }
    };

    loadCities();
  }, [selectedState]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedState || !selectedCity) return;

    navigate(`/search?state=${selectedState}&city=${selectedCity}`);
  };

  return (
    <form onSubmit={handleSubmit}>

      {/* STATE DROPDOWN */}
      <div id="state" className="dropdown">

        <button
          type="button"
          onClick={() => setShowStates(!showStates)}
        >
          {selectedState || "Select State"}
        </button>

        {showStates && (
          <ul className="dropdown-list">
            {states.map((s) => (
              <li
                key={s}
                onClick={() => {
                  setSelectedState(s);
                  setSelectedCity("");
                  setShowStates(false);
                }}
              >
                {s}
              </li>
            ))}
          </ul>
        )}

      </div>

      {/* CITY DROPDOWN */}
      <div id="city" className="dropdown">

        <button
          type="button"
          disabled={!selectedState}
          onClick={() => setShowCities(!showCities)}
        >
          {selectedCity || "Select City"}
        </button>

        {showCities && (
          <ul className="dropdown-list">
            {cities.map((c) => (
              <li
                key={c}
                onClick={() => {
                  setSelectedCity(c);
                  setShowCities(false);
                }}
              >
                {c}
              </li>
            ))}
          </ul>
        )}

      </div>

      {/* SEARCH */}
      <button id="searchBtn" type="submit">
        Search
      </button>

    </form>
  );
}