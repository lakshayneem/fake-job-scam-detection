import { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Signup() {
  const navigate = useNavigate();
  const authToken = localStorage.getItem("authToken");

  // Redirect if already logged in
  useEffect(() => {
    if (authToken) {
      navigate("/home");
    }
  }, [authToken, navigate]);

  const [showPassword, setShowPassword] = useState(false);
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [name, setName] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);

  // Validate form fields
  useEffect(() => {
    setIsFormValid(name.trim() !== "" && mail.trim() !== "" && password.trim() !== "" && confirmPass.trim() !== "");
  }, [name, mail, password, confirmPass]);

  const handleSignup = async () => {
    if (password !== confirmPass) {
      alert("Passwords do not match");
      return;
    }
    try {
      const response = await axios.post("http://localhost:8080/api/signup", { name, mail, password });

      if (response.data.message === "User registered successfully") {
        alert("Signup successful!");
        const token = response.data.token;
        localStorage.setItem("authToken", token);
        navigate("/home"); // Redirect to home after signup
      }
    } catch (error) {
      alert(error.response?.data?.message || "Error signing up");
    }
  };

  return (
    <div className="d-flex min-vh-100 align-items-center justify-content-center bg-white p-4">
      <div className="card shadow-lg border border-secondary" style={{ maxWidth: "400px", width: "100%" }}>
        <div className="card-header text-center bg-dark text-white">
          <h3 className="fw-bold">Sign Up</h3>
          <p className="text-light">Create a new account</p>
        </div>
        <div className="card-body">
          <div className="mb-3 position-relative">
            <input value={name} onChange={(e) => setName(e.target.value)} type="text" className="form-control" placeholder="Full Name" required />
          </div>
          <div className="mb-3 position-relative">
            <input type="email" value={mail} onChange={(e) => setMail(e.target.value)} className="form-control" placeholder="Email" required />
          </div>
          <div className="mb-3 position-relative">
            <input
              type={showPassword ? "text" : "password"}
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="btn btn-light position-absolute top-50 end-0 translate-middle-y border-0"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          <div className="mb-3 position-relative">
            <input value={confirmPass} onChange={(e) => setConfirmPass(e.target.value)} type="password" className="form-control" placeholder="Confirm Password" required />
          </div>
          <button className="btn btn-dark w-100" onClick={handleSignup} disabled={!isFormValid}>
            Sign Up
          </button>
        </div>
        <div className="card-footer text-center bg-dark text-white">
          <p className="mb-0">
            Already have an account? <Link to="/login" className="text-light fw-bold">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
