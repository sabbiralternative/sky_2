import { useState } from "react";
import SidebarLayout from "../../layout/SidebarLayout";
import { useChangePasswordMutation } from "../../redux/features/auth/authApi";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import ConditionFooter from "../../components/shared/ConditionFooter/ConditionFooter";
import { EyeClose, EyeOpen } from "../../assets/Icon";

const ChangePassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [handleChangePassword] = useChangePasswordMutation();

  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = async ({ password, newPassword, newPasswordConfirm }) => {
    const payload = {
      oldPassword: password,
      password: newPassword,
      passVerify: newPasswordConfirm,
    };

    const res = await handleChangePassword(payload).unwrap();
    if (res.success) {
      localStorage.removeItem("changePassword");
      toast.success(res?.result?.message);
      navigate("/dashboard");
    } else {
      toast.error(res?.error?.errorMessage);
    }
  };
  return (
    <div>
      <SidebarLayout>
        <div className="match-menu">
          <div data-v-64cc30e4 className="change-password pass-mobile my-1">
            <div data-v-64cc30e4 className="container-fluid">
              <div data-v-64cc30e4 className="row">
                <div data-v-64cc30e4 className="col-md-12">
                  <div data-v-64cc30e4 className="userTables">
                    <h2 data-v-64cc30e4>change password</h2>
                    <form
                      onSubmit={handleSubmit(onSubmit)}
                      data-v-64cc30e4
                      className="new-cp-form"
                    >
                      <div data-v-64cc30e4 className="row">
                        <div data-v-64cc30e4 className="col-md-6">
                          <div data-v-64cc30e4 className="form-group">
                            <div data-v-64cc30e4 className="las-input-rel">
                              <input
                                {...register("password", { required: true })}
                                data-v-64cc30e4
                                type={!showPassword ? "password" : "text"}
                                placeholder="Enter Old Password"
                                className="form-control"
                              />
                              <div
                                style={{ cursor: "pointer" }}
                                onClick={() => setShowPassword((prev) => !prev)}
                                data-v-64cc30e4
                                className="eye-icn-sec2"
                              >
                                {showPassword ? <EyeOpen /> : <EyeClose />}
                              </div>
                            </div>
                            {/**/}
                          </div>
                          <div data-v-64cc30e4 className="form-group">
                            <div data-v-64cc30e4 className="las-input-rel">
                              <input
                                data-v-64cc30e4
                                type={!showNewPass ? "password" : "text"}
                                placeholder="Enter New Password"
                                className="form-control"
                                {...register("newPassword", {
                                  required: true,
                                })}
                              />
                              <div
                                style={{ cursor: "pointer" }}
                                onClick={() => setShowNewPass((prev) => !prev)}
                                data-v-64cc30e4
                                className="eye-icn-sec2"
                              >
                                {showNewPass ? <EyeOpen /> : <EyeClose />}
                              </div>
                            </div>
                            {/**/}
                          </div>
                          <div data-v-64cc30e4 className="form-group">
                            <div data-v-64cc30e4 className="las-input-rel">
                              <input
                                {...register("newPasswordConfirm", {
                                  required: true,
                                })}
                                data-v-64cc30e4
                                type={!showConfirmPass ? "password" : "text"}
                                placeholder="Enter Confirm New Password"
                                className="form-control"
                                aria-describedby="addon-wrapping"
                              />
                              <div
                                style={{ cursor: "pointer" }}
                                onClick={() =>
                                  setShowConfirmPass((prev) => !prev)
                                }
                                data-v-64cc30e4
                                className="eye-icn-sec2"
                              >
                                {showConfirmPass ? <EyeOpen /> : <EyeClose />}
                              </div>
                            </div>
                            {/**/}
                          </div>
                          <div data-v-64cc30e4 className="form-group mt-2">
                            <button
                              data-v-64cc30e4
                              className="btn cp-btn loader-btn"
                              type="submit"
                            >
                              Change Password{" "}
                              <span data-v-64cc30e4>
                                <b data-v-64cc30e4 />
                                <b data-v-64cc30e4 />
                                <b data-v-64cc30e4 />
                              </span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <ConditionFooter />
        </div>
      </SidebarLayout>
    </div>
  );
};

export default ChangePassword;
