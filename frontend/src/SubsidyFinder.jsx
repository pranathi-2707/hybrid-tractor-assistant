
import { useMemo, useState } from "react";
import "./SubsidyFinder.css";

const schemes = [
  {
    id: 1,
    name: "Sub-Mission on Agricultural Mechanization (SMAM)",
    category: "Farm machinery",
    description:
      "Explore government assistance for eligible agricultural machinery and farm mechanization through the official DBT portal.",
    source: "Department of Agriculture & Farmers Welfare",
    url: "https://agrimachinery.nic.in/",
    status: "Check current availability",
    keywords: "tractor machinery farm mechanization smam",
  },
  {
    id: 2,
    name: "Government Scheme Directory",
    category: "General schemes",
    description:
      "Search government schemes and review their published eligibility criteria, benefits, and application information.",
    source: "National MyScheme Portal",
    url: "https://www.myscheme.gov.in/",
    status: "Check eligibility",
    keywords: "farmer agriculture benefits government schemes",
  },
  {
    id: 3,
    name: "Telangana Farm Mechanization Information",
    category: "State schemes",
    description:
      "Review the Telangana government's farm mechanization guidance. Confirm current-year availability and conditions with the relevant department.",
    source: "Government of Telangana",
    url: "https://mgov.telangana.gov.in/FarmMechGuide.html",
    status: "Verify current rules",
    keywords: "telangana tractor farm machinery subsidy",
  },
];

const categories = [
  "All schemes",
  "Farm machinery",
  "State schemes",
  "General schemes",
];

export default function SubsidyFinder() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All schemes");

  const filteredSchemes = useMemo(() => {
    const query = search.trim().toLowerCase();

    return schemes.filter((scheme) => {
      const matchesCategory =
        category === "All schemes" || scheme.category === category;

      const searchableText = [
        scheme.name,
        scheme.category,
        scheme.description,
        scheme.source,
        scheme.keywords,
      ]
        .join(" ")
        .toLowerCase();

      return matchesCategory && searchableText.includes(query);
    });
  }, [search, category]);

  return (
    <section className="subsidy-finder" id="subsidies">
      <div className="subsidy-hero">
        <p className="subsidy-eyebrow">FARMER SUPPORT</p>

        <h2>Find support for your farm.</h2>

        <p>
          Explore official scheme information, review eligibility
          conditions, and find government application portals.
        </p>

        <label className="subsidy-search-label" htmlFor="scheme-search">
          Search schemes
        </label>

        <input
          id="scheme-search"
          className="subsidy-search"
          type="search"
          placeholder="Try tractor, machinery, Telangana..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />

        <label className="subsidy-search-label" htmlFor="scheme-category">
          Filter by category
        </label>

        <select
          id="scheme-category"
          className="subsidy-select"
          value={category}
          onChange={(event) => setCategory(event.target.value)}
        >
          {categories.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      <div className="subsidy-results-heading">
        <div>
          <p className="subsidy-eyebrow">OFFICIAL RESOURCES</p>
          <h3>Explore available information</h3>
        </div>

        <span className="subsidy-count">
          {filteredSchemes.length} resources
        </span>
      </div>

      {filteredSchemes.length === 0 ? (
        <div className="subsidy-empty">
          No matching resources. Try another search or category.
        </div>
      ) : (
        <div className="subsidy-grid">
          {filteredSchemes.map((scheme) => (
            <article className="subsidy-card" key={scheme.id}>
              <div className="subsidy-card-top">
                <span className="subsidy-icon" aria-hidden="true">
                  {scheme.category === "State schemes"
                    ? "⌂"
                    : scheme.category === "Farm machinery"
                      ? "⚙"
                      : "✓"}
                </span>

                <span className="subsidy-category">
                  {scheme.category}
                </span>
              </div>

              <h4>{scheme.name}</h4>

              <p className="subsidy-description">
                {scheme.description}
              </p>

              <div className="subsidy-source">
                <span>Official information source</span>
                <strong>{scheme.source}</strong>
              </div>

              <p className="subsidy-status">
                {scheme.status}
              </p>

              <a
                className="subsidy-link"
                href={scheme.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit official website <span aria-hidden="true">↗</span>
              </a>
            </article>
          ))}
        </div>
      )}

      <div className="subsidy-notice">
        <strong>Before you apply</strong>
        <p>
          This directory does not confirm that a scheme is currently
          open or that you qualify. Benefits, application windows,
          required documents, and eligibility depend on the relevant
          official rules. Hybrid tractor retrofit costs may not qualify
          under machinery-purchase schemes. Confirm with the department
          before making financial decisions.
        </p>
      </div>
    </section>
  );
}
