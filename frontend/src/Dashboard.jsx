
import { useCallback, useEffect, useState } from "react";
import "./Dashboard.css";

const API_URL = "http://localhost:8080/api/assessment";

function formatCurrency(value) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Number(value) || 0);
}

function formatRecommendation(value) {
  return (value || "NOT AVAILABLE").replaceAll("_", " ");
}

export default function Dashboard() {
  const [assessments, setAssessments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadAssessments = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error(`Request failed: ${response.status}`);
      }

      const data = await response.json();

      if (!Array.isArray(data)) {
        throw new Error("Unexpected response from the server.");
      }

      setAssessments(data);
    } catch (err) {
      setError(
        err.message ||
          "Could not load assessment history. Check the backend."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAssessments();
  }, [loadAssessments]);

  const suitableCount = assessments.filter(
    (item) => item.recommendation === "PRELIMINARILY_SUITABLE"
  ).length;

  const totalFuelCost = assessments.reduce(
    (total, item) => total + (Number(item.annualFuelCost) || 0),
    0
  );

  return (
    <section className="farmer-dashboard" id="dashboard">
      <div className="dashboard-heading">
        <p className="dashboard-eyebrow">FARMER ASSISTANCE PLATFORM</p>
        <h2>Your farmer dashboard.</h2>
        <p>
          Review your saved tractor assessments and preliminary
          hybrid-conversion estimates.
        </p>
      </div>

      <div className="dashboard-stats">
        <article className="dashboard-stat">
          <span>Total assessments</span>
          <strong>{assessments.length}</strong>
          <small>Saved records</small>
        </article>

        <article className="dashboard-stat">
          <span>Preliminarily suitable</span>
          <strong>{suitableCount}</strong>
          <small>Based on current assessment rules</small>
        </article>

        <article className="dashboard-stat">
          <span>Combined annual fuel cost</span>
          <strong>{formatCurrency(totalFuelCost)}</strong>
          <small>Across saved assessments; not unique tractors</small>
        </article>
      </div>

      <div className="dashboard-history-heading">
        <div>
          <p className="dashboard-eyebrow">YOUR RECORDS</p>
          <h3>Assessment history</h3>
        </div>

        <button
          type="button"
          className="dashboard-refresh"
          onClick={loadAssessments}
          disabled={loading}
        >
          {loading ? "Loading..." : "Refresh"}
        </button>
      </div>

      {loading && (
        <div className="dashboard-message">
          Loading your saved assessments...
        </div>
      )}

      {!loading && error && (
        <div className="dashboard-error" role="alert">
          <p>{error}</p>
          <button type="button" onClick={loadAssessments}>
            Try again
          </button>
        </div>
      )}

      {!loading && !error && assessments.length === 0 && (
        <div className="dashboard-empty">
          <h3>No assessments yet</h3>
          <p>
            Complete the tractor assessment form to see your first
            saved record here.
          </p>
          <a href="#assessment">Start an assessment</a>
        </div>
      )}

      {!loading && !error && assessments.length > 0 && (
        <div className="dashboard-records">
          {assessments.map((item) => (
            <article className="dashboard-record" key={item.id}>
              <div className="dashboard-record-main">
                <span className="dashboard-record-id">
                  ASSESSMENT #{item.id}
                </span>

                <h4>
                  {item.make} {item.model}
                </h4>

                <p>
                  Tractor age: {item.ageYears} years
                </p>
              </div>

              <div className="dashboard-record-details">
                <span>Annual fuel cost</span>
                <strong>{formatCurrency(item.annualFuelCost)}</strong>

                <span>Conversion cost estimate</span>
                <strong>
                  {formatCurrency(item.estimatedConversionCost)}
                </strong>
              </div>

              <div className="dashboard-record-result">
                <span className="dashboard-result-label">
                  Preliminary result
                </span>

                <strong>
                  {formatRecommendation(item.recommendation)}
                </strong>

                <span>
                  Estimated payback
                </span>

                <strong>
                  {item.estimatedPaybackYears == null
                    ? "Not available"
                    : `${item.estimatedPaybackYears} years`}
                </strong>
              </div>
            </article>
          ))}
        </div>
      )}

      <p className="dashboard-disclaimer">
        These results are preliminary estimates, not engineering
        approval or guaranteed savings. A qualified professional
        must inspect the tractor before any conversion decision.
      </p>
    </section>
  );
}
