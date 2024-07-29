import React, { useState } from 'react';
import '../CSS/signup_login.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Signup() {
  const [inputs, setInputs] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [passwordMatch, setPasswordMatch] = useState(true);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));

    if (name === 'confirmPassword') {
      setPasswordMatch(inputs.password === value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (inputs.password !== inputs.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    try {
      await axios.post("http://localhost:8081/api/auth/register", inputs);
      console.log('Form submitted');
    } catch (err) {
      const errorMessage = err.response?.data || 'An error occurred';
      setError(errorMessage);

      // Clear the error after 5 seconds
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
    <>
      {error && (
        <div className="sideAlert error">
          <span className="closebtn" onClick={() => setError("")}>&times;</span>
          <p>{error}</p>
        </div>
      )}
      <div className="loginDiv">
        <div className='signUp'>
          <h1 className="logo-badge text-whitesmoke"></h1>
          <h3 className="text-whitesmoke">Sign Up</h3>
        </div>
        <div className="container-content">
          <form className="margin-t" onSubmit={handleSubmit}>
            <div>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Username"
                  name='username'
                  value={inputs.username}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Email"
                  name='email'
                  value={inputs.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div>
              <div className="form-group">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  name='password'
                  value={inputs.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Confirm Password"
                  name='confirmPassword'
                  value={inputs.confirmPassword}
                  onChange={handleChange}
                  required
                />
                {!passwordMatch && (
                  <p style={{ color: 'red' }}>Passwords do not match</p>
                )}
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="form-button button-l margin-b"
                disabled={!passwordMatch}
              >
                Sign Up
              </button>
            </div>
            <p className="text-whitesmoke text-center">
              Already have an account? <Link to="/login">Sign In</Link>
            </p>
          </form>
          <p className="margin-t text-whitesmoke">TickTick &copy; 2024</p>
        </div>
      </div>
    </>
  );
}
