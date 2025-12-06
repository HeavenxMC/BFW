import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Feather } from 'lucide-react';
import { siteConfig } from '../config';
import './Landing.css';

const Landing = () => {
  return (
    <div className="landing">
      <div className="hero-section">
        <div className="hero-background"></div>
        <div className="hero-content">
          <div className="hero-icon">
            <Feather size={80} strokeWidth={1.5} />
          </div>
          <h1 className="hero-title animate-fade-in">{siteConfig.hero.title}</h1>
          <p className="hero-tagline animate-fade-in">{siteConfig.hero.tagline}</p>
          <div className="hero-buttons animate-fade-in">
            {siteConfig.hero.primaryButton.external ? (
              <a
                href={siteConfig.hero.primaryButton.link}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                {siteConfig.hero.primaryButton.text}
                <ArrowRight size={20} />
              </a>
            ) : (
              <Link to={siteConfig.hero.primaryButton.link} className="btn btn-primary">
                {siteConfig.hero.primaryButton.text}
                <ArrowRight size={20} />
              </Link>
            )}
            <Link to={siteConfig.hero.secondaryButton.link} className="btn btn-secondary">
              {siteConfig.hero.secondaryButton.text}
            </Link>
          </div>
        </div>
      </div>

      <div className="features-section">
        <div className="container">
          <h2 className="section-title">Why Join BLACK FEATHER?</h2>
          <div className="features-grid">
            {siteConfig.about.values.map((value, index) => (
              <div key={index} className="feature-card" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="feature-icon">
                  <Feather size={32} />
                </div>
                <h3 className="feature-title">{value.title}</h3>
                <p className="feature-description">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
