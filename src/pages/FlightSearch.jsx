import { useState } from "react";
import { useNavigate } from "react-router-dom";

const flightsData = [
  {
    id: 1,
    airline: "Air India",
    flightNo: "AI-275",
    from: "Mumbai",
    to: "Bengaluru",
    depart: "04:00",
    arrive: "06:00",
    price: 3600,
    stops: "No Stops",
  },
  {
    id: 2,
    airline: "Air India",
    flightNo: "AI-275",
    from: "Mumbai",
    to: "Bengaluru",
    depart: "04:00",
    arrive: "06:00",
    price: 3600,
    stops: "No Stops",
  },
];

export default function FlightSearch() {
  const navigate = useNavigate();

  const [tripType, setTripType] = useState("oneway");
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [journeyDate, setJourneyDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [showFlights, setShowFlights] = useState(false);

  const isFormValid =
    source &&
    destination &&
    journeyDate &&
    (tripType === "oneway" || (tripType === "roundtrip" && returnDate));

  const handleSearch = () => {
    if (!isFormValid) return;
    setShowFlights(true);
  };

  const handleBook = (flight) => {
    localStorage.setItem(
      "selectedFlight",
      JSON.stringify({
        ...flight,
        tripType,
        journeyDate,
        returnDate: tripType === "roundtrip" ? returnDate : null,
      })
    );

    navigate("/flight-booking");
  };

  return (
    <div>
      <h2>Flight Booking App</h2>

      <div className="container">
        {/* Trip type */}
        <div>
          <label>
            <input
              type="radio"
              name="trip"
              checked={tripType === "oneway"}
              onChange={() => setTripType("oneway")}
            />
            One Way
          </label>

          <label style={{ marginLeft: "10px" }}>
            <input
              type="radio"
              name="trip"
              checked={tripType === "roundtrip"}
              onChange={() => setTripType("roundtrip")}
            />
            Round Trip
          </label>
        </div>

        {/* Source */}
        <div style={{ marginTop: "15px" }}>
          <label>Source City</label>
          <br />
          <select value={source} onChange={(e) => setSource(e.target.value)}>
            <option value="">Source City</option>
            <option value="Mumbai">Mumbai</option>
            <option value="Bengaluru">Bengaluru</option>
            <option value="Delhi">Delhi</option>
          </select>
        </div>

        {/* Destination */}
        <div style={{ marginTop: "15px" }}>
          <label>Destination City</label>
          <br />
          <select
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          >
            <option value="">Destination City</option>
            <option value="Mumbai">Mumbai</option>
            <option value="Bengaluru">Bengaluru</option>
            <option value="Delhi">Delhi</option>
          </select>
        </div>

        {/* Journey Date */}
        <div style={{ marginTop: "15px" }}>
          <label>Journey Date</label>
          <br />
          <input
            type="date"
            value={journeyDate}
            onChange={(e) => setJourneyDate(e.target.value)}
          />
        </div>

        {/* Return Date */}
        {tripType === "roundtrip" && (
          <div style={{ marginTop: "15px" }}>
            <label>Return Date</label>
            <br />
            <input
              type="date"
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
            />
          </div>
        )}

        {/* Search Button */}
        <div style={{ marginTop: "15px" }}>
          <button onClick={handleSearch} disabled={!isFormValid}>
            SEARCH FLIGHT
          </button>
        </div>

        {/* Flights List */}
        {showFlights && (
          <div style={{ marginTop: "30px" }}>
            {flightsData.map((flight) => (
              <div key={flight.id} className="flight-card">
                <div>
                  <strong>{flight.depart}</strong> {flight.from} →{" "}
                  <strong>{flight.arrive}</strong> {flight.to}
                </div>

                <div>
                  {flight.airline} ({flight.flightNo})
                </div>

                <div>{flight.stops}</div>

                <button
                  className="book-flight"
                  style={{ marginTop: "10px" }}
                  onClick={() => handleBook(flight)}
                >
                  RS. {flight.price}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
