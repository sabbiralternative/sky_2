import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="heading-section">
      <div className="container-fluid">
        <div className="haeder-nav flex-d">
          <div className="header-logo">
            <Link
              to="/"
              className="router-link-active router-link-exact-active"
              aria-current="page"
            >
              <img
                rel="preload"
                src="https://newprojectclick.s3.ap-south-1.amazonaws.com/site_logo/winzadda6463.png"
                alt=""
              />
            </Link>
          </div>
          <div className="user-login index-view">
            <div className="mobile-login flex-d">
              <button
                type="button"
                className="btn btn-login-1 btn-register"
                data-bs-toggle="modal"
                data-bs-target="#register-btn"
              >
                Register
              </button>
              <button
                type="button"
                className="btn btn-login-1"
                data-bs-toggle="modal"
                data-bs-target="#staticBackdrop-one"
              >
                <i className="fa-solid fa-user" />
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
