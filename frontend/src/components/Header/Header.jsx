import "./header.styles.css";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="main-header">
      <div className="container">
        <Link to="/">
          <h1 className="Link-i">Link-i</h1>
        </Link>

        <nav>
          <Link to="/">Home</Link>
          <Link to="/services">Services</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;