import {
  Routes,
  Route,
} from "react-router-dom";
import EmailInput from "./components/login/Email.jsx";
import OtpInput from './components/login/OtpInput.jsx';
import NameInput from './components/login/NameInput.jsx';
import Dashboard from './components/login/Dashboard.jsx';

export default function App() {
  
  return (
    <Routes>
      <Route path="/" element={<EmailInput />} />
      <Route path="/otp" element={<OtpInput />} />
      <Route path="/name" element={<NameInput />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}