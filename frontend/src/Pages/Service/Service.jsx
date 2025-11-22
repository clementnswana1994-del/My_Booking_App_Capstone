import "./service.styles.css";
import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { reset, deleteService } from "../../features/serviceSlice";
import Carousel from "../../components/Carousel/Carousel";

const Service = () => {
  const { isSuccess } = useSelector((state) => state.service);
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [service, setService] = useState(null);

  useEffect(() => {
    const getService = async () => {
      try {
        const res = await fetch(`/api/services/${id}`);

        if (res.ok) {
          const data = await res.json();
          setService(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getService();
  }, []);
  const handleDelete = () => {
    dispatch(deleteService(id));
  };

  return (
    <div id="service">
      <div className="container">
        {service ? (
          <div>
            <div className="img-wrapper">
              <Carousel data={service.img} />

              {/* <img src={service.img[0]} alt="" /> */}
            </div>
            <div className="text-wrapper">
              <h1 className="heading center"> {service.name} </h1>
              <p> {service.desc} </p>
              <h2> ${service.price.toFixed(2)} </h2>
            </div>

            <div className="cta-wrapper">
              <Link to={`/bookings/${service._id}`}>Book Now</Link>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Service;