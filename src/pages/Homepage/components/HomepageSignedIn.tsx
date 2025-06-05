import { Link } from "react-router-dom";

import { ScreenRoutes } from "../../../constants/routes";

export const HomepageSignedIn = () => {
  return (
    <div className="wrapper homepage">
      <main>
        <h1>Select a track</h1>
        <div className="country-list">
          <div className="country-list--entry">
            <h2>North America</h2>
            <ul className="listCircuits">
              <li>
                <Link to={ScreenRoutes.MOSPORT}>
                  Canadian Tire Motorsport Park - Mosport
                </Link>
              </li>
              <li>
                <Link to={ScreenRoutes.DAYTONA}>Daytona - Road course</Link>
              </li>
              <li>
                <Link to={ScreenRoutes.LAGUNA}>Laguna Seca</Link>
              </li>
              <li>
                <Link to={ScreenRoutes.ROADAMERICA}>Road America</Link>
              </li>
              <li>
                <Link to={ScreenRoutes.ROADATLANTA}>Road Atlanta</Link>
              </li>
              <li>
                <Link to={ScreenRoutes.SEBRING}>Sebring</Link>
              </li>
              <li>
                <Link to={ScreenRoutes.WATKINS}>Watkins Glen</Link>
              </li>
            </ul>
          </div>

          <div className="country-list--entry">
            <h2>Europe</h2>
            <ul className="listCircuits">
              <li>
                <Link to={ScreenRoutes.BARCELONA}>
                  Circuit de Catalunya (Barcelona)
                </Link>
              </li>
              <li>
                <Link to={ScreenRoutes.LEMANS}>
                  Le Mans - Circuit de la Sarthe
                </Link>
              </li>
              <li>
                <Link to={ScreenRoutes.MAGIONE}>Magione</Link>
              </li>
              <li>
                <Link to={ScreenRoutes.MUGELLO}>Mugello</Link>
              </li>
              <li>
                <Link to={ScreenRoutes.NURBURGRING}>Nurburgring</Link>
              </li>
              <li>
                <Link to={ScreenRoutes.SILVERSTONE}>Silverstone</Link>
              </li>
              <li>
                <Link to={ScreenRoutes.SPA}>Spa-Franchorchamps</Link>
              </li>
              <li>
                <Link to={ScreenRoutes.VALLELUNGA}>Vallelunga</Link>
              </li>
              <li>
                <Link to={ScreenRoutes.ZANDVOORT}>Zandvoort</Link>
              </li>
              <li>
                <Link to={ScreenRoutes.ZOLDER}>Zolder</Link>
              </li>
            </ul>
          </div>

          <div className="country-list--entry">
            <h2>Asia</h2>
            <ul className="listCircuits">
              <li>
                <Link to={ScreenRoutes.BAHRAIN}>Bahrain</Link>
              </li>
              <li>
                <Link to={ScreenRoutes.FUJI}>Fuji Speedway</Link>
              </li>
              <li>
                <Link to={ScreenRoutes.SHANGHAI}>Shanghai</Link>
              </li>
              <li>
                <Link to={ScreenRoutes.SUZUKA}>Suzuka</Link>
              </li>
            </ul>
          </div>
          <div className="country-list--entry">
            <h2>Australia</h2>
            <ul className="listCircuits">
              <li>
                <Link to={ScreenRoutes.BATHURST}>
                  Mount Panorama - Bathurst
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </main>
      <aside>
        <h2>About</h2>
        <p>
          Trackmap helps you capture track notes in a digital way, so you can
          improve your driving faster.
        </p>

        <p>Annotate your observations and car handling notes for each turn.</p>
        <p>The project is at early alpha. Use at your own risk.</p>
        <h3>Suggestions?</h3>
        <p>
          If you have suggestions or something is not quite right, please{" "}
          <a
            href="https://opb3adxlfse.typeform.com/to/sdJJgeJf"
            rel="noreferrer"
            target="_blank"
          >
            fill in this form
          </a>{" "}
          and we&apos;ll try to fix it as soon as humanly possible.
        </p>
      </aside>
    </div>
  );
};
