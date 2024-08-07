import React, { useState } from "react";
import { signin, signup } from "../services/user.services";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";

export const LoginForm = ({ type }) => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (type === "signin") {
      const res = await signin(form);
      if (res?.status === false) {
        toast.error(res?.message);
      } else {
        Cookies.set("token", res?.token);
        navigate("/");
      }
    } else if (type === "signup") {
      const res = await signup(form);
      if (res?.status === false) {
        toast.error(res?.message);
      } else {
        Cookies.set("token", res?.token);
        navigate("/");
      }
    }
  };

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      return navigate("/");
    }
  }, [navigate]);

  return (
    <>
      <ToastContainer />
      <div className="container d-flex vh-100">
        <div className="row justify-content-center align-self-center w-100">
          <div className="col-md-6 col-lg-5">
            <div className="card bg-light">
              <div className="card-body">
                <h3 className="cart-title text-center">
                  {type === "signin" ? "SignIn" : "SignUp"}
                </h3>
                <hr />
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="eamil"
                      name="email"
                      value={form?.email}
                      required
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Password
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="password"
                      name="password"
                      value={form?.password}
                      required
                      onChange={handleChange}
                    />
                  </div>
                  <button type="submit" className="btn btn-primary w-100">
                    Submit
                  </button>
                </form>
                <div className="d-flex mt-2 flex-column justify-content-center">
                  {type === "signin" ? (
                    <div>
                      <small>New User ?</small>
                      <Link to={"/signup"}> Signup</Link>
                    </div>
                  ) : (
                    <div>
                      <small>Alredy have an account ?</small>
                      <Link to={"/signin"}> Signin</Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
