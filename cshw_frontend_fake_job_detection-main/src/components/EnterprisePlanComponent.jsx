import React from "react";
import { CheckCircle } from "lucide-react";

export default function EnterprisePlanComponent() {
  return (
    <div className="plan-container">
      <div className="card border-dark shadow-lg position-relative overflow-hidden">
      {/* Background Gradient Effect */}
      <div className="position-absolute top-0 start-0 w-100 h-100 bg-gradient bg-opacity-10 opacity-0 hover:opacity-100 transition-opacity"></div>

      {/* Card Header */}
      <div className="card-header bg-transparent border-bottom-0 text-center">
        <h5 className="card-title fw-bold">Enterprise</h5>
        <div className="fs-3 fw-bold text-dark">Custom</div>
        <p className="text-muted">For recruitment teams and organizations</p>
      </div>

      {/* Card Body */}
      <div className="card-body">
        <ul className="list-unstyled small">
          <li className="d-flex align-items-center gap-2">
            <CheckCircle className="text-dark" /> Everything in Pro
          </li>
          <li className="d-flex align-items-center gap-2">
            <CheckCircle className="text-dark" /> API access
          </li>
          <li className="d-flex align-items-center gap-2">
            <CheckCircle className="text-dark" /> Custom integrations
          </li>
          <li className="d-flex align-items-center gap-2">
            <CheckCircle className="text-dark" /> Dedicated account manager
          </li>
          <li className="d-flex align-items-center gap-2">
            <CheckCircle className="text-dark" /> SSO authentication
          </li>
        </ul>
      </div>

      {/* Card Footer */}
      <div className="card-footer bg-transparent border-top-0 text-center">
        <button className="btn btn-outline-dark w-100">Contact Sales</button>
      </div>
    </div>
    </div>
  );
}
