import { useNavigate } from "react-router-dom";
import images from "../../../assets/images";
import { useLogo } from "../../../context/ApiProvider";
import { useRef, useState } from "react";
import { Settings } from "../../../api";
import { useLanguage } from "../../../context/LanguageProvider";
import { useDispatch } from "react-redux";
import { useLoginMutation } from "../../../redux/features/auth/authApi";
import useCloseModalClickOutside from "../../../hooks/closeModal";
import {
  setShowBanner,
  setShowForgotPasswordModal,
  setShowLoginModal,
  setShowRegisterModal,
} from "../../../redux/features/global/globalSlice";
import { useForm } from "react-hook-form";
import { setUser } from "../../../redux/features/auth/authSlice";
import toast from "react-hot-toast";
import { languageValue } from "../../../utils/language";
import { LanguageKey } from "../../../const";
import { EyeClose, EyeOpen } from "../../../assets/Icon";

const Login = () => {
  const [userName, setUserName] = useState(null);
  const navigate = useNavigate();
  const [tab, setTab] = useState(Settings.registration ? "mobile" : "userId");
  const { valueByLanguage } = useLanguage();
  const [showPassword, setShowPassword] = useState(false);
  const { logo } = useLogo();
  const dispatch = useDispatch();
  const [handleLogin] = useLoginMutation();
  const loginRef = useRef();
  useCloseModalClickOutside(loginRef, () => {
    dispatch(setShowLoginModal(false));
  });
  const { register, handleSubmit } = useForm();

  const onSubmit = async ({ password }) => {
    const loginData = {
      username: userName,
      password: password,
      b2c: Settings.b2c,
    };

    const result = await handleLogin(loginData).unwrap();

    if (result.success) {
      const token = result?.result?.token;
      const bonusToken = result?.result?.bonusToken;
      const user = result?.result?.loginName;
      const game = result?.result?.buttonValue?.game;
      const memberId = result?.result?.memberId;
      const banner = result?.result?.banner;

      dispatch(setUser({ user, token, memberId }));
      localStorage.setItem("memberId", memberId);
      localStorage.setItem("buttonValue", JSON.stringify(game));
      localStorage.setItem("token", token);
      localStorage.setItem("bonusToken", bonusToken);
      if (banner) {
        localStorage.setItem("banner", banner);
        dispatch(setShowBanner(true));
      }
      if (result?.result?.changePassword) {
        dispatch(setShowLoginModal(false));
        localStorage.setItem("changePassword", true);
        navigate("/change-password");
      }
      if (!result?.result?.changePassword && token && user) {
        dispatch(setShowLoginModal(false));
        toast.success("Login successful");
        navigate("/dashboard");
      }
    } else {
      toast.error(result?.error);
    }
  };

  /* handle login demo user */
  const loginWithDemo = async () => {
    /* Random token generator */
    /* Encrypted the post data */
    const loginData = {
      username: "demo",
      password: "",
      b2c: Settings.b2c,
    };
    const result = await handleLogin(loginData).unwrap();

    if (result.success) {
      const token = result?.result?.token;
      const bonusToken = result?.result?.bonusToken;
      const user = result?.result?.loginName;
      const game = result?.result?.buttonValue?.game;
      const banner = result?.result?.banner;

      dispatch(setUser({ user, token }));
      localStorage.setItem("buttonValue", JSON.stringify(game));
      localStorage.setItem("token", token);

      localStorage.setItem("bonusToken", bonusToken);
      if (banner) {
        localStorage.setItem("banner", banner);
        dispatch(setShowBanner(true));
      }
      if (token && user) {
        dispatch(setShowLoginModal(false));
        toast.success("Login successful");
      }
    } else {
      toast.error(result?.error);
    }
  };

  const closeLoginModal = () => {
    dispatch(setShowLoginModal(false));
  };

  const showRegister = () => {
    closeLoginModal();
    dispatch(setShowRegisterModal(true));
  };

  const showForgotPassword = () => {
    closeLoginModal();
    dispatch(setShowForgotPasswordModal(true));
  };

  return (
    <div data-v-74edfc72 className="login-account">
      <div
        data-v-74edfc72
        className="modal fade register-page1 show"
        id="staticBackdrop-one"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex={-1}
        aria-labelledby="staticBackdropLabel"
        style={{ display: "block" }}
        aria-modal="true"
        role="dialog"
      >
        <div
          data-v-74edfc72
          className="modal-dialog modal-lg modal-dialog-centered"
        >
          <div data-v-74edfc72 className="modal-content" ref={loginRef}>
            <div data-v-74edfc72 className="modal-body">
              <div
                data-v-74edfc72
                className="container-fluid login-module-wrapper"
              >
                <div data-v-74edfc72 className="row">
                  <button
                    onClick={closeLoginModal}
                    data-v-74edfc72
                    type="button"
                    className="btn-close close-top"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  />
                  <div data-v-74edfc72 className="col-12 col-md-5">
                    <div data-v-74edfc72 className="text-center">
                      <img
                        style={{
                          height: Settings.logoHeight,
                          width: Settings.logoWidth,
                          objectFit: "contain",
                        }}
                        data-v-74edfc72
                        rel="preload"
                        className="img-fluid logoregisterPage"
                        src={logo}
                        alt="logo"
                      />
                      <img
                        data-v-74edfc72
                        rel="preload"
                        src={images.loginImage}
                        className="img-fluid filterlogin m-top"
                      />
                    </div>
                  </div>
                  <div data-v-74edfc72 className="col-12 col-md-7">
                    <form
                      onSubmit={handleSubmit(onSubmit)}
                      data-v-74edfc72
                      className="reg-form"
                    >
                      <div data-v-74edfc72 className="form-login-tabs">
                        <nav data-v-74edfc72>
                          <div
                            data-v-74edfc72
                            className="nav nav-tabs"
                            id="nav-tab"
                            role="tablist"
                          >
                            {Settings.registration && (
                              <button
                                onClick={() => setTab("mobile")}
                                data-v-74edfc72
                                className={`nav-link ${
                                  tab === "mobile" ? "active" : ""
                                }`}
                                id="nav-Phone-tab"
                                data-bs-toggle="tab"
                                data-bs-target="#nav-Phone"
                                type="button"
                                role="tab"
                                aria-controls="nav-Phone"
                                aria-selected="true"
                              >
                                Phone
                              </button>
                            )}

                            <button
                              onClick={() => setTab("userId")}
                              data-v-74edfc72
                              className={`nav-link ${
                                tab === "userId" ? "active" : ""
                              }`}
                              id="nav-User-tab"
                              data-bs-toggle="tab"
                              data-bs-target="#nav-User"
                              type="button"
                              role="tab"
                              aria-controls="nav-User"
                              aria-selected="false"
                              tabIndex={-1}
                            >
                              User ID
                            </button>
                          </div>
                        </nav>
                        <div
                          data-v-74edfc72
                          className="tab-content"
                          id="nav-tabContent"
                        >
                          {/* Mobile tab content start */}
                          <div
                            data-v-74edfc72
                            className={`tab-pane fade ${
                              tab === "mobile" ? "show active" : ""
                            }`}
                            id="nav-Phone"
                            role="tabpanel"
                            aria-labelledby="nav-Phone-tab"
                          >
                            <div data-v-74edfc72 className="phonelogin">
                              <div data-v-74edfc72 className="get-mob">
                                <div data-v-74edfc72 className="col-auto">
                                  <select
                                    data-v-74edfc72
                                    className="form-select form-control"
                                    id="autoSizingSelect"
                                  >
                                    <option data-v-74edfc72 value={91}>
                                      +91
                                    </option>
                                    <option data-v-74edfc72 value={880}>
                                      +880
                                    </option>
                                    <option data-v-74edfc72 value={971}>
                                      +971
                                    </option>
                                    <option data-v-74edfc72 value={977}>
                                      +977
                                    </option>
                                    <option data-v-74edfc72 value={92}>
                                      +92
                                    </option>
                                  </select>
                                </div>
                                <div data-v-74edfc72 className="inp-img">
                                  <img
                                    data-v-74edfc72
                                    rel="preload"
                                    src={images.mobile}
                                    alt=""
                                  />
                                </div>
                                <input
                                  onChange={(e) => setUserName(e.target.value)}
                                  data-v-74edfc72
                                  type="tel"
                                  minLength={10}
                                  maxLength={10}
                                  className="form-control pl-0"
                                  placeholder="Enter Phone Number"
                                  value={userName}
                                  required={tab === "mobile"}
                                />
                              </div>
                              <div data-v-74edfc72>{/**/}</div>
                              {/* <div
                                data-v-74edfc72
                                className="d-flex login-method-section mt-3"
                              >
                                <div data-v-74edfc72 className="label-tabs">
                                  <input
                                    data-v-74edfc72
                                    className="form-check-input flexRadioDefault-sec"
                                    type="radio"
                                    name="login-method"
                                    id="login-password"
                                    defaultValue="password"
                                  />
                                  <label
                                    data-v-74edfc72
                                    htmlFor="login-password"
                                  >
                                    Password
                                  </label>
                                </div>
                                <div data-v-74edfc72 className="label-tabs">
                                  <input
                                    data-v-74edfc72
                                    className="form-check-input flexRadioDefault-sec"
                                    type="radio"
                                    name="login-method"
                                    id="login-otp"
                                    defaultValue="otp"
                                  />
                                  <label data-v-74edfc72 htmlFor="login-otp">
                                    OTP
                                  </label>
                                </div>
                              </div> */}
                            </div>
                          </div>
                          {/* Mobile tab content end */}
                          {/* User id tab content start */}
                          <div
                            data-v-74edfc72
                            className={`tab-pane fade ${
                              tab === "userId" ? "show active" : ""
                            }`}
                            id="nav-User"
                            role="tabpanel"
                            aria-labelledby="nav-User-tab"
                          >
                            <div data-v-74edfc72 className="get-mob">
                              <div data-v-74edfc72 className="inp-img">
                                <img
                                  data-v-74edfc72
                                  rel="preload"
                                  src={images.user}
                                  alt=""
                                />
                              </div>
                              <input
                                onChange={(e) => setUserName(e.target.value)}
                                data-v-74edfc72
                                type="text"
                                className="form-control add"
                                required={tab === "userId"}
                                placeholder="Enter User ID"
                                value={userName}
                              />
                            </div>
                          </div>
                          {/* User id tab content end */}
                        </div>
                      </div>
                      <div data-v-74edfc72>{/**/}</div>
                      <div data-v-74edfc72 className="password-input-box">
                        <div
                          data-v-74edfc72
                          className="get-mob for eye-pass-visible"
                        >
                          <input
                            {...register("password", { required: true })}
                            data-v-74edfc72
                            placeholder="Enter Password"
                            className="form-control"
                            type={showPassword ? "text" : "password"}
                          />
                          {/**/}
                          <div data-v-74edfc72 className="inp-img">
                            <img
                              data-v-74edfc72
                              rel="preload"
                              src={images.lock}
                              alt=""
                            />
                          </div>
                          <div
                            style={{ cursor: "pointer" }}
                            onClick={() => setShowPassword((prev) => !prev)}
                            data-v-74edfc72
                            className="eye-icn-sec"
                          >
                            {showPassword ? <EyeOpen /> : <EyeClose />}
                          </div>
                          {/**/}
                        </div>
                      </div>
                      {/**/}
                      {Settings.registration && (
                        <div
                          onClick={showForgotPassword}
                          data-v-74edfc72
                          className="for-pass"
                        >
                          <a
                            data-v-74edfc72
                            data-bs-toggle="modal"
                            style={{ color: "white" }}
                          >
                            Forgot Password?
                          </a>
                        </div>
                      )}

                      <div data-v-74edfc72 className="login-btn-wrapper">
                        <button
                          data-v-74edfc72
                          type="submit"
                          className="btn btn-register btn-login-blk loader-btn"
                        >
                          {languageValue(valueByLanguage, LanguageKey.LOGIN)}
                          <span data-v-74edfc72>
                            <b data-v-74edfc72 />
                            <b data-v-74edfc72 />
                            <b data-v-74edfc72 />
                          </span>
                        </button>
                        {Settings.demoLogin && (
                          <button
                            onClick={loginWithDemo}
                            data-v-74edfc72
                            type="button"
                            className="btn btn-register btn-login-blk loader-btn"
                          >
                            Log In With Demo ID{" "}
                            <span data-v-74edfc72>
                              <b data-v-74edfc72 />
                              <b data-v-74edfc72 />
                              <b data-v-74edfc72 />
                            </span>
                          </button>
                        )}
                      </div>
                      <h3 data-v-74edfc72 className="whats-with">
                        Get Your Ready-Made ID From WhatsApp
                      </h3>
                      <div data-v-74edfc72 className="button-whatsapp">
                        <a
                          data-v-74edfc72
                          href="//wa.me/+918602568885"
                          className="btn-whatsapp"
                          target="_blank"
                        >
                          <img
                            data-v-74edfc72
                            rel="preload"
                            src="data:image/webp;base64,UklGRqQDAABXRUJQVlA4WAoAAAAwAAAAHgAAHQAASUNDUMgBAAAAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADZBTFBIgAEAAA2QkP1/1zgfBxcH+01B46CZAnoKSBWUKoAoaE5BQcGBggUFSxXsdwqWKfgHhZMQERPAVndwYlBNs7LfNBdWRdxRQ9rjbgCaC2INrtWgm7ojpHEA0CwXJ76+5g09lO7B0/ymtZf3ODzpQF/ZrMHciH1e8V/QV/bG6bu5nwsgNXpmf5puUgfAQwf4tnwrW4jWNaNCjc4gLeYwbCK01AMOOuAC+H5bwjWRCiZAAGvSJsaTecGSAFSgFLZPFQ5BF1MFnp0qyLOE4+vPHRQDxZgCcG1NO+Udy2d5as39qoAtumaAbG1eEEsn73HA3svcK+AgL7QsCH86E4/RIbW7ZjjAg/lIPawQ/nRIAyC/fkNDhmRsE9cIfetZ6gd4iMDbReqwhobUWlviBLToBzCeMOUJaMiZZQc9gIORT+xAh0VFeXxCBD2zdGTEHQm6wd1AzywFzA+ANg25AFKdgHxl1YEFisHXtoABKHFivYKSx/w4eA/CssSBjV36AJj78eAEis7KRlZQOCAuAAAAMAMAnQEqHwAeAD5dJI1Fo6IhG/QAOAXEtIAAVjc5exlXwAD+/Eo1f/+dPAAAAA=="
                            alt=""
                          />{" "}
                          Whatsapp Now{" "}
                        </a>
                      </div>
                      {/* <div data-v-74edfc72 className="login-with-social">
                        <h3 data-v-74edfc72 className="whats-with">
                          Or Login With
                        </h3>
                        <ul
                          data-v-74edfc72
                          className="social-icon-wrapper"
                        ></ul>
                      </div> */}
                      {Settings.registration && (
                        <p data-v-74edfc72 className="whats-with-acc">
                          Don’t have an account ?{" "}
                          <a
                            data-v-74edfc72
                            onClick={showRegister}
                            data-bs-toggle="modal"
                          >
                            Sign UP
                          </a>
                        </p>
                      )}
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
