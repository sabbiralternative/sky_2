import { useDispatch } from "react-redux";
import { useLogo } from "../../../context/ApiProvider";
import { useRef, useState } from "react";
import useCloseModalClickOutside from "../../../hooks/closeModal";
import {
  setShowBanner,
  setShowLoginModal,
  setShowRegisterModal,
} from "../../../redux/features/global/globalSlice";
import useWhatsApp from "../../../hooks/whatsapp";
import { API, Settings } from "../../../api";
import { AxiosSecure } from "../../../lib/AxiosSecure";
import toast from "react-hot-toast";
import getOtpOnWhatsapp from "../../../hooks/getOtpOnWhatsapp";
import images from "../../../assets/images";
import { useRegisterMutation } from "../../../redux/features/auth/authApi";
import { setUser } from "../../../redux/features/auth/authSlice";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const [handleRegister] = useRegisterMutation();
  const { data: socialLink } = useWhatsApp();
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
    dispatch(setShowRegisterModal(false));
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

  const getWhatsAppId = (link) => {
    window.open(link, "_blank");
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
                      {referralCode && (
                        <div className="form-group">
                          <input
                            {...register("referralCode")}
                            defaultValue={referralCode}
                            readOnly
                            type="text"
                            className="form-control disabled"
                            placeholder="Enter Refer Code (Optional)"
                          />
                          <div className="inp-img">
                            <img
                              rel="preload"
                              src="data:image/webp;base64,UklGRnwCAABXRUJQVlA4WAoAAAAwAAAADAAADAAASUNDUMgBAAAAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADZBTFBIbQAAAA1wUNtq2DwJqQPmoA62OVgdZA5aB6mDTgESMgeJg2YKRh0wDWs8RMQE0L3p3ehX/07eY3nsE4xuiECMWYq1tQQDXHJaiW0AJG/jDNcZEE0H/w6i6aAf0o/TTwBenG9AWRpUfTsQzYCn7gGoFwAAVlA4IBgAAAAwAQCdASoNAA0AAUAmJaQAA3AA/v02aAA="
                              alt=""
                            />
                          </div>
                        </div>
                      )}

                      <button
                        type="submit"
                        className="btn btn-register loader-btn mt-0"
                      >
                        Register
                        <span>
                          <b />
                          <b />
                          <b />
                        </span>
                      </button>
                      {socialLink?.whatsapplink && (
                        <>
                          <h3 className="whats-with">
                            Get Your Ready-Made ID From Whatsapp
                          </h3>
                          <div className="button-whatsapp">
                            <a
                              onClick={() =>
                                getWhatsAppId(socialLink?.whatsapplink)
                              }
                              className="btn-whatsapp"
                            >
                              <img
                                rel="preload"
                                src="data:image/webp;base64,UklGRqQDAABXRUJQVlA4WAoAAAAwAAAAHgAAHQAASUNDUMgBAAAAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADZBTFBIgAEAAA2QkP1/1zgfBxcH+01B46CZAnoKSBWUKoAoaE5BQcGBggUFSxXsdwqWKfgHhZMQERPAVndwYlBNs7LfNBdWRdxRQ9rjbgCaC2INrtWgm7ojpHEA0CwXJ76+5g09lO7B0/ymtZf3ODzpQF/ZrMHciH1e8V/QV/bG6bu5nwsgNXpmf5puUgfAQwf4tnwrW4jWNaNCjc4gLeYwbCK01AMOOuAC+H5bwjWRCiZAAGvSJsaTecGSAFSgFLZPFQ5BF1MFnp0qyLOE4+vPHRQDxZgCcG1NO+Udy2d5as39qoAtumaAbG1eEEsn73HA3svcK+AgL7QsCH86E4/RIbW7ZjjAg/lIPawQ/nRIAyC/fkNDhmRsE9cIfetZ6gd4iMDbReqwhobUWlviBLToBzCeMOUJaMiZZQc9gIORT+xAh0VFeXxCBD2zdGTEHQm6wd1AzywFzA+ANg25AFKdgHxl1YEFisHXtoABKHFivYKSx/w4eA/CssSBjV36AJj78eAEis7KRlZQOCAuAAAAMAMAnQEqHwAeAD5dJI1Fo6IhG/QAOAXEtIAAVjc5exlXwAD+/Eo1f/+dPAAAAA=="
                                alt=""
                              />{" "}
                              Whatsapp Now
                            </a>
                          </div>
                        </>
                      )}

                      <p className="whats-with-acc">
                        Already have an account?{" "}
                        <a onClick={showLogin} data-bs-toggle="modal">
                          Login
                        </a>
                      </p>
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

export default Register;
