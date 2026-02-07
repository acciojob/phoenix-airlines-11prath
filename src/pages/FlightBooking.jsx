import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function FlightBooking() {
  const navigate = useNavigate();

  const [flight, setFlight] = useState(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const stored = localStorage.getItem("selectedFlight");
    if (stored) setFlight(JSON.parse(stored));
  }, []);

  const validate = () => {
    const newErrors = {};

    if (!name.trim()) newErrors.name = "Name is required";
    if (!email.trim() || !email.includes("@"))
      newErrors.email = "Valid email is required";
    if (!phone.trim() || phone.length !== 10)
      newErrors.phone = "Phone must be 10 digits";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleConfirm = () => {
    if (!validate()) return;

    localStorage.setItem(
      "bookingDetails",
      JSON.stringify({
        flight,
        passenger: { name, email, phone },
      })
    );

    navigate("/confirmation");
  };

  return (
    <div>
      <h2>Flight Booking App</h2>

      <div className="container">
        <h1>Flight Booking</h1>

        {flight && (
          <div className="flight-card">
            <p>
              <b>{flight.from}</b> → <b>{flight.to}</b>
            </p>
            <p>
              {flight.airline} | {flight.flightNo}
            </p>
            <p>
              {flight.depart} - {flight.arrive}
            </p>
            <p>
              Price: <b>RS. {flight.price}</b>
            </p>
          </div>
        )}

        <div style={{ marginTop: "15px" }}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {errors.name && <p className="error">{errors.name}</p>}
        </div>

        <div style={{ marginTop: "15px" }}>
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>

        <div style={{ marginTop: "15px" }}>
          <input
            type="text"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          {errors.phone && <p className="error">{errors.phone}</p>}
        </div>

        <button style={{ marginTop: "15px" }} onClick={handleConfirm}>
          Confirm Booking
        </button>
      </div>
    </div>
  );
}
