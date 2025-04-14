import { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";


const clientId = "393138480612-36lq1t4hknhgsido310fmgd7i7209g4s.apps.googleusercontent.com"; // Correct Client ID

export default function Login() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [mail, setMail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    useEffect(() => {
        if (window.google) {
            window.google.accounts.id.initialize({
                client_id: clientId,
                callback: handleGoogleLogin,
            });

            window.google.accounts.id.renderButton(
                document.getElementById("googleSignInBtn"),
                { theme: "outline", size: "large" }
            );
        }

        // Auto-login if token exists
        const token = localStorage.getItem("authToken");
        if (token) navigate("/home");
    }, []);

    // Handle Email/Password Login
    const handleLogin = async () => {
        try {
            setError(null);
            const response = await axios.post("http://localhost:8080/api/login", { mail, password });

            if (response.data.token) {
                localStorage.setItem("authToken", response.data.token);
                navigate("/home");
            }
        } catch (error) {
            setError(error.response?.data?.message || "Login failed");
        }
    };

    // Handle Google Login
    const handleGoogleLogin = async (response) => {
        try {
            const { credential } = response;
            await axios.post("http://localhost:8080/api/google-login", { token: credential });

            localStorage.setItem("authToken", credential);
            navigate("/home");
        } catch (error) {
            console.error("Google login failed", error);
        }
    };

    return (
        <div className="d-flex min-vh-100 align-items-center justify-content-center bg-white p-4">
            <div className="card shadow-lg border border-secondary" style={{ maxWidth: "400px", width: "100%" }}>
                <div className="card-header text-center bg-dark text-white">
                    <h3 className="fw-bold">Login</h3>
                    <p className="text-light">Enter your credentials to access your account</p>
                </div>
                <div className="card-body">
                    {error && <p className="text-danger text-center">{error}</p>}
                    <div className="mb-3 position-relative">
                        <input 
                            type="email" 
                            value={mail} 
                            onChange={(e) => setMail(e.target.value)} 
                            className="form-control" 
                            placeholder="Email" 
                        />
                    </div>
                    <div className="mb-3 position-relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            className="form-control"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button
                            type="button"
                            className="btn btn-light position-absolute top-50 end-0 translate-middle-y border-0"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>
                    <button className="btn btn-dark w-100" onClick={handleLogin}>Sign in</button>
                    <div className="text-center my-3 position-relative">
                        <div className="border-top my-3"></div>
                        <span className="bg-white px-2 text-secondary">OR CONTINUE WITH</span>
                    </div>
                    <div className="d-flex justify-content-center">
                        <div id="googleSignInBtn"></div> {/* Google Sign-In Button */}
                    </div>
                </div>
                <div className="card-footer text-center bg-dark text-white">
                    <p className="mb-0">
                        Don't have an account? <Link to='/signup' className="text-light fw-bold">Sign up</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
