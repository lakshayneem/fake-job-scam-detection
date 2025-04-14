import React, { useState } from "react";
import axios from "axios";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state

  const sendWelcomeMail = async () => {
    if (!email) {
      alert("Please enter a valid email!");
      return;
    }

    setLoading(true); // Start loading

    try {
      const response = await axios.post("http://localhost:8080/api/send-welcome-mail", { email });
      alert(response.data.message);
      setIsSubscribed(true);
    } catch (error) {
      alert("Error sending email. Please try again.");
      console.error(error);
    }

    setLoading(false); // Stop loading
  };

  return (
    <section className="w-100 py-5 py-md-7 position-relative overflow-hidden text-center">
      {/* Grid Background */}
      <div className="position-absolute top-0 start-0 w-100 h-100 bg-light opacity-10"></div>

      {/* Gradient Overlay */}
      <div className="position-absolute top-0 start-0 w-100 h-50 bg-gradient-to-b from-light to-transparent"></div>

      <div className="container position-relative">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            {/* Heading */}
            <h2 className="display-5 fw-bold text-dark">
              Ready to protect yourself from job scams?
            </h2>
            <p className="lead text-muted">
              Join thousands of job seekers who use JobShield to stay safe in their job search.
            </p>
          </div>

          {/* Form */}
          <div className="col-md-6 col-lg-5 mt-4">
            <div className="d-flex gap-2">
              <input
                type="email"
                className="form-control shadow-sm border-primary border-opacity-25"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading} // Disable input when loading
              />
              <button
                onClick={sendWelcomeMail}
                className="btn btn-dark shadow"
                disabled={loading} // Disable button when loading
              >
                {loading ? "Sending..." : "Know more about us"}
              </button>
            </div>
            <p className="small text-muted mt-2">
              Free plan available. No credit card required.{" "}
              <a href="/terms" className="text-decoration-underline text-primary">
                Terms & Conditions
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
