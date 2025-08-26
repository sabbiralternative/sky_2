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
import SearchBox from "./SearchBox";
import MobileSearch from "./MobileSearch";

const Navbar = () => {
  const [showMobileSearch, setShowMobileSearch] = useState(false);
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
            {!showMobileSearch && (
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
            )}

            <SearchBox />
            {showMobileSearch && (
              <MobileSearch setShowMobileSearch={setShowMobileSearch} />
            )}
            {!showMobileSearch && (
              <div
                onClick={() => setShowMobileSearch(true)}
                id="mobileSearchIcon"
                className="lg:hidden mr-[2px] flex items-center justify-center"
              >
                <span className="bg-none border-none shadow-none px-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={30}
                    height={20}
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M23.7068 22.2929L16.8818 15.468C18.2038 13.835 18.9998 11.76 18.9998 9.50008C18.9998 4.26213 14.7378 0.000152588 9.49988 0.000152588C4.26193 0.000152588 0 4.26208 0 9.50003C0 14.738 4.26197 19 9.49992 19C11.7599 19 13.8349 18.204 15.4678 16.882L22.2928 23.7069C22.4878 23.9019 22.7438 23.9999 22.9998 23.9999C23.2558 23.9999 23.5118 23.9019 23.7068 23.7069C24.0978 23.3159 24.0978 22.6839 23.7068 22.2929ZM9.49992 17C5.36395 17 2 13.636 2 9.50003C2 5.36405 5.36395 2.0001 9.49992 2.0001C13.6359 2.0001 16.9998 5.36405 16.9998 9.50003C16.9998 13.636 13.6359 17 9.49992 17Z"
                      fill="white"
                    />
                  </svg>
                </span>
              </div>
            )}

            {!showMobileSearch && (
              <>
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
              </>
            )}
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
