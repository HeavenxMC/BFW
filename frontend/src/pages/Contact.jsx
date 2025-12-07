import React, { useState } from 'react';
import { Send, Instagram, MessageCircle, Twitter, Server } from 'lucide-react';
import axios from 'axios';
import { siteConfig } from '../config';
import './Contact.css';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const socialIconMap = {
  Instagram: Instagram,
  TikTok: MessageCircle,
  Twitter: Twitter,
};

const Contact = () => {
  const [formData, setFormData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');
    setIsError(false);

    try {
      const response = await axios.post(`${API}/contact/submit`, {
        form_data: formData
      });
      
      setIsSubmitting(false);
      setSubmitMessage('Application submitted successfully! Check your Discord for updates.');
      setFormData({});
      
      // Reset form inputs
      e.target.reset();
    } catch (error) {
      setIsSubmitting(false);
      setIsError(true);
      setSubmitMessage('Failed to submit application. Please try again or contact us on Discord.');
      console.error('Submission error:', error);
    }
  };

  return (
    <div className="contact-page">
      <div className="contact-hero">
        <div className="container">
          <h1 className="section-title animate-fade-in">{siteConfig.contact.title}</h1>
          <p className="contact-subtitle">{siteConfig.contact.subtitle}</p>
        </div>
      </div>

      <div className="contact-content">
        <div className="container">
          <div className="contact-grid">
            <div className="contact-info">
              <div className="info-section">
                <h3 className="info-title">Join Our Community</h3>
                <a
                  href={siteConfig.contact.discord.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="info-link discord-link"
                >
                  <MessageCircle size={24} />
                  <div>
                    <div className="link-label">{siteConfig.contact.discord.label}</div>
                    <div className="link-value">Click to Join</div>
                  </div>
                </a>
              </div>

              <div className="info-section">
                <h3 className="info-title">Follow Us</h3>
                <div className="socials-grid">
                  {siteConfig.contact.socials.map((social) => {
                    const Icon = socialIconMap[social.platform];
                    return (
                      <a
                        key={social.platform}
                        href={social.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-link"
                      >
                        {Icon && <Icon size={24} />}
                        <div>
                          <div className="social-platform">{social.platform}</div>
                          <div className="social-username">{social.username}</div>
                        </div>
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="contact-form-wrapper">
              <h3 className="form-title">Apply Now</h3>
              <form onSubmit={handleSubmit} className="contact-form">
                {siteConfig.contact.formFields.map((field) => (
                  <div key={field.name} className="form-group">
                    <label htmlFor={field.name} className="form-label">
                      {field.label}
                      {field.required && <span className="required">*</span>}
                    </label>
                    {field.type === 'textarea' ? (
                      <textarea
                        id={field.name}
                        name={field.name}
                        value={formData[field.name] || ''}
                        onChange={handleChange}
                        placeholder={field.placeholder}
                        required={field.required}
                        className="form-input form-textarea"
                        rows={4}
                      />
                    ) : (
                      <input
                        type={field.type}
                        id={field.name}
                        name={field.name}
                        value={formData[field.name] || ''}
                        onChange={handleChange}
                        placeholder={field.placeholder}
                        required={field.required}
                        className="form-input"
                      />
                    )}
                  </div>
                ))}

                <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                  {isSubmitting ? 'Submitting...' : 'Submit Application'}
                  <Send size={20} />
                </button>

                {submitMessage && <p className="submit-message">{submitMessage}</p>}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
