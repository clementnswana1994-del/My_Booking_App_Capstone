import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { createBooking, reset } from "../../features/bookingSlice";
import { useDispatch, useSelector } from "react-redux";

const Booking = () => {
  const { id: serviceId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isSuccess } = useSelector((state) => state.booking);

  const [service, setService] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    confirm: "",
    
  });

  const { name, email, confirm } = formData;

  useEffect(() => {
    const getService = async () => {
      try {
        const res = await fetch(`/api/services/${serviceId}`);
        const data = await res.json();
        if (!res.ok) {
          return console.log("there was a problem getting service");
        }
        return setService(data);
      } catch (error) {
        console.log(error.message);
      }
    };
    getService();
  }, []);

  useEffect(() => {
    if (isSuccess) {
      navigate("/success");
      dispatch(reset());
    }
  }, [isSuccess]);

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const dataToSubmit = {
      serviceId,
      name,
      email,
      confirm,
    };

    dispatch(createBooking(dataToSubmit));
  };

  return (
    <div>
      <h1 className="heading center">Book Now</h1>
      <div className="form-wrapper">
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              value={name}
              placeholder="Enter full name"
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <label htmlFor="name">Email</label>
            <input
              type="text"
              name="email"
              value={email}
              placeholder="Enter your email address"
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <label htmlFor="name">Confirm</label>
            <input
              type="status"
              name="confirmation"
              value={confirmation}
              onChange={handleChange}
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Booking;