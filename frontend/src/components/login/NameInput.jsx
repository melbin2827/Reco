import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function NameInput() {
  const [name, setName] = useState('');
  const location = useLocation();
  const email = location.state?.email;
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const response = await fetch('http://localhost:4000/input-name', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, name })
    });

    const result = await response.json();
    if (response.ok) {
      navigate('/dashboard', { state: { email } });
    } else {
      alert(result.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <button type="submit">Save Name</button>
      </form>
    </div>
  );
}
