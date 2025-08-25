import Sports from "../../components/modules/Dashboard/Sports";
import LinkSlider from "../../components/modules/Dashboard/LinkSlider";
import SidebarLayout from "../../layout/SidebarLayout";

const Dashboard = () => {
  return (
    <div>
      <SidebarLayout>
        <div className="match-menu">
          <div className="popup-button">
            <ul className="nav nav-pills es-tabs-ui">
              <li className="nav-item">
                <button className="nav-link active">exchange</button>
              </li>
              <li className="nav-item">
                <button type="button" className="nav-link">
                  sportsbook
                </button>
              </li>
            </ul>
          </div>
          <div className="filter-dropdown-position">
            <div className="eventlistdesign flex-d desktop-drop-view">
              <div className="high-desk">
                <h2 className="high-desktop">highlights</h2>
              </div>
            </div>
            <div className="tab-set">
              <LinkSlider />
              <div className="eventlistdesign mobile-drop-view inplay-heading-title">
                <div className="high-desk">
                  <h2 className="high-desktop">highlights</h2>
                </div>
                <div className="filter-category-wrapper">
                  <ul className="live_virtual">
                    <li>
                      <input
                        type="checkbox"
                        className="filter-checkbox"
                        defaultValue="Order one"
                      />
                      <label>LIVE</label>
                    </li>
                    <li>
                      <input
                        type="checkbox"
                        className="filter-checkbox"
                        defaultValue="Order Two"
                      />
                      <label>VIRTUAL</label>
                    </li>
                  </ul>
                  <div className="dropdown viewby-filter">
                    <div className="dropdown">
                      <button
                        className="btn btn-secondary dropdown-toggle"
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <i className="fas fa-filter" /> View By
                      </button>
                      <ul className="dropdown-menu time-menu">
                        <li>
                          <a className="dropdown-item">Competition</a>
                        </li>
                        <li>
                          <a className="dropdown-item active">Time</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="search-icon-popup">
                <a data-bs-toggle="modal" data-bs-target="#search-event-modal">
                  <i className="fa-sharp fa-solid fa-magnifying-glass" />
                </a>
              </div>
              <Sports />
            </div>
          </div>
          <div className="condition-footer">
            <div className="row">
              <div className="col-md-12">
                <div className="inner-footer">
                  <div className="support-wrap">
                    <div className="support-mail">
                      <a className="rules-btn-home">Privacy Policy</a>
                      <a className="rules-btn-home arrow">KYC</a>
                      <a className="rules-btn-home arrow">
                        Terms and Conditions
                      </a>
                      <a className="rules-btn-home arrow">
                        Rules and Regulations
                      </a>
                      <a className="rules-btn-home arrow">
                        Responsible Gambling
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SidebarLayout>
    </div>
  );
};

export default Dashboard;
