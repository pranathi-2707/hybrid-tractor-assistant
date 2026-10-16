import Dashboard from "./Dashboard";
import SubsidyFinder from "./SubsidyFinder";
import ChargingFinder from "./ChargingFinder";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import "./App.css";

const initialForm = {
  make: "Mahindra",
  model: "575 DI",
  ageYears: "8",
  annualFuelCost: "120000",
  estimatedConversionCost: "150000",
};

function App() {
  const heroRef = useRef(null);
  const [form, setForm] = useState(initialForm);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

const annualFuelCost = Number(form.annualFuelCost) || 0;
const conversionCost = Number(form.estimatedConversionCost) || 0;
const estimatedAnnualSavings = annualFuelCost * 0.30;
const fiveYearNetEstimate =
  estimatedAnnualSavings * 5 - conversionCost;

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-label", {
        y: 20,
        opacity: 0,
        duration: 0.7,
        stagger: 0.15,
      });

      gsap.from(".feature-card", {
        y: 25,
        opacity: 0,
        duration: 0.6,
        stagger: 0.12,
        delay: 0.25,
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  function updateField(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  async function submitAssessment(event) {
    event.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await fetch("http://localhost:8080/api/assessment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          make: form.make.trim(),
          model: form.model.trim(),
          ageYears: Number(form.ageYears),
          annualFuelCost: Number(form.annualFuelCost),
          estimatedConversionCost: Number(form.estimatedConversionCost),
        }),
      });

      if (!response.ok) {
        throw new Error(
          `Assessment request failed (${response.status}). Please check your inputs and backend.`
        );
      }

      setResult(await response.json());
    } catch (err) {
      setError(
        err instanceof TypeError
          ? "Could not reach the backend. Check that Spring Boot is running on port 8080 and browser access is enabled."
          : err.message
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="app-shell" ref={heroRef}>
      <nav className="navbar">
        <a className="brand" href="#">
          <span className="brand-mark">H</span>
          <span>
            HYBRID<span className="brand-light">TRACTOR</span>
          </span>
        </a>
        <span className="nav-status">FARMER ASSISTANCE PLATFORM</span>
      </nav>

      <section className="hero">
        <div className="hero-copy">
          <p className="hero-label eyebrow">SMART AGRICULTURAL MOBILITY</p>
          <h1 className="hero-label">
            A smarter path to <span>hybrid farming.</span>
          </h1>
          <p className="hero-label hero-description">
            Explore whether your tractor may be suitable for hybrid conversion.
            Understand estimated costs and potential savings before making a decision.
          </p>
          <a className="primary-button hero-label" href="#assessment">
            Start tractor assessment <span>↗</span>
          </a>
        </div>

        <div className="hero-visual">
          <div className="visual-orbit orbit-one" />
          <div className="visual-orbit orbit-two" />
          <div className="tractor-symbol">🚜</div>
          <div className="visual-note">
            <span className="status-dot" />
            EXPLORE YOUR OPTIONS
          </div>
        </div>
      </section>

      <section className="features" id="assessment">
        <div className="section-heading">
          <p className="eyebrow">PERSONALIZED ASSESSMENT</p>
          <h2>Tell us about your tractor.</h2>
          <p className="form-intro">
            Enter your tractor details and operating costs to receive a preliminary estimate.
          </p>
        </div>

        <form className="assessment-form" onSubmit={submitAssessment}>
          <label>
            Tractor make
            <input name="make" value={form.make} onChange={updateField}
              required maxLength={80} />
          </label>

          <label>
            Tractor model
            <input name="model" value={form.model} onChange={updateField}
              required maxLength={80} />
          </label>

          <label>
            Tractor age (years)
            <input name="ageYears" type="number" min="1" max="100"
              value={form.ageYears} onChange={updateField} required />
          </label>

          <label>
            Annual fuel cost (₹)
            <input name="annualFuelCost" type="number" min="1"
              value={form.annualFuelCost} onChange={updateField} required />
          </label>

          <label className="full-field">
            Estimated conversion cost (₹)
            <input name="estimatedConversionCost" type="number" min="1"
              value={form.estimatedConversionCost} onChange={updateField} required />
          </label>

          <button className="primary-button submit-button" type="submit" disabled={loading}>
            {loading ? "Assessing tractor..." : "Generate assessment"}
            <span>↗</span>
          </button>
        </form>

        {error && <p className="error-message" role="alert">{error}</p>}

            
{result && (
  <section className="result-panel" aria-live="polite">
    <p className="eyebrow">
      YOUR ASSESSMENT RESULT · ID {result.id}
    </p>

    <h2>
      {result.make} {result.model}
    </h2>

    <p className="result-status">
      {String(result.recommendation || "ASSESSMENT PENDING")
        .replaceAll("_", " ")}
    </p>

    <p className="financial-intro">
      Your preliminary financial overview
    </p>

    <div className="result-metrics">
      <div>
        <span>Annual fuel cost</span>
        <strong>
          ₹{annualFuelCost.toLocaleString("en-IN")}
        </strong>
      </div>

      <div>
        <span>Estimated annual savings</span>
        <strong>
          ₹{estimatedAnnualSavings.toLocaleString("en-IN", {
            maximumFractionDigits: 0,
          })}
        </strong>
      </div>

      <div>
        <span>Estimated payback</span>
        <strong>
          {result.estimatedPaybackYears != null
            ? `${result.estimatedPaybackYears} years`
            : "Unavailable"}
        </strong>
      </div>

      <div>
        <span>Five-year net estimate</span>
        <strong
          className={
            fiveYearNetEstimate >= 0
              ? "financial-positive"
              : "financial-negative"
          }
        >
          {fiveYearNetEstimate < 0 ? "−" : ""}
          ₹{Math.abs(fiveYearNetEstimate).toLocaleString("en-IN", {
            maximumFractionDigits: 0,
          })}
        </strong>
      </div>
    </div>

    <div className="financial-outlook">
      <h3>Preliminary financial outlook</h3>

      <p>
        {fiveYearNetEstimate > 0
          ? "Under these assumptions, estimated savings exceed the conversion cost over five years."
          : fiveYearNetEstimate === 0
            ? "Under these assumptions, estimated five-year savings equal the conversion cost."
            : "Under these assumptions, estimated five-year savings do not fully recover the conversion cost."}
      </p>
    </div>

    <p className="result-notice">
      {result.notice} This estimate assumes annual savings of 30% of
      current fuel costs and does not include electricity costs,
      maintenance changes, financing, downtime, or other expenses.
      Actual results may differ. Professional engineering and
      financial assessments are required before conversion.
    </p>
  </section>
)}
 </section>

      <Dashboard />
      <SubsidyFinder />
      <ChargingFinder />

      <footer>
        <span>HYBRIDTRACTOR ASSISTANT</span>
        <span>Technology for informed farming</span>
      </footer>
    </main>
  );
}
export default App;
