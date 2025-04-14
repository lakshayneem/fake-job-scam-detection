import { useState } from "react";
import { useEffect } from "react";

export default function Model() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState(null);
  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    let timer;
    if (cooldown > 0) {
      timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [cooldown]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (cooldown > 0) return;

    setIsSubmitting(true);
    setCooldown(3);
    const formData = new FormData(e.target);
    const formValues = Object.fromEntries(formData.entries());
  
    // Convert boolean inputs to 1 or 0
    formValues.telecommuting = formValues.telecommuting === "on" ? 1 : 0;
    formValues.has_company_logo = formValues.has_company_logo === "on" ? 1 : 0;
    formValues.has_questions = formValues.has_questions === "on" ? 1 : 0;
  
    console.log("Data being sent to API:", formValues);  // 🔥 Debugging step
  
    try {
      const response = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formValues),
      });
  
      const data = await response.json();
      console.log("API Response:", data);  // 🔥 Debugging step
  
      setResult({
        isFraudulent: data.prediction === "Fake Job Posting",
        confidence: parseFloat(data.confidence).toFixed(2),
      });
      
    } catch (error) {
      console.error("Error:", error);
      setResult(null);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="container mt-5">
      <h2 className="text-center">Fake Job Detection</h2>

      <form onSubmit={handleSubmit} className="p-4 border rounded shadow">
        <div className="mb-3">
          <label className="form-label">Company Profile</label>
          <textarea className="form-control" name="company_profile" required></textarea>
        </div>

        <div className="mb-3">
          <label className="form-label">Job Description</label>
          <textarea className="form-control" name="description" required></textarea>
        </div>

        <div className="mb-3">
          <label className="form-label">Job Requirements</label>
          <textarea className="form-control" name="requirements" required></textarea>
        </div>

        <div className="mb-3">
          <label className="form-label">Job Benefits</label>
          <textarea className="form-control" name="benefits"></textarea>
        </div>

        <div className="mb-3">
          <label className="form-label">Industry</label>
          <select className="form-select" name="industry" required>
            <option value="Information Technology and Services">Information Technology and Services</option>
            <option value="Marketing and Advertising ">Marketing and Advertising </option>
            <option value="Hospital & Health Care">Hospital & Health Care</option>
            <option value="Financial Services">Financial Services</option>
            <option value="Management Consulting">Management Consulting</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Employment Type</label>
          <select className="form-select" name="employment_type" required>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Contract">Contract</option>
            <option value="Temporary">Temporary</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Required Experience</label>
          <select className="form-select" name="required_experience" required>
            <option value="Not Applicable">Not Applicable</option>
            <option value="Entry Level">Entry Level</option>
            <option value="Mid-Senior Level">Mid-Senior Level</option>
            <option value="Associate">Associate</option>
            <option value="Director">Director</option>
            <option value="Internship">Internship</option>
            <option value="Executive">Executive</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Required Education</label>
          <select className="form-select" name="required_education" required>
            <option value="Unspecified">Unspecified</option>
            <option value="Bachelor's Degree ">Bachelor's Degree </option>
            <option value="High School or equivalent">High School or equivalent</option>
            <option value="Master's Degree">Master's Degree</option>
            <option value="Associate Degree">Associate Degree</option>
            <option value="Certification">Certification</option>
            <option value="Some College Coursework Completed ">Some College Coursework Completed </option>
            <option value="Professional ">Professional </option>
            <option value="Vocational">Vocational</option>
            <option value="Some High School Coursework">Some High School Coursework</option>
            <option value="Doctorate">Doctorate</option>
            <option value="Vocational - HS Diploma">Vocational - HS Diploma</option>
            <option value="Vocational - Degree">Vocational - Degree</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Job Function</label>
          <select className="form-select" name="function" required>
            <option value="Information Technology">Information Technology</option>
            <option value="Sales">Sales</option>
            <option value="Engineering">Engineering</option>
            <option value="Customer Service">Customer Service</option>
            <option value="Marketing">Marketing</option>
            <option value="Administrative">Administrative</option>
            <option value="Design">Design</option>
            <option value="Health Care Provider">Health Care Provider</option>
            <option value="Education">Education</option>
            <option value="Management">Management</option>
            <option value="Business Development">Business Development</option>
            <option value="Accounting/Auditing">Accounting/Auditing</option>
            <option value="Human Resources">Human Resources</option>
            <option value="Project Management">Project Management</option>
            <option value="Finance">Finance</option>
            <option value="Consulting">Consulting</option>
            <option value="Writing/Editing">Writing/Editing</option>
            <option value="Art/Creative">Art/Creative</option>
            <option value="Production">Production</option>
            <option value="Quality Assurance">Quality Assurance</option>
            <option value="Advertising">Advertising</option>
            <option value="Business Analyst">Business Analyst</option>
            <option value="Financial Analyst">Financial Analyst</option>
            <option value="Purchasing">Purchasing</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="form-check">
          <input className="form-check-input" type="checkbox" name="telecommuting" />
          <label className="form-check-label">Remote Job (Telecommuting)</label>
        </div>

        <div className="form-check">
          <input className="form-check-input" type="checkbox" name="has_company_logo" />
          <label className="form-check-label">Has Company Logo</label>
        </div>

        <div className="form-check">
          <input className="form-check-input" type="checkbox" name="has_questions" />
          <label className="form-check-label">Has Screening Questions</label>
        </div>

        {cooldown > 0 ? (
          <button type="button" className="btn btn-secondary w-100" disabled>
            Please wait {cooldown}s
          </button>
        ) : (
          <button type="submit" className="btn btn-dark w-100" disabled={isSubmitting}>
            {isSubmitting ? "Checking..." : "Check Job Posting"}
          </button>
        )}
      </form>

      {result && (
        <div className={`alert mt-4 ${result.isFraudulent ? "alert-danger" : "alert-success"}`}>
          <h4>{result.isFraudulent ? "Fake Job Posting!" : "Legitimate Job Posting"}</h4>
          <p>Confidence: {result.confidence}%</p>
        </div>
      )}
    </div>
  );
}
