import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { siteConfig } from '../config';
import './Join.css';

const Join = () => {
  return (
    <div className="join-page">
      <div className="join-hero">
        <div className="container">
          <h1 className="section-title animate-fade-in">{siteConfig.joinRequirements.title}</h1>
          <p className="join-subtitle">{siteConfig.joinRequirements.subtitle}</p>
        </div>
      </div>

      <div className="join-content">
        <div className="container">
          <div className="requirements-section">
            <h2 className="requirements-title">Requirements</h2>
            <div className="requirements-grid">
              {siteConfig.joinRequirements.requirements.map((req, index) => (
                <div
                  key={index}
                  className="requirement-card"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="requirement-icon">
                    <CheckCircle2 size={28} />
                  </div>
                  <h3 className="requirement-title">{req.title}</h3>
                  <p className="requirement-description">{req.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="application-process">
            <h2 className="process-title">Application Process</h2>
            <div className="process-steps">
              {siteConfig.joinRequirements.applicationProcess.map((step, index) => (
                <div key={index} className="process-step" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="step-number">{index + 1}</div>
                  <p className="step-text">{step}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="join-cta">
            <p className="cta-text">Ready to become part of the flock?</p>
            <div className="cta-buttons">
              <a
                href={siteConfig.hero.primaryButton.link}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                Join Discord
                <ArrowRight size={20} />
              </a>
              <Link to="/contact" className="btn btn-secondary">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Join;
