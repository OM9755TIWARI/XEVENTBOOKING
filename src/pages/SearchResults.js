import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import Navbar from "../components/Navbar";
import EventCard from "../components/EventCard";
import { getEvents } from "../utils/api";
import "../styles.css";

export default function SearchResults() {
  const [params] = useSearchParams();

  const state = params.get("state");
  const city = params.get("city");

  const [events, setEvents] = useState([]);

  useEffect(() => {
    getEvents(state, city).then((res) => {
      setEvents(res.data);
    });
  }, [state, city]);

  return (
    <>
      <Navbar />

      <div className="container">

        {/* REQUIRED FORMAT */}
        <h1>
          {events.length} events available in {city}
        </h1>

        <div className="events-grid">
          {events.map((e) => (
            <EventCard key={e.id} event={e} />
          ))}
        </div>

      </div>
    </>
  );
}