import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Confirmation() {
  const navigate = useNavigate();
  const [details, setDetails] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("bookingDetails");
    if (stored) setDetails(JSON.parse(stored));
  }, []);

  return (
    <div>
      <h2>Flight Booking App</h2>

      <div className="container">
        <h1>Booking Confirmed</h1>

        {details && (
          <div className="flight-card">
            <p>
              Passenger: <b>{details.passenger.name}</b>
            </p>
            <p>Email: {details.passenger.email}</p>
            <p>Phone: {details.passenger.phone}</p>

            {details.flight && (
              <>
                <p>
                  <b>{details.flight.from}</b> → <b>{details.flight.to}</b>
                </p>
                <p>
                  {details.flight.airline} ({details.flight.flightNo})
                </p>
                <p>
                  {details.flight.depart} - {details.flight.arrive}
                </p>
                <p>
                  Price: <b>RS. {details.flight.price}</b>
                </p>
              </>
            )}
          </div>
        )}

        <button style={{ marginTop: "15px" }} onClick={() => navigate("/")}>
          Go Home
        </button>
      </div>
    </div>
  );
}
