import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div>
      <h2>Flight Booking App</h2>

      <div className="container">
        <h1>Welcome to Flight Booking App</h1>

        <Link to="/flight-search">
          <button>SEARCH FLIGHTS HERE</button>
        </Link>
      </div>
    </div>
  );
}