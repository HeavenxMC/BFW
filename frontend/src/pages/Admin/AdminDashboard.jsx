import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Settings, Users, FileText, Image, Link as LinkIcon, LogOut, Save, AlertCircle } from 'lucide-react';
import axios from 'axios';
import { siteConfig } from '../../config';
import './AdminDashboard.css';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [config, setConfig] = useState(siteConfig);
  const [loading, setLoading] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  const handleSave = async () => {
    setLoading(true);
    setSaveMessage('');
    setError('');

    try {
      const token = localStorage.getItem('adminToken');
      await axios.post(
        `${API}/admin/config`,
        { config },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSaveMessage('Configuration saved successfully! Reload the page to see changes.');
      setTimeout(() => setSaveMessage(''), 5000);
    } catch (err) {
      setError('Failed to save configuration. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const updateConfig = (path, value) => {
    setConfig((prev) => {
      const newConfig = { ...prev };
      const keys = path.split('.');
      let current = newConfig;
      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
      }
      current[keys[keys.length - 1]] = value;
      return newConfig;
    });
  };

  const updateArrayItem = (path, index, field, value) => {
    setConfig((prev) => {
      const newConfig = JSON.parse(JSON.stringify(prev));
      const keys = path.split('.');
      let current = newConfig;
      for (const key of keys) {
        current = current[key];
      }
      current[index][field] = value;
      return newConfig;
    });
  };

  const addArrayItem = (path, newItem) => {
    setConfig((prev) => {
      const newConfig = JSON.parse(JSON.stringify(prev));
      const keys = path.split('.');
      let current = newConfig;
      for (const key of keys) {
        current = current[key];
      }
      current.push(newItem);
      return newConfig;
    });
  };

  const removeArrayItem = (path, index) => {
    setConfig((prev) => {
      const newConfig = JSON.parse(JSON.stringify(prev));
      const keys = path.split('.');
      let current = newConfig;
      for (const key of keys) {
        current = current[key];
      }
      current.splice(index, 1);
      return newConfig;
    });
  };

  return (
    <div className="admin-dashboard">
      <div className="admin-sidebar">
        <div className="admin-header">
          <h2>BLACK FEATHER</h2>
          <p>Admin Panel</p>
        </div>

        <nav className="admin-nav">
          <button
            className={`nav-item ${activeTab === 'general' ? 'active' : ''}`}
            onClick={() => setActiveTab('general')}
          >
            <Settings size={20} />
            <span>General</span>
          </button>
          <button
            className={`nav-item ${activeTab === 'roster' ? 'active' : ''}`}
            onClick={() => setActiveTab('roster')}
          >
            <Users size={20} />
            <span>Roster</span>
          </button>
          <button
            className={`nav-item ${activeTab === 'rules' ? 'active' : ''}`}
            onClick={() => setActiveTab('rules')}
          >
            <FileText size={20} />
            <span>Rules</span>
          </button>
          <button
            className={`nav-item ${activeTab === 'images' ? 'active' : ''}`}
            onClick={() => setActiveTab('images')}
          >
            <Image size={20} />
            <span>Images</span>
          </button>
          <button
            className={`nav-item ${activeTab === 'contact' ? 'active' : ''}`}
            onClick={() => setActiveTab('contact')}
          >
            <LinkIcon size={20} />
            <span>Contact & Socials</span>
          </button>
        </nav>

        <button className="logout-btn" onClick={handleLogout}>
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>

      <div className="admin-content">
        <div className="content-header">
          <h1>Website Configuration</h1>
          <button className="btn btn-primary save-btn" onClick={handleSave} disabled={loading}>
            <Save size={20} />
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>

        {saveMessage && (
          <div className="success-message">
            <AlertCircle size={20} />
            {saveMessage}
          </div>
        )}

        {error && (
          <div className="error-message">
            <AlertCircle size={20} />
            {error}
          </div>
        )}

        <div className="content-body">
          {activeTab === 'general' && (
            <GeneralTab config={config} updateConfig={updateConfig} />
          )}
          {activeTab === 'roster' && (
            <RosterTab
              config={config}
              updateArrayItem={updateArrayItem}
              addArrayItem={addArrayItem}
              removeArrayItem={removeArrayItem}
            />
          )}
          {activeTab === 'rules' && (
            <RulesTab
              config={config}
              updateArrayItem={updateArrayItem}
              addArrayItem={addArrayItem}
              removeArrayItem={removeArrayItem}
            />
          )}
          {activeTab === 'images' && (
            <ImagesTab config={config} updateConfig={updateConfig} />
          )}
          {activeTab === 'contact' && (
            <ContactTab
              config={config}
              updateConfig={updateConfig}
              updateArrayItem={updateArrayItem}
              addArrayItem={addArrayItem}
              removeArrayItem={removeArrayItem}
            />
          )}
        </div>
      </div>
    </div>
  );
};

// General Tab Component
const GeneralTab = ({ config, updateConfig }) => (
  <div className="tab-content">
    <section className="admin-section">
      <h3>Gang Identity</h3>
      <div className="form-grid">
        <div className="form-field">
          <label>Gang Name</label>
          <input
            type="text"
            value={config.gangName}
            onChange={(e) => updateConfig('gangName', e.target.value)}
          />
        </div>
        <div className="form-field">
          <label>Tagline</label>
          <input
            type="text"
            value={config.tagline}
            onChange={(e) => updateConfig('tagline', e.target.value)}
          />
        </div>
      </div>
    </section>

    <section className="admin-section">
      <h3>Theme Colors</h3>
      <div className="form-grid">
        <div className="form-field">
          <label>Primary Black</label>
          <div className="color-input-wrapper">
            <input
              type="color"
              value={config.colors.primaryBlack}
              onChange={(e) => updateConfig('colors.primaryBlack', e.target.value)}
            />
            <input
              type="text"
              value={config.colors.primaryBlack}
              onChange={(e) => updateConfig('colors.primaryBlack', e.target.value)}
            />
          </div>
        </div>
        <div className="form-field">
          <label>Deep Grey</label>
          <div className="color-input-wrapper">
            <input
              type="color"
              value={config.colors.deepGrey}
              onChange={(e) => updateConfig('colors.deepGrey', e.target.value)}
            />
            <input
              type="text"
              value={config.colors.deepGrey}
              onChange={(e) => updateConfig('colors.deepGrey', e.target.value)}
            />
          </div>
        </div>
        <div className="form-field">
          <label>Royal Purple</label>
          <div className="color-input-wrapper">
            <input
              type="color"
              value={config.colors.royalPurple}
              onChange={(e) => updateConfig('colors.royalPurple', e.target.value)}
            />
            <input
              type="text"
              value={config.colors.royalPurple}
              onChange={(e) => updateConfig('colors.royalPurple', e.target.value)}
            />
          </div>
        </div>
        <div className="form-field">
          <label>Electric Yellow</label>
          <div className="color-input-wrapper">
            <input
              type="color"
              value={config.colors.electricYellow}
              onChange={(e) => updateConfig('colors.electricYellow', e.target.value)}
            />
            <input
              type="text"
              value={config.colors.electricYellow}
              onChange={(e) => updateConfig('colors.electricYellow', e.target.value)}
            />
          </div>
        </div>
      </div>
    </section>

    <section className="admin-section">
      <h3>About Page</h3>
      <div className="form-field">
        <label>Description</label>
        <textarea
          rows={4}
          value={config.about.description}
          onChange={(e) => updateConfig('about.description', e.target.value)}
        />
      </div>
      <div className="form-field">
        <label>Mission</label>
        <textarea
          rows={4}
          value={config.about.mission}
          onChange={(e) => updateConfig('about.mission', e.target.value)}
        />
      </div>
    </section>
  </div>
);

// Roster Tab Component
const RosterTab = ({ config, updateArrayItem, addArrayItem, removeArrayItem }) => (
  <div className="tab-content">
    <section className="admin-section">
      <h3>Roster Management</h3>
      {config.roster.ranks.map((rank, rankIndex) => (
        <div key={rankIndex} className="roster-rank-section">
          <h4>{rank.name}</h4>
          <div className="form-grid">
            <div className="form-field">
              <label>Rank Name</label>
              <input
                type="text"
                value={rank.name}
                onChange={(e) => updateArrayItem('roster.ranks', rankIndex, 'name', e.target.value)}
              />
            </div>
            <div className="form-field">
              <label>Description</label>
              <input
                type="text"
                value={rank.description}
                onChange={(e) => updateArrayItem('roster.ranks', rankIndex, 'description', e.target.value)}
              />
            </div>
          </div>

          <div className="members-list">
            <label>Members</label>
            {rank.members.map((member, memberIndex) => (
              <div key={memberIndex} className="member-item">
                <input
                  type="text"
                  placeholder="Member Name"
                  value={member.name}
                  onChange={(e) => {
                    const newMembers = [...rank.members];
                    newMembers[memberIndex].name = e.target.value;
                    updateArrayItem('roster.ranks', rankIndex, 'members', newMembers);
                  }}
                />
                <input
                  type="text"
                  placeholder="Since"
                  value={member.since}
                  onChange={(e) => {
                    const newMembers = [...rank.members];
                    newMembers[memberIndex].since = e.target.value;
                    updateArrayItem('roster.ranks', rankIndex, 'members', newMembers);
                  }}
                />
                <button
                  className="btn-remove"
                  onClick={() => {
                    const newMembers = rank.members.filter((_, i) => i !== memberIndex);
                    updateArrayItem('roster.ranks', rankIndex, 'members', newMembers);
                  }}
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              className="btn btn-secondary"
              onClick={() => {
                const newMembers = [...rank.members, { name: '', since: '' }];
                updateArrayItem('roster.ranks', rankIndex, 'members', newMembers);
              }}
            >
              Add Member
            </button>
          </div>
        </div>
      ))}
    </section>
  </div>
);

// Rules Tab Component
const RulesTab = ({ config, updateArrayItem, addArrayItem, removeArrayItem }) => (
  <div className="tab-content">
    <section className="admin-section">
      <h3>Rules Management</h3>
      {config.rules.categories.map((category, catIndex) => (
        <div key={catIndex} className="rules-category-section">
          <h4>{category.title}</h4>
          {category.rules.map((rule, ruleIndex) => (
            <div key={ruleIndex} className="rule-item">
              <div className="form-field">
                <label>Rule Title</label>
                <input
                  type="text"
                  value={rule.title}
                  onChange={(e) => {
                    const newRules = [...category.rules];
                    newRules[ruleIndex].title = e.target.value;
                    updateArrayItem('rules.categories', catIndex, 'rules', newRules);
                  }}
                />
              </div>
              <div className="form-field">
                <label>Description</label>
                <textarea
                  rows={3}
                  value={rule.description}
                  onChange={(e) => {
                    const newRules = [...category.rules];
                    newRules[ruleIndex].description = e.target.value;
                    updateArrayItem('rules.categories', catIndex, 'rules', newRules);
                  }}
                />
              </div>
              <button
                className="btn-remove"
                onClick={() => {
                  const newRules = category.rules.filter((_, i) => i !== ruleIndex);
                  updateArrayItem('rules.categories', catIndex, 'rules', newRules);
                }}
              >
                Remove Rule
              </button>
            </div>
          ))}
          <button
            className="btn btn-secondary"
            onClick={() => {
              const newRules = [...category.rules, { title: '', description: '' }];
              updateArrayItem('rules.categories', catIndex, 'rules', newRules);
            }}
          >
            Add Rule
          </button>
        </div>
      ))}
    </section>
  </div>
);

// Images Tab Component
const ImagesTab = ({ config, updateConfig }) => (
  <div className="tab-content">
    <section className="admin-section">
      <h3>Image Paths</h3>
      <p className="section-note">Upload images to /app/frontend/public/ and enter the path here (e.g., /logo.png)</p>
      <div className="form-grid">
        <div className="form-field">
          <label>Logo</label>
          <input
            type="text"
            value={config.images.logo}
            onChange={(e) => updateConfig('images.logo', e.target.value)}
            placeholder="/logo.png"
          />
        </div>
        <div className="form-field">
          <label>Hero Background</label>
          <input
            type="text"
            value={config.images.heroBackground}
            onChange={(e) => updateConfig('images.heroBackground', e.target.value)}
            placeholder="/hero-bg.jpg"
          />
        </div>
      </div>
    </section>
  </div>
);

// Contact Tab Component
const ContactTab = ({ config, updateConfig, updateArrayItem }) => (
  <div className="tab-content">
    <section className="admin-section">
      <h3>Discord & Social Links</h3>
      <div className="form-field">
        <label>Discord Invite Link</label>
        <input
          type="url"
          value={config.contact.discord.link}
          onChange={(e) => updateConfig('contact.discord.link', e.target.value)}
          placeholder="https://discord.gg/yourlink"
        />
      </div>

      <h4>Social Media</h4>
      {config.contact.socials.map((social, index) => (
        <div key={index} className="social-item">
          <div className="form-grid">
            <div className="form-field">
              <label>Platform</label>
              <input
                type="text"
                value={social.platform}
                onChange={(e) => updateArrayItem('contact.socials', index, 'platform', e.target.value)}
              />
            </div>
            <div className="form-field">
              <label>Link</label>
              <input
                type="url"
                value={social.link}
                onChange={(e) => updateArrayItem('contact.socials', index, 'link', e.target.value)}
              />
            </div>
            <div className="form-field">
              <label>Username</label>
              <input
                type="text"
                value={social.username}
                onChange={(e) => updateArrayItem('contact.socials', index, 'username', e.target.value)}
              />
            </div>
          </div>
        </div>
      ))}
    </section>
  </div>
);

export default AdminDashboard;
