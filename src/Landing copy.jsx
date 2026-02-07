import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div>
      <h1>Phoenix Airlines</h1>
      <Link to="/flight-search">
        <button>Search Flights</button>
      </Link>
    </div>
  );
}