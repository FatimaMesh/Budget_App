import { Link } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";

import imageIcon from "../asset/homeImage.png";
import "../App.css";

export const Home = () => {
  return (
    <HelmetProvider>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <div className="home">
        <h1>Welcome to Budget Control</h1>
        <p>Hope you have a good experience</p>
        <img src={imageIcon} alt="image related to budget" />
        <button>
          <Link
            to="/budget-app"
            style={{ color: "#FFF", textDecoration: "none" }}
          >
            Lets Start
          </Link>
        </button>
      </div>
    </HelmetProvider>
  );
};
