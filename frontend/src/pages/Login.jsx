import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authApi";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault()
    
  }
  return (
    <form onSubmit={}>
      <input type="email" />
      <input type="password" />
      <button type="submit"></button>
    </form>
  )
}

export default Login