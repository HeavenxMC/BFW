import React, { useState } from 'react';
import { ChevronDown, Crown, Radio, Target, AlertTriangle } from 'lucide-react';
import { siteConfig } from '../config';
import './Rules.css';

const iconMap = {
  crown: Crown,
  radio: Radio,
  target: Target,
  'alert-triangle': AlertTriangle,
};

const Rules = () => {
  const [expandedCategories, setExpandedCategories] = useState([]);

  const toggleCategory = (categoryId) => {
    setExpandedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  return (
    <div className="rules-page">
      <div className="rules-hero">
        <div className="container">
          <h1 className="section-title animate-fade-in">{siteConfig.rules.title}</h1>
          <p className="rules-subtitle">Our laws are non-negotiable. Follow them or face consequences.</p>
        </div>
      </div>

      <div className="rules-content">
        <div className="container">
          <div className="rules-categories">
            {siteConfig.rules.categories.map((category, index) => {
              const isExpanded = expandedCategories.includes(category.id);
              const Icon = iconMap[category.icon];

              return (
                <div
                  key={category.id}
                  className="rule-category"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <button
                    className="category-header"
                    onClick={() => toggleCategory(category.id)}
                    aria-expanded={isExpanded}
                  >
                    <div className="category-title-wrapper">
                      <div className="category-icon">
                        {Icon && <Icon size={24} />}
                      </div>
                      <h3 className="category-title">{category.title}</h3>
                    </div>
                    <ChevronDown
                      className={`category-arrow ${isExpanded ? 'expanded' : ''}`}
                      size={24}
                    />
                  </button>

                  <div className={`category-content ${isExpanded ? 'expanded' : ''}`}>
                    <div className="rules-list">
                      {category.rules.map((rule, ruleIndex) => (
                        <div key={ruleIndex} className="rule-item">
                          <h4 className="rule-title">{rule.title}</h4>
                          <p className="rule-description">{rule.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rules;
