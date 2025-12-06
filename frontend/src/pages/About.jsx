import React from 'react';
import { Shield, Target, Eye, Award } from 'lucide-react';
import { siteConfig } from '../config';
import './About.css';

const iconMap = {
  Loyalty: Shield,
  Discipline: Target,
  Silence: Eye,
  Excellence: Award,
};

const About = () => {
  return (
    <div className="about-page">
      <div className="about-hero">
        <div className="container">
          <h1 className="section-title animate-fade-in">{siteConfig.about.title}</h1>
        </div>
      </div>

      <div className="about-content">
        <div className="container">
          <div className="about-description animate-fade-in">
            <p className="description-text">{siteConfig.about.description}</p>
            <p className="mission-text">{siteConfig.about.mission}</p>
          </div>

          <div className="values-section">
            <h2 className="values-title">Our Core Values</h2>
            <div className="values-grid">
              {siteConfig.about.values.map((value, index) => {
                const Icon = iconMap[value.title];
                return (
                  <div key={index} className="value-card" style={{ animationDelay: `${index * 0.15}s` }}>
                    <div className="value-icon">
                      {Icon && <Icon size={40} strokeWidth={1.5} />}
                    </div>
                    <h3 className="value-title">{value.title}</h3>
                    <p className="value-description">{value.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
