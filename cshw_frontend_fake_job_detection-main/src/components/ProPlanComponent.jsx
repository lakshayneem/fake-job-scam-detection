import React from "react";
import { CheckCircle } from "lucide-react";

export default function ProPlanComponent() {
  return (
    <div className="plan-container">
      <div className="card border-dark shadow-lg position-relative overflow-hidden">
      {/* Background Gradient */}
      <div className="position-absolute top-0 start-0 w-100 h-100 bg-gradient bg-opacity-10 opacity-100"></div>
      
      {/* Gradient Decoration in Corner */}
      <div className="position-absolute top-0 end-0 translate-middle bg-gradient-to-br from-primary to-primary-subtle w-25 h-25 opacity-25"></div>

      {/* Card Header */}
      <div className="card-header bg-transparent border-bottom-0 text-center">
        <span className="badge bg-gradient text-light py-1 px-3 mb-2">Most Popular</span>
        <h5 className="card-title fw-bold">Pro</h5>
        <div className="fs-3 fw-bold text-dark">$9.99</div>
        <p className="text-muted">Monthly, cancel anytime</p>
      </div>

      {/* Card Body */}
      <div className="card-body">
        <ul className="list-unstyled small">
          <li className="d-flex align-items-center gap-2">
            <CheckCircle className="text-dark" /> Unlimited job scans
          </li>
          <li className="d-flex align-items-center gap-2">
            <CheckCircle className="text-dark" /> Advanced risk detection
          </li>
          <li className="d-flex align-items-center gap-2">
            <CheckCircle className="text-dark" /> Browser extension
          </li>
          <li className="d-flex align-items-center gap-2">
            <CheckCircle className="text-dark" /> Company verification
          </li>
          <li className="d-flex align-items-center gap-2">
            <CheckCircle className="text-dark" /> Priority support
          </li>
        </ul>
      </div>

      {/* Card Footer */}
      <div className="card-footer bg-transparent border-top-0 text-center">
        <button className="btn btn-dark w-100">Get Started</button>
      </div>
    </div>
    </div>
  );
}
