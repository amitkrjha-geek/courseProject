import React, { useState } from "react";
import authService from "../services/auth-service";
import { Link, useHistory } from "react-router-dom";

const ResetPassword = (props) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const history = useHistory();

  // Function to handle reset password form submission
  const resetPasswordHandler = async (e) => {
    e.preventDefault();

    // Check if password and confirmPassword match
    if (password !== confirmPassword) {
      setPassword("");
      setConfirmPassword("");
      return setError("Passwords do not match");
    }

    // Call the resetPassword function from authService with the reset token and new password
    authService
      .resetPassword(props.match.params.resetToken, { password })
      .then((res) => {
        alert("Password updated successfully!");
        setSuccess("Password updated successfully");
        history.push("/login"); // Redirect to login page after successful password reset
      })
      .catch((err) => {
        console.log(err);
        setError("Invalid token");
      });
  };

  return (
    <div className="container">
      <div className="row">
        <h3 className="text-center">Forgot Password</h3>
        <div className="col-md-4 offset-md-4 bg-light mt-4 p-4">
          <form onSubmit={resetPasswordHandler} className="row g-3">
            <h5 className="text-center">Reset Password</h5>
            {error && <span className="text-danger">{error}</span>}
            {success && (
              <span className="text-success">
                {success}{" "}
                <Link className="btn btn-success float-end" to="/login">
                  Login
                </Link>
              </span>
            )}
            <input
              type="password"
              required
              id="password"
              placeholder="Enter new Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
            />
            <input
              type="password"
              required
              id="confirmPassword"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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

export default ResetPassword;
