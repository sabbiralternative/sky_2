import { Link } from "react-router-dom";
import { Settings } from "../../../api";
import { useDispatch, useSelector } from "react-redux";
import Login from "../../modals/Login/Login";
import Register from "../../modals/Register/Register";
import {
  setShowLoginModal,
  setShowRegisterModal,
} from "../../../redux/features/global/globalSlice";
import ForgotPassword from "../../modals/ForgotPassword/ForgotPassword";
import useBalance from "../../../hooks/balance";
import RightDrawer from "../RightDrawer/RightDrawer";
import { useState } from "react";
import { useLogo } from "../../../context/ApiProvider";

const Navbar = () => {
  const { logo } = useLogo();
  const [showRightDrawer, setShowRightDrawer] = useState(false);
  const { data } = useBalance();
  const dispatch = useDispatch();
  const { showRegisterModal, showLoginModal, showForgotPasswordModal } =
    useSelector((state) => state.global);
  const { token } = useSelector((state) => state.auth);

  return (
    <>
      {showLoginModal && <Login />}
      {showRegisterModal && <Register />}
      {showForgotPasswordModal && <ForgotPassword />}

      <RightDrawer
        setShowRightDrawer={setShowRightDrawer}
        showRightDrawer={showRightDrawer}
      />

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
                  style={{
                    height: Settings.logoHeight,
                    width: Settings.logoWidth,
                    objectFit: "contain",
                  }}
                  rel="preload"
                  src={logo}
                  alt=""
                />
              </Link>
            </div>
            {!token ? (
              <div className="user-login index-view">
                <div className="mobile-login flex-d">
                  {Settings.registration && (
                    <button
                      onClick={() => dispatch(setShowRegisterModal(true))}
                      type="button"
                      className="btn btn-login-1 btn-register"
                      data-bs-toggle="modal"
                      data-bs-target="#register-btn"
                    >
                      Register
                    </button>
                  )}

                  <button
                    onClick={() => dispatch(setShowLoginModal(true))}
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
            ) : (
              <div className="user-login">
                <div className="main-exposure ng-star-inserted">
                  <div className="be_div">
                    <p>
                      <Link to="/market-analysis" className="">
                        Bal:<b>{data?.availBalance}</b>
                      </Link>
                      <Link to="/market-analysis" className="">
                        Exp:<b>{data?.deductedExposure}</b>
                      </Link>
                    </p>
                  </div>
                  <div className="dropdown drop-side">
                    <button
                      onClick={() => setShowRightDrawer(true)}
                      className="btn btn-secondary dropdown-toggle drop-menu"
                      type="button"
                      data-bs-toggle="offcanvas"
                      data-bs-target="#offcanvasExample"
                      aria-controls="offcanvasExample"
                    >
                      <i className="fa-solid fa-user"></i>My Account
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
