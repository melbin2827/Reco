import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function Dashboard() {
  const [userName, setUserName] = useState('');
  const location = useLocation();
  const email = location.state?.email;

  useEffect(() => {
    if (email) {
      fetch(`http://localhost:4000/user/${email}`)
        .then(response => response.json())
        .then(data => setUserName(data.name))
        .catch(error => console.error('Error fetching user data:', error));
    }
  }, [email]);

  return (
    <div>
      <h1>Welcome to your Dashboard{userName ? `, ${userName}` : '!'}</h1>
    </div>
  );
}
