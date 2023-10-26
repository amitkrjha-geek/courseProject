import React, { useState } from "react";
import AuthService from "../services/auth-service";
import { Link } from "react-router-dom";

const Login = (props) => {
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  // Function to handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo({
      ...loginInfo,
      [name]: value,
    });
  };

  // Function to handle login form submission
  const handleLogin = async (e) => {
    e.preventDefault();

    let userData = {
      email: loginInfo.email,
      password: loginInfo.password,
    };

    AuthService.login(userData)
      .then((res) => {
        alert("Login successfully");
        localStorage.setItem("token", res.data.token);
        props.history.push("/");
        window.location.reload();
      })
      .catch((err) => {
        alert("Login failed");
        console.log(err);
      });
  };

  return (
    <div className="row">
      <div className="col col-md-6 offset-md-3">
        <div className="bg-white mt-4 p-4">
          <form action="" className="row g-3">
            <h4>Welcome back</h4>
            <div className="col-12">
              <input
                type="text"
                name="email"
                value={loginInfo.email}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter your email"
              />
            </div>
            <div className="col-12">
              <input
                type="password"
                name="password"
                value={loginInfo.password}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter your password"
              />
            </div>
            <div className="col-12">
              <button
                type="submit"
                className="btn btn-dark float-end"
                onClick={handleLogin}
              >
                Login
              </button>
            </div>
          </form>
          <hr />
          <div className="col-12">
            <p className="mb-1 text-center">
              Don't have an account? <Link to="/register">Register</Link>
            </p>
          </div>
          <div className="col-12 text-center">
            <Link to="/forgotPassword">Forgot Password</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
