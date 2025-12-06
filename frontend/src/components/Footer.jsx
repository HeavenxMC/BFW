import React from 'react';
import { Link } from 'react-router-dom';
import { siteConfig } from '../config';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-title">{siteConfig.gangName}</h3>
            <p className="footer-tagline">{siteConfig.tagline}</p>
          </div>

          <div className="footer-section">
            <h4 className="footer-heading">Quick Links</h4>
            <div className="footer-links">
              {siteConfig.navigation.map((item) => (
                <Link key={item.path} to={item.path} className="footer-link">
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="footer-section">
            <h4 className="footer-heading">Connect</h4>
            <div className="footer-socials">
              {siteConfig.contact.socials.map((social) => (
                <a
                  key={social.platform}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social-link"
                >
                  {social.platform}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copyright">
            © 2024 {siteConfig.gangName}. All rights reserved.
          </p>
          <p className="footer-note">Built for GTA V Roleplay</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
