import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import "../styles.css";

export default function Home() {
  return (
    <>
      <Navbar />

      <div className="container">
        <h1>Find Events Near You</h1>

        <SearchBar />
      </div>
    </>
  );
}