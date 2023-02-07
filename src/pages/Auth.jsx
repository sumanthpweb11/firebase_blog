import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { auth } from "../firebase/firebase";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Auth = ({ setActive, setUser }) => {
  const [state, setState] = useState(initialState);
  const [signUp, setSignUp] = useState(false);

  const navigate = useNavigate();

  const { email, password, firstName, lastName, confirmPassword } = state;

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleAuth = async (e) => {
    e.preventDefault();

    if (!signUp) {
      if (email && password) {
        const { user } = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        setUser(user);
        setActive("home");
      } else {
        return toast.error("Fields cannot be empty");
      }
    } else {
      // SIGNUP/REGISTER
      // if (!firstName || !lastName || !password || !confirmPassword || !email) {
      //   toast.error("Fields cannot be empty");
      // }
      if (password !== confirmPassword) {
        return toast.error("Password does not match");
      }

      if (firstName && lastName && email && password) {
        const { user } = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        await updateProfile(user, { displayName: `${firstName} ${lastName}` });

        setActive("home");
      } else {
        return toast.error("Fields cannot be empty");
      }
    }

    navigate("/");
  };
  return (
    <div className="container-fluid mb-4">
      <div className="container">
        <div className="col-12 text-center">
          <div className="text-center heading py-2">
            {!signUp ? "Sign-in" : "sign-up"}
          </div>
        </div>

        <div className="row justify-content-center align-items-center h-100">
          <div className="col=10 col-md-8 col-lg-6">
            <form className="row" onSubmit={handleAuth}>
              {signUp && (
                <>
                  {/* FIRSTNAME */}
                  <div className="col-6 py-3">
                    <input
                      type="text"
                      className="form-control input-text-box"
                      placeholder="firstname"
                      name="firstName"
                      value={firstName}
                      onChange={handleChange}
                    />
                  </div>
                  {/* LASTNAME */}
                  <div className="col-6 py-3">
                    <input
                      type="text"
                      className="form-control input-text-box"
                      placeholder="lastName"
                      name="lastName"
                      value={lastName}
                      onChange={handleChange}
                    />
                  </div>
                </>
              )}
              {/* EMAIL */}
              <div className="col-12 py-3">
                <input
                  type="email"
                  className="form-control input-text-box"
                  placeholder="email"
                  name="email"
                  value={email}
                  onChange={handleChange}
                />
              </div>

              {/* PASSWORD */}
              <div className="col-12 py-3">
                <input
                  type="password"
                  className="form-control input-text-box"
                  placeholder="password"
                  name="password"
                  value={password}
                  onChange={handleChange}
                />
              </div>
              {/* CONFIRM PASSWORD */}
              {signUp && (
                <div className="col-12 py-3">
                  <input
                    type="password"
                    className="form-control input-text-box"
                    placeholder="confirmPassword"
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={handleChange}
                  />
                </div>
              )}

              <div className="col-12 text-center py-3">
                <button
                  className={`btn ${!signUp ? "btn-sign-in" : "btn-sign-up"}`}
                  type="submit"
                >
                  {!signUp ? "Sign-in" : "sign-up"}
                </button>
              </div>
            </form>
            <div>
              {!signUp ? (
                <>
                  <div className="justify-content-center align-items-center text-center mt-2 pt-2 ">
                    <p className="small fw-bold pt-1 mt-2 mb-0 ">
                      Don't have an account ?{" "}
                      <span
                        className="link-danger"
                        style={{ textDecoration: "none", cursor: "pointer" }}
                        onClick={() => setSignUp(true)}
                      >
                        Sign up
                      </span>
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <div className="justify-content-center align-items-center text-center mt-2 pt-2 ">
                    <p className="small fw-bold pt-1 mt-2 mb-0 ">
                      Already have an account ?{" "}
                      <span
                        style={{
                          textDecoration: "none",
                          cursor: "pointer",
                          color: "#298af2",
                        }}
                        onClick={() => setSignUp(false)}
                      >
                        Sign In
                      </span>
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
