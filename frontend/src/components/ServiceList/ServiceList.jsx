import "./serviceList.styles.css";
import { Link } from "react-router-dom";
import Carousel from "../Carousel/Carousel";

const ServiceList = ({ data }) => {
  return (
    <div id="service-list">
      {data.map((item, index) => {
        return (
          <Link
            to={`/service/all/${item._id}`}
            key={item._id}
            className="service-unit"
          >
            <div className="img-wrapper">
              {/* <img src={item.img[0]} alt="" /> */}
              <Carousel data={item.img} />
            </div>
            <p className="name"> {item.name} </p>
          </Link>
        );
      })}
    </div>
  );
};

export default ServiceList;