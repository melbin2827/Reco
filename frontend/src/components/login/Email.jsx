import EmailInputFrame from "./frame/EmailFrame.jsx";
import "./Email.css";

export default function Login() {
  return (
    <div className="login">
      <main className="login1">
        <section className="login-child" />
        <EmailInputFrame />
      </main>
    </div>
  );
};