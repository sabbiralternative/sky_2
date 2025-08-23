import { Link } from "react-router-dom";

const MainNavbar = () => {
  return (
    <section className="main-navbar">
      <div className="topnav">
        <div className="container-fluid">
          <div className="market-nav flex-d">
            <div className="lef-nav">
              <nav className="navbar navbar-light navbar-expand-lg topnav-menu">
                <div
                  id="topnav-menu-content"
                  className="collapse navbar-collapse"
                  style={{ visibility: "visible" }}
                >
                  <ul className="navbar-nav">
                    <li className="nav-item">
                      <Link to="/dashboard" className>
                        Home
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/inplay" className>
                        In-Play
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/sports/cricket/4" className>
                        cricket
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/sports/soccer/1" className>
                        football
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/sports/tennis/2" className>
                        tennis
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/sports/esports/27454571" className>
                        Esports
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/sports/mixed-martial-arts/26420387" className>
                        Mixed Martial Arts
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/sports/gaelic-games/2152880" className>
                        Gaelic Games
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/sports/volleyball/998917" className>
                        Volleyball
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/sports/handball/468328" className>
                        Handball
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/sports/australian-rules/61420" className>
                        Australian Rules
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/sports/ice-hockey/7524" className>
                        Ice Hockey
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/sports/basketball/7522" className>
                        Basketball
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/sports/baseball/7511" className>
                        Baseball
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/sports/american-football/6423" className>
                        American Football
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/sports/snooker/6422" className>
                        Snooker
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/sports/table-tennis/27454574" className>
                        Table tennis
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/games/casino" className="hightlight-menus">
                        Casino
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        to="Javascript:void(0);"
                        className="new-tag-menus sb-menus"
                      >
                        Sports book <em>new</em>
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/games/evolution" className="hightlight-menus">
                        Evolution
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/sports/fifa-cup-winner/4343" className>
                        FIFA CUP WINNER
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/sports/winner-cup/4344" className>
                        WINNER CUP
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/sports/election/4345" className>
                        ELECTION
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/sports/kabaddi/27454572" className>
                        Kabaddi{" "}
                      </Link>
                    </li>
                  </ul>
                </div>
              </nav>
            </div>
            {/**/}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MainNavbar;
