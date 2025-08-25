import { useDispatch } from "react-redux";
import { useLogo } from "../../../context/ApiProvider";
import { useRef, useState } from "react";
import useCloseModalClickOutside from "../../../hooks/closeModal";
import {
  setShowBanner,
  setShowForgotPasswordModal,
  setShowLoginModal,
  setShowRegisterModal,
} from "../../../redux/features/global/globalSlice";
import { API, Settings } from "../../../api";
import { AxiosSecure } from "../../../lib/AxiosSecure";
import toast from "react-hot-toast";
import getOtpOnWhatsapp from "../../../hooks/getOtpOnWhatsapp";
import images from "../../../assets/images";
import { useRegisterMutation } from "../../../redux/features/auth/authApi";
import { setUser } from "../../../redux/features/auth/authSlice";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const [handleRegister] = useRegisterMutation();
  const referralCode = localStorage.getItem("referralCode");
  const { logo } = useLogo();
  const dispatch = useDispatch();
  const [mobile, setMobile] = useState("");
  const [OTP, setOTP] = useState({});

  const registerRef = useRef();
  useCloseModalClickOutside(registerRef, () => {
    closeModal();
  });

  const closeModal = () => {
    dispatch(setShowForgotPasswordModal(false));
  };

  const showLogin = () => {
    closeModal();
    dispatch(setShowLoginModal(true));
  };

  const getOtp = async () => {
    /* Get Otp based on settings*/
    if (Settings.otp) {
      const otpData = {
        mobile: mobile,
      };

      const res = await AxiosSecure.post(API.otp, otpData);
      const data = res.data;
      if (data?.success) {
        setOTP({
          orderId: data?.result?.orderId,
          otpMethod: "sms",
        });
        toast.success(data?.result?.message);
      } else {
        toast.error(data?.error?.errorMessage);
      }
    }
  };

  const showRegister = () => {
    closeModal();
    dispatch(setShowLoginModal(true));
  };

  const handleMobileNo = (e) => {
    if (e.target.value.length <= 10) {
      setMobile(e.target.value);
    }
  };

  const handleGetOtpOnWhatsapp = async () => {
    await getOtpOnWhatsapp(mobile, setOTP);
  };

  const onSubmit = async (data) => {
    const registerData = {
      username: "",
      password: data?.password,
      confirmPassword: data?.confirmPassword,
      mobile: mobile,
      otp: data?.otp,
      isOtpAvailable: Settings.otp,
      referralCode: referralCode || data?.referralCode,
      orderId: OTP.orderId,
      otpMethod: OTP.otpMethod,
    };

    const result = await handleRegister(registerData).unwrap();

    if (result.success) {
      localStorage.removeItem("referralCode");
      const token = result?.result?.token;
      const bonusToken = result?.result?.bonusToken;
      const user = result?.result?.loginName;
      const memberId = result?.result?.memberId;
      const game = result?.result?.buttonValue?.game;
      const banner = result?.result?.banner;
      dispatch(setUser({ user, token, memberId }));
      localStorage.setItem("buttonValue", JSON.stringify(game));
      localStorage.setItem("bonusToken", bonusToken);
      localStorage.setItem("token", token);
      if (banner) {
        localStorage.setItem("banner", banner);
        dispatch(setShowBanner(true));
      }
      if (token && user) {
        dispatch(setShowRegisterModal(false));
        toast.success("Register successful");
        navigate("/dashboard");
      }
    } else {
      toast.error(result?.error?.description);
    }
  };

  return (
    <div className="register-account">
      <div
        className="modal fade register-page1 show"
        id="register-btn"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex={-1}
        aria-labelledby="staticBackdropLabel"
        style={{ display: "block" }}
        aria-modal="true"
        role="dialog"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content" ref={registerRef}>
            <div className="modal-body">
              <div className="container-fluid login-module-wrapper">
                <button
                  onClick={closeModal}
                  type="button"
                  className="btn-close close-top"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                />
                <div className="row">
                  <div className="col-12 col-md-5">
                    <div className="text-center">
                      <img
                        style={{
                          height: Settings.logoHeight,
                          width: Settings.logoWidth,
                          objectFit: "contain",
                        }}
                        rel="preload"
                        className="img-fluid logoregisterPage"
                        src={logo}
                        alt="logo"
                      />
                      <img
                        rel="preload"
                        src={images.loginImage}
                        className="img-fluid filterlogin m-top"
                      />
                    </div>
                  </div>
                  <div className="col-12 col-md-7">
                    <form
                      onSubmit={handleSubmit(onSubmit)}
                      className="reg-form"
                    >
                      <div className="form-group">
                        <div className="get-mob get-mob" disabled="false">
                          <div className="col-auto">
                            <select className="form-select w_length_s">
                              <option value={91}>+91</option>
                              <option value={880}>+880</option>
                              <option value={971}>+971</option>
                              <option value={977}>+977</option>
                              <option value={92}>+92</option>
                            </select>
                          </div>
                          <div className="inp-img">
                            <img rel="preload" src={images.mobile} alt="" />
                          </div>
                          <input
                            maxLength={10}
                            type="tel"
                            className="enabled form-control add"
                            id="autoSizingInput"
                            placeholder="Enter Phone Number"
                            onChange={(e) => handleMobileNo(e)}
                            value={mobile}
                          />
                          <div className="get-code">
                            <button
                              disabled={Settings.otp && mobile?.length < 10}
                              onClick={getOtp}
                              className="loader-btn"
                              type="button"
                            >
                              Get OTP on Message
                              <span>
                                <b />
                                <b />
                                <b />
                              </span>
                            </button>
                          </div>
                        </div>
                        <div>
                          <div
                            className="get-code"
                            style={{
                              marginTop: "3px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "end",
                            }}
                          >
                            <button
                              disabled={Settings.otp && mobile?.length < 10}
                              onClick={handleGetOtpOnWhatsapp}
                              className="loader-btn"
                              type="button"
                              style={{ position: "static" }}
                            >
                              Get OTP on Whatsapp
                              <span>
                                <b />
                                <b />
                                <b />
                              </span>
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="get-input-field for">
                        <div className="form-group">
                          <input
                            {...register("otp", { required: true })}
                            type="text"
                            maxLength={6}
                            className="form-control disabled"
                            placeholder="Enter OTP"
                          />
                          <div className="inp-img">
                            <img rel="preload" src={images.key} alt="" />
                          </div>
                        </div>
                      </div>
                      {/* <div className="get-input-field for">
                        <div
                          className="refer-code-hyper"
                          style={{ color: "white" }}
                        >
                          <a>Want to set UserID?</a>
                        </div>
                      </div> */}

                      <div className="get-input-field for">
                        <div className="form-group">
                          <input
                            {...register("password", { required: true })}
                            type="password"
                            className="form-control disabled"
                            placeholder="Enter Password"
                          />
                          <div className="inp-img">
                            <img rel="preload" src={images.lock} alt="" />
                          </div>
                        </div>
                      </div>
                      <div className="get-input-field for">
                        <div className="form-group">
                          <input
                            {...register("password", { required: true })}
                            type="password"
                            className="form-control disabled"
                            placeholder="Enter Confirm Password"
                          />
                          <div className="inp-img">
                            <img rel="preload" src={images.lock} alt="" />
                          </div>
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="btn btn-register loader-btn mt-0"
                      >
                        Update Password
                        <span>
                          <b />
                          <b />
                          <b />
                        </span>
                      </button>

                      <div data-v-2139d482="" className="for-pass">
                        <p data-v-2139d482="" className="login-with-acc">
                          Remember Your Password?&nbsp;{" "}
                          <a
                            data-v-2139d482=""
                            data-bs-toggle="modal"
                            onClick={showLogin}
                            style={{
                              color: "white",
                              textDecoration: "underline",
                            }}
                          >
                            Login
                          </a>
                        </p>
                        <p data-v-2139d482="" className="text-center">
                          <a
                            data-v-2139d482=""
                            onClick={showRegister}
                            data-bs-toggle="modal"
                            style={{
                              color: "white",
                              textDecoration: "underline",
                            }}
                          >
                            Create New Account
                          </a>
                        </p>
                      </div>
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

export default ForgotPassword;
