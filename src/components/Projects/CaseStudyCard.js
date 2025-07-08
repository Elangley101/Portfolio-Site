import React from "react";

function CaseStudyCard({ title, summary, problem, role, technologies, solution, results, takeaways, codeAvailable, demoUrl, repoUrl, note }) {
  return (
    <div className="case-study">
      <h2>{title}</h2>
      
      {note && (
  <div style={{
    background: "linear-gradient(90deg, #667eea 0%, #764ba2 100%)",
    color: "#fff",
    padding: "12px 18px",
    borderRadius: "8px",
    marginBottom: "18px",
    border: "2px solid #a259ff",
    fontSize: "1.05rem",
    fontWeight: 600,
    boxShadow: "0 2px 12px rgba(102,126,234,0.12)",
    letterSpacing: "0.01em",
    display: "flex",
    alignItems: "center",
    gap: "8px"
  }}>
    📋 {note}
  </div>
)}
      
      <h3>Project Summary</h3>
      <p>{summary}</p>
      
      <h3>Problem & Goals</h3>
      <ul>
        {problem.map((item, index) => (
          <li key={index}><strong>{item.label}:</strong> {item.description}</li>
        ))}
      </ul>

      <h3>My Role & Responsibilities</h3>
      <p>{role}</p>

      <h3>Technologies & Tools</h3>
      <div className="tech-tags">
        {technologies.map((tech, index) => (
          <span key={index} className="tech-tag">{tech}</span>
        ))}
      </div>

      <h3>Solution & Approach</h3>
      <p>{solution}</p>

      <div className="results-section">
        <h3>Results & Impact</h3>
        <ul>
          {results.map((result, index) => (
            <li key={index}>{result}</li>
          ))}
        </ul>
      </div>

      <h3>Key Takeaways</h3>
      <p>{takeaways}</p>

      {/* Demo and Repository Buttons */}
      {(demoUrl || repoUrl) && (
        <div style={{
          marginTop: "24px",
          padding: "16px",
          background: "rgba(102, 126, 234, 0.05)",
          borderRadius: "8px",
          border: "1px solid rgba(102, 126, 234, 0.2)"
        }}>
          <h4 style={{ 
            color: "var(--primary-color)", 
            marginBottom: "12px", 
            fontSize: "1rem",
            fontWeight: "600"
          }}>
            🚀 Project Links
          </h4>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            {demoUrl && (
              <a 
                href={demoUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                style={{
                  background: "var(--gradient-primary)",
                  color: "white",
                  padding: "8px 16px",
                  borderRadius: "6px",
                  textDecoration: "none",
                  fontSize: "0.9rem",
                  fontWeight: "500",
                  transition: "all 0.3s ease",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px"
                }}
                onMouseOver={(e) => {
                  e.target.style.transform = "translateY(-2px)";
                  e.target.style.boxShadow = "var(--shadow-medium)";
                }}
                onMouseOut={(e) => {
                  e.target.style.transform = "translateY(0)";
                  e.target.style.boxShadow = "none";
                }}
              >
                📊 Live Demo
              </a>
            )}
            {repoUrl && (
              <a 
                href={repoUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                style={{
                  background: "var(--gradient-accent)",
                  color: "white",
                  padding: "8px 16px",
                  borderRadius: "6px",
                  textDecoration: "none",
                  fontSize: "0.9rem",
                  fontWeight: "500",
                  transition: "all 0.3s ease",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px"
                }}
                onMouseOver={(e) => {
                  e.target.style.transform = "translateY(-2px)";
                  e.target.style.boxShadow = "var(--shadow-medium)";
                }}
                onMouseOut={(e) => {
                  e.target.style.transform = "translateY(0)";
                  e.target.style.boxShadow = "none";
                }}
              >
                💻 View Code
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default CaseStudyCard;
