import { useState } from "react";
import { Link } from "react-router-dom";
import AuthService from "../services/auth-service";
import validator from "validator";

const Register = () => {
  // State variables for form input and error handling
  const [error, setError] = useState("");

  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Function to handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({
      ...userInfo,
      [name]: value,
    });
  };

  // Function to handle user registration
  const handleRegister = (e) => {
    e.preventDefault();

    // Validate email format
    if (!validator.isEmail(userInfo.email)) {
      return setError("Enter a valid email");
    }

    // Check if password matches confirm password
    if (userInfo.password !== userInfo.confirmPassword) {
      setUserInfo({
        ...userInfo,
        password: "",
        confirmPassword: "",
      });
      return setError("Passwords do not match");
    }

    // Prepare user data for registration
    let userData = {
      name: userInfo.name,
      email: userInfo.email,
      password: userInfo.password,
    };

    // Attempt to register the user
    AuthService.register(userData)
      .then((res) => {
        alert(`Welcome, ${userInfo.name}! You have registered successfully!`);
      })
      .catch((err) => {
        console.log(err);
        return setError("This email is already in use");
      });
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-4 offset-md-4">
          <div className="bg-white mt-4 p-4">
            <form onSubmit={handleRegister} className="row g-3">
              <h4>Welcome to Our Community</h4>
              {error && <span className="text-danger">{error}</span>}
              <div className="col-12">
                <input
                  type="text"
                  name="name"
                  value={userInfo.name}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Username"
                />
              </div>
              <div className="col-12">
                <input
                  type="text"
                  name="email"
                  value={userInfo.email}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="e.g., example@google.com"
                />
              </div>
              <div className="col-12">
                <input
                  type="password"
                  name="password"
                  value={userInfo.password}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Password"
                />
              </div>
              <div className="col-12">
                <input
                  type="password"
                  name="confirmPassword"
                  value={userInfo.confirmPassword}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Confirm Password"
                />
              </div>
              <div className="col-12">
                <button type="submit" className="btn btn-dark float-end">
                  Register
                </button>
              </div>
            </form>
            <hr />
            <div className="col-12">
              <p className="mb-0">
                Already have an account? <Link to="/login">Log In</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
