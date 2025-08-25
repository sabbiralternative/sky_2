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
                            {showPassword ? (
                              <img
                                data-v-74edfc72=""
                                rel="preload"
                                src="data:image/webp;base64,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"
                              />
                            ) : (
                              <img
                                data-v-74edfc72
                                rel="preload"
                                src="data:image/png;base64,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"
                              />
                            )}
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
