
import { useState } from "react";
import "./ChargingFinder.css";

export default function ChargingFinder() {
  const [location, setLocation] = useState("");
  const [searchType, setSearchType] = useState("charging");

  const cleanLocation = location.trim();

  function openMapSearch() {
    if (!cleanLocation) {
      alert("Please enter your town or district first.");
      return;
    }

    const query =
      searchType === "charging"
        ? `EV charging stations near ${cleanLocation}`
        : `tractor electric conversion retrofit services near ${cleanLocation}`;

    const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;

    window.open(mapUrl, "_blank", "noopener,noreferrer");
  }

  function openWebSearch() {
    if (!cleanLocation) {
      alert("Please enter your town or district first.");
      return;
    }

    const query =
      searchType === "charging"
        ? `electric vehicle charging stations ${cleanLocation} India`
        : `electric tractor retrofit conversion services ${cleanLocation} India`;

    window.open(
      `https://www.google.com/search?q=${encodeURIComponent(query)}`,
      "_blank",
      "noopener,noreferrer"
    );
  }

  return (
    <section className="charging-finder" id="charging">
      <div className="charging-header">
        <p className="charging-eyebrow">LOCAL FARM SUPPORT</p>

        <h2>Find charging and conversion support.</h2>

        <p className="charging-intro">
          Explore charging locations and services that may help with
          electric or hybrid tractor projects. Confirm tractor compatibility
          and service availability directly with each provider.
        </p>
      </div>

      <div className="charging-panel">
        <label htmlFor="support-location">
          Enter your town or district
        </label>

        <input
          id="support-location"
          type="text"
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          placeholder="e.g. Hyderabad, Rangareddy, Warangal"
        />

        <label htmlFor="support-type">What are you looking for?</label>

        <select
          id="support-type"
          value={searchType}
          onChange={(event) => setSearchType(event.target.value)}
        >
          <option value="charging">EV charging stations</option>
          <option value="retrofit">Tractor retrofit and conversion services</option>
        </select>

        <div className="charging-actions">
          <button type="button" onClick={openMapSearch}>
            Search on Google Maps ↗
          </button>

          <button
            type="button"
            className="charging-secondary"
            onClick={openWebSearch}
          >
            Search the web ↗
          </button>
        </div>
      </div>

      <div className="charging-info-grid">
        <article className="charging-info-card">
          <span className="charging-number">01</span>
          <h3>Charging access</h3>
          <p>
            Check connector type, charging speed, operating hours,
            accessibility, and whether the site can accommodate your vehicle.
          </p>
        </article>

        <article className="charging-info-card">
          <span className="charging-number">02</span>
          <h3>Conversion support</h3>
          <p>
            Ask providers about tractor-specific experience, approved
            components, safety testing, warranty, and local service support.
          </p>
        </article>

        <article className="charging-info-card">
          <span className="charging-number">03</span>
          <h3>Before you decide</h3>
          <p>
            A listing in search results does not guarantee tractor compatibility.
            Get a qualified engineering assessment and a written cost estimate
            before committing to a conversion.
          </p>
        </article>
      </div>

      <p className="charging-disclaimer">
        Search results are supplied by external services and are not verified
        or endorsed by this application. Many public EV chargers may not be
        suitable for agricultural vehicles or tractor charging requirements.
      </p>
    </section>
  );
}
