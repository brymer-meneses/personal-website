import "../styles/Navbar.scss";
import { Link } from "react-router-dom";

const githubLink = "https://www.github.com/brymer-meneses";

function Navbar() {
  return (
    <nav>
      <h3 className="nav__title">
        <Link to="/"> Brymer Meneses </Link>
      </h3>
      <div className="nav__links">
        <ul>
          <li>
            <a href={githubLink}> [ Github ] </a>
          </li>
          <li>
            <Link to="about-me"> [ About Me ] </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
