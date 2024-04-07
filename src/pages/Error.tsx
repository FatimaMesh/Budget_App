import { Helmet, HelmetProvider } from "react-helmet-async";
import { Link } from "react-router-dom";

export const Error = () => {
  return (
    <HelmetProvider>
      <Helmet>
        <title>Error..</title>
      </Helmet>
      <header className="App-header">
        <h1>Budget Control</h1>
        <Link to="/" style={{ color: "black" }}>
          Home
        </Link>
      </header>
      <div style={{ marginTop: 60 }}>
        <h2>The page not found 404</h2>
      </div>
    </HelmetProvider>
  );
};
