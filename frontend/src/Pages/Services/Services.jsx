import { getServices, reset } from "../../features/serviceSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import ServiceList from "../../components/ServiceList/ServiceList";
const Services = () => {
  const dispatch = useDispatch();
  const { services } = useSelector((state) => state.service);
  useEffect(() => {
    dispatch(getServices());
    dispatch(reset());
  }, []);

  return (
    <div>
      <div>
        <div className="container">
          <h1 className="heading center">Services</h1>
          {services.length > 0 ? <ServiceList data={services} /> : null}
        </div>
      </div>
    </div>
  );
};

export default Services;