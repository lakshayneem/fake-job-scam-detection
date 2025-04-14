import React from "react";
import { CheckCircle } from "lucide-react";

export default function FreePlanComponent() {
  return (
    <div className="plan-container">
      <div className="card border-dark-subtle shadow-lg overflow-hidden">
      {/* Hover Effect */}
      <div className="position-absolute top-0 start-0 w-100 h-100 bg-primary bg-opacity-10 opacity-0 hover:opacity-100 transition-opacity"></div>

      {/* Card Header */}
      <div className="card-header bg-transparent border-bottom-0">
        <h5 className="card-title fw-bold">Free</h5>
        <div className="fs-3 fw-bold">$0</div>
        <p className="text-muted">Basic protection for casual job seekers</p>
      </div>

      {/* Card Body */}
      <div className="card-body">
        <ul className="list-unstyled small">
          <li className="d-flex align-items-center gap-2">
            <CheckCircle className="text-dark" /> 5 job scans per month
          </li>
          <li className="d-flex align-items-center gap-2">
            <CheckCircle className="text-dark" /> Basic risk assessment
          </li>
          <li className="d-flex align-items-center gap-2">
            <CheckCircle className="text-dark" /> Email support
          </li>
        </ul>
      </div>

      {/* Card Footer */}
      <div className="card-footer bg-transparent border-top-0">
        <button className="btn btn-outline-dark w-100">Sign Up Free</button>
      </div>
    </div>
    </div>
  );
}
