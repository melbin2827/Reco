import { Button } from "@mui/material";
import "./EmailFrame.css";

import React, { useState, useRef } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { useNavigate } from 'react-router-dom';

export default function EmailFrame({ className = "" }) {

    const [email, setEmail] = useState('');
    const [recaptchaToken, setRecaptchaToken] = useState(null);
    const recaptchaRef = useRef(null);
    const navigate = useNavigate();
  
    const handleContinueClick = (e) => {
      e.preventDefault();
  
      // Trigger reCAPTCHA programmatically
      if (recaptchaRef.current) {
        recaptchaRef.current.execute();
      }
    };
  
    const handleRecaptcha = async (value) => {
      setRecaptchaToken(value);
  
      if (value) {
        // Form submission
        const response = await fetch('http://localhost:4000/auth/email/otp', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, recaptchaResponse: value })
        });
  
        const result = await response.json();
        if (response.ok) {
          navigate('/otp', { state: { email } });
        } else {
          alert(result.message);
        }
      }
    };
  
  return (
    <div className={`design-1-parent ${className}`}>
      <img className="design-1-icon" alt="" src="/design-1.svg" />
      <img
        className="design-2-icon"
        loading="lazy"
        alt=""
        src="/design-2.svg"
      />
      <div className="main-content">
        <div className="main-content-child" />
        <div className="logo-wrapper">
          <img className="logo-icon" loading="lazy" alt="" src="/logo@2x.png" />
        </div>
        <div className="welcome-to-recotail-parent">
          <h3 className="welcome-to-recotail">Welcome to Recotail ! 👋</h3>
          <div className="please-sign-in-to">
            Please sign-in to your account and start the adventure
          </div>
        </div>
        <div>
        <form onSubmit={handleContinueClick}>
        <div className="login-form">
          <div className="email-field">
            <div className="email">Email</div>
            <div className="email-input">
              <div className="email-input-child" />
              <input
                className="enter-your-email"
                placeholder="Enter your email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>
          <Button
            type="submit"
            className="sign-in-button"
            disableElevation
            variant="contained"
            sx={{
              textTransform: "none",
              color: "#530bae",
              fontSize: "18",
              background: "rgba(231, 231, 255, 0.76)",
              border: "#e7e7ff solid 1px",
              borderRadius: "5px",
              "&:hover": { background: "rgba(231, 231, 255, 0.76)" },
              height: 48,
            }}
          >
            Log in / Sign Up
          </Button>
        </div>
        </form>
        <ReCAPTCHA
        sitekey="6Lf3kBoqAAAAAPE5V3ZXW9Z9uafYbUklFNOrENzL" // Replace this with your actual site key
        onChange={handleRecaptcha}
        ref={recaptchaRef}
        size="invisible" // Make the reCAPTCHA widget invisible
      />
        </div>
        <div className="divider-content-wrapper">
          <div className="divider-content">
            <div className="frame-parent">
              <div className="line-wrapper">
                <img
                  className="frame-child"
                  loading="lazy"
                  alt=""
                  src="/line-1.svg"
                />
              </div>
              <div className="or-log-in">or Log in with</div>
              <div className="line-container">
                <img
                  className="frame-item"
                  loading="lazy"
                  alt=""
                  src="/line-2.svg"
                />
              </div>
            </div>
            <div className="social-login">
              <Button
                className="google"
                startIcon={
                  <img width="25px" height="25px" src="/group-1.png" />
                }
                disableElevation
                variant="contained"
                sx={{
                  textTransform: "none",
                  color: "#530bae",
                  fontSize: "18",
                  background: "rgba(231, 231, 255, 0.76)",
                  border: "#530bae solid 1px",
                  borderRadius: "5px",
                  "&:hover": { background: "rgba(231, 231, 255, 0.76)" },
                  height: 55,
                }}
              >
                Google
              </Button>
              <Button
                className="facebook"
                startIcon={
                  <img width="25px" height="25px" src="/group-4.png" />
                }
                disableElevation
                variant="contained"
                sx={{
                  textTransform: "none",
                  color: "#530bae",
                  fontSize: "18",
                  background: "rgba(231, 231, 255, 0.76)",
                  border: "#530bae solid 1px",
                  borderRadius: "5px",
                  "&:hover": { background: "rgba(231, 231, 255, 0.76)" },
                  height: 55,
                }}
              >
                Facebook
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
