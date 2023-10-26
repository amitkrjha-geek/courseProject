import React, { useState } from "react";
import authService from "../services/auth-service";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Function to handle forgot password form submission
  const forgotPasswordHandler = async (e) => {
    e.preventDefault();

    try {
      const { data } = await authService.forgotPassword({ email });
      console.log(data);
      setSuccess(
        "Please check your inbox for the link to reset your password."
      );
    } catch (err) {
      console.log(err);
      setEmail("");
      setError("Incorrect email address.");
    }
  };

  return (
    <div className="container">
      <div className="row">
        <h3 className="text-center">Forgot Password</h3>
        <div className="col-md-4 offset-md-4 bg-white mt-4 p-4">
          <form onSubmit={forgotPasswordHandler} className="row g-3">
            <h5 className="text-center">Reset Password</h5>
            {success && <span className="text-success">{success}</span>}
            {error && <span className="text-danger">{error}</span>}
            <input
              type="email"
              required
              id="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
            />
            <button
              type="submit"
              className="btn btn-dark float-end"
              disabled={success}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
