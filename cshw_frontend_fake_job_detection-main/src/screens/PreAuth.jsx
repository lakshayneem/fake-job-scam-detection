import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function PreAuth() {
  const navigate = useNavigate();
  const [review, setReview] = useState("");
  const [result, setResult] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [redirecting, setRedirecting] = useState(false);
  const [error, setError] = useState("");
  
  const authToken = localStorage.getItem("authToken");

  useEffect(() => {
    if (authToken) {
      navigate("/signup");
    }
  }, [authToken, navigate]);

  const analyzeReview = async (text) => {
    try {
      const response = await axios.post("http://127.0.0.1:5000/api/analyze", { review: text });
      return response.data;
    } catch (error) {
      console.error("Error analyzing review:", error);
      throw new Error("Analysis failed");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!review.trim()) {
      setError("Please write a review first");
      return;
    }

    setError("");
    setIsAnalyzing(true);

    try {
      const analysisResult = await analyzeReview(review);
      setResult(analysisResult);

      if (analysisResult.positive) {
        setRedirecting(true);
        setTimeout(() => {
          navigate("/signup");
        }, 2000);
      }
    } catch {
      setError("Something went wrong with the analysis. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleReset = () => {
    setReview("");
    setResult(null);
    setError("");
    setRedirecting(false);
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div className="card shadow-lg p-4 rounded-4 border-0" style={{ maxWidth: "600px", width: "100%" }}>
        <h1 className="text-center text-dark fw-bold">Are You Human?</h1>
        <p className="text-center text-muted">
          Share a positive restaurant experience, and our AI will analyze your sentiment. <br />
          (This helps us detect if a bot is using the website.)
        </p>

        <form onSubmit={handleSubmit} className="mt-3">
          <div className="mb-3">
            <label className="form-label fw-semibold">Your Review:</label>
            <textarea
              value={review}
              required={true}
              onChange={(e) => setReview(e.target.value)}
              className="form-control rounded-3 shadow-sm"
              placeholder="Write about your restaurant experience..."
              rows="4"
              disabled={isAnalyzing || redirecting}
            ></textarea>
          </div>
          {error && <div className="alert alert-danger p-2 text-center">{error}</div>}

          <div className="d-flex gap-3 justify-content-center">
            <button type="submit" className="btn btn-dark fw-semibold px-4" disabled={isAnalyzing || redirecting}>
              {isAnalyzing ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2"></span> Analyzing...
                </>
              ) : (
                "Analyze Sentiment"
              )}
            </button>
            {result && !redirecting && (
              <button type="button" className="btn btn-outline-dark px-4" onClick={handleReset}>
                Reset
              </button>
            )}
          </div>
        </form>

        {result && (
          <div className={`alert mt-4 text-center shadow-sm ${result.positive ? "alert-success" : "alert-danger"}`}>
            <div className="d-flex align-items-center justify-content-center">
              <i
                className={`bi ${result.positive ? "bi-check-circle-fill text-success" : "bi-x-circle-fill text-danger"}`}
                style={{ fontSize: "1.5rem", marginRight: "10px" }}
              ></i>
              <div>
                <h4 className="fw-bold">{result.positive ? "Positive Review!" : "Negative Review"}</h4>
                <p className="mb-1">
                  {result.positive
                    ? "Your review expresses a positive sentiment about your restaurant experience."
                    : "Your review expresses a negative sentiment about your restaurant experience."}
                </p>
                <p className="fw-bold mb-0">
                  Confidence Score: {(result.score * 100).toFixed(2)}%
                </p>
                {result.positive && (
                  <p className="text-success fw-bold mt-2">
                    Redirecting to application...
                    <br />
                    <span className="spinner-border spinner-border-sm"></span>
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
