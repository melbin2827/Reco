import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function OtpInput() {
  const [otp, setOtp] = useState('');
  const location = useLocation();
  const email = location.state?.email;
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const response = await fetch('http://localhost:4000/auth/email/verify-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ otp })
    });

    const result = await response.json();
    if (response.ok) {
      if (result.isNewUser) {
        navigate('/name', { state: { email } });
      } else {
        navigate('/dashboard', { state: { email } });
      }
    } else {
      alert(result.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
