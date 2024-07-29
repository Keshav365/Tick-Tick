import React from 'react';
import '../CSS/card.css';
import { Link } from "react-router-dom";
export default function Signup() {

    return (
        <>
            <div className="loginPita">
                {/* {error && (
            <div className="sideAlert error">
              <span className="closebtn" onClick={() => setError("")}>&times;</span>
              <p>{error}</p>
            </div>
          )} */}
                <div className="loginDiv">
                    <div className='signUp'>
                        <h1 className="logo-badge text-whitesmoke"></h1>
                        <h3 className="text-whitesmoke">Sign Up</h3>

                    </div>
                    <div className="container-content">
                        <form className="margin-t" >
                            <div>
                                <div className="form-group">
                                    <input type="text" className="form-control" placeholder="Email" required />
                                </div>
                            </div>
                            <div>
                                <div className="form-group">
                                    <input type="password" className="form-control" placeholder="Password" required />
                                </div>
                                <div className="form-group">
                                    <input type="password" className="form-control" placeholder="Confirm Password" required />
                                </div>
                            </div>
                            <div>
                                <button type="submit" className="form-button button-l margin-b">Sign Up</button>
                            </div>
                            <p className="text-whitesmoke text-center"><small>Already have an account?, <a to="/login">Sign In</a></small></p>
                        </form>
                        <p className="margin-t text-whitesmoke"><small>SupaDrive &copy; 2024,</small></p>
                    </div>
                </div>
            </div>
        </>
    );
}
