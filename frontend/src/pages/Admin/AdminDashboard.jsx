import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Settings, Users, FileText, Image, Link as LinkIcon, LogOut, Save, 
  AlertCircle, Navigation, DollarSign, Palette, Inbox, Check, X, Trash2
} from 'lucide-react';
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
            <span>General Settings</span>
          </button>
          <button
            className={`nav-item ${activeTab === 'colors' ? 'active' : ''}`}
            onClick={() => setActiveTab('colors')}
          >
            <Palette size={20} />
            <span>Theme Colors</span>
          </button>
          <button
            className={`nav-item ${activeTab === 'navigation' ? 'active' : ''}`}
            onClick={() => setActiveTab('navigation')}
          >
            <Navigation size={20} />
            <span>Navigation</span>
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
            className={`nav-item ${activeTab === 'join' ? 'active' : ''}`}
            onClick={() => setActiveTab('join')}
          >
            <DollarSign size={20} />
            <span>Join Requirements</span>
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
          {activeTab === 'colors' && (
            <ColorsTab config={config} updateConfig={updateConfig} />
          )}
          {activeTab === 'navigation' && (
            <NavigationTab
              config={config}
              updateArrayItem={updateArrayItem}
              addArrayItem={addArrayItem}
              removeArrayItem={removeArrayItem}
            />
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
          {activeTab === 'join' && (
            <JoinTab
              config={config}
              updateArrayItem={updateArrayItem}
              addArrayItem={addArrayItem}
              removeArrayItem={removeArrayItem}
              updateConfig={updateConfig}
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
      <h3>Hero Section (Landing Page)</h3>
      <div className="form-grid">
        <div className="form-field">
          <label>Hero Title</label>
          <input
            type="text"
            value={config.hero.title}
            onChange={(e) => updateConfig('hero.title', e.target.value)}
          />
        </div>
        <div className="form-field">
          <label>Hero Tagline</label>
          <input
            type="text"
            value={config.hero.tagline}
            onChange={(e) => updateConfig('hero.tagline', e.target.value)}
          />
        </div>
      </div>
      <div className="form-grid">
        <div className="form-field">
          <label>Primary Button Text</label>
          <input
            type="text"
            value={config.hero.primaryButton.text}
            onChange={(e) => updateConfig('hero.primaryButton.text', e.target.value)}
          />
        </div>
        <div className="form-field">
          <label>Primary Button Link</label>
          <input
            type="text"
            value={config.hero.primaryButton.link}
            onChange={(e) => updateConfig('hero.primaryButton.link', e.target.value)}
          />
        </div>
      </div>
      <div className="form-grid">
        <div className="form-field">
          <label>Secondary Button Text</label>
          <input
            type="text"
            value={config.hero.secondaryButton.text}
            onChange={(e) => updateConfig('hero.secondaryButton.text', e.target.value)}
          />
        </div>
        <div className="form-field">
          <label>Secondary Button Link</label>
          <input
            type="text"
            value={config.hero.secondaryButton.link}
            onChange={(e) => updateConfig('hero.secondaryButton.link', e.target.value)}
          />
        </div>
      </div>
    </section>

    <section className="admin-section">
      <h3>About Page</h3>
      <div className="form-field">
        <label>Title</label>
        <input
          type="text"
          value={config.about.title}
          onChange={(e) => updateConfig('about.title', e.target.value)}
        />
      </div>
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
      
      <h4>Core Values</h4>
      {config.about.values.map((value, index) => (
        <div key={index} className="value-item">
          <div className="form-grid">
            <div className="form-field">
              <label>Value Title</label>
              <input
                type="text"
                value={value.title}
                onChange={(e) => {
                  const newValues = [...config.about.values];
                  newValues[index].title = e.target.value;
                  updateConfig('about.values', newValues);
                }}
              />
            </div>
            <div className="form-field">
              <label>Description</label>
              <textarea
                rows={2}
                value={value.description}
                onChange={(e) => {
                  const newValues = [...config.about.values];
                  newValues[index].description = e.target.value;
                  updateConfig('about.values', newValues);
                }}
              />
            </div>
          </div>
        </div>
      ))}
    </section>
  </div>
);

// Colors Tab Component
const ColorsTab = ({ config, updateConfig }) => (
  <div className="tab-content">
    <section className="admin-section">
      <h3>Theme Colors</h3>
      <p className="section-note">These colors control the entire website theme. Changes apply globally.</p>
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
        <div className="form-field">
          <label>Soft Grey Highlight</label>
          <div className="color-input-wrapper">
            <input
              type="color"
              value={config.colors.softGreyHighlight}
              onChange={(e) => updateConfig('colors.softGreyHighlight', e.target.value)}
            />
            <input
              type="text"
              value={config.colors.softGreyHighlight}
              onChange={(e) => updateConfig('colors.softGreyHighlight', e.target.value)}
            />
          </div>
        </div>
        <div className="form-field">
          <label>Purple Dark</label>
          <div className="color-input-wrapper">
            <input
              type="color"
              value={config.colors.purpleDark}
              onChange={(e) => updateConfig('colors.purpleDark', e.target.value)}
            />
            <input
              type="text"
              value={config.colors.purpleDark}
              onChange={(e) => updateConfig('colors.purpleDark', e.target.value)}
            />
          </div>
        </div>
        <div className="form-field">
          <label>Purple Light</label>
          <div className="color-input-wrapper">
            <input
              type="color"
              value={config.colors.purpleLight}
              onChange={(e) => updateConfig('colors.purpleLight', e.target.value)}
            />
            <input
              type="text"
              value={config.colors.purpleLight}
              onChange={(e) => updateConfig('colors.purpleLight', e.target.value)}
            />
          </div>
        </div>
        <div className="form-field">
          <label>Yellow Dark</label>
          <div className="color-input-wrapper">
            <input
              type="color"
              value={config.colors.yellowDark}
              onChange={(e) => updateConfig('colors.yellowDark', e.target.value)}
            />
            <input
              type="text"
              value={config.colors.yellowDark}
              onChange={(e) => updateConfig('colors.yellowDark', e.target.value)}
            />
          </div>
        </div>
      </div>
    </section>
  </div>
);

// Navigation Tab Component
const NavigationTab = ({ config, updateArrayItem, addArrayItem, removeArrayItem }) => (
  <div className="tab-content">
    <section className="admin-section">
      <h3>Navigation Menu Items</h3>
      <p className="section-note">Manage website navigation links</p>
      {config.navigation.map((item, index) => (
        <div key={index} className="nav-item-edit">
          <div className="form-grid">
            <div className="form-field">
              <label>Name</label>
              <input
                type="text"
                value={item.name}
                onChange={(e) => updateArrayItem('navigation', index, 'name', e.target.value)}
              />
            </div>
            <div className="form-field">
              <label>Path</label>
              <input
                type="text"
                value={item.path}
                onChange={(e) => updateArrayItem('navigation', index, 'path', e.target.value)}
              />
            </div>
          </div>
          <button
            className="btn-remove"
            onClick={() => removeArrayItem('navigation', index)}
          >
            Remove
          </button>
        </div>
      ))}
      <button
        className="btn btn-secondary"
        onClick={() => addArrayItem('navigation', { name: '', path: '' })}
      >
        Add Navigation Item
      </button>
    </section>
  </div>
);

// Roster Tab Component
const RosterTab = ({ config, updateArrayItem, addArrayItem, removeArrayItem }) => (
  <div className="tab-content">
    <section className="admin-section">
      <h3>Roster Management</h3>
      <div className="form-grid">
        <div className="form-field">
          <label>Title</label>
          <input
            type="text"
            value={config.roster.title}
            onChange={(e) => {
              const newConfig = { ...config };
              newConfig.roster.title = e.target.value;
            }}
          />
        </div>
        <div className="form-field">
          <label>Subtitle</label>
          <input
            type="text"
            value={config.roster.subtitle}
            onChange={(e) => {
              const newConfig = { ...config };
              newConfig.roster.subtitle = e.target.value;
            }}
          />
        </div>
      </div>
      
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
            <div className="form-field">
              <label>Rank Number</label>
              <input
                type="number"
                value={rank.rank}
                onChange={(e) => updateArrayItem('roster.ranks', rankIndex, 'rank', parseInt(e.target.value))}
              />
            </div>
            <div className="form-field">
              <label>
                <input
                  type="checkbox"
                  checked={rank.expandable}
                  onChange={(e) => updateArrayItem('roster.ranks', rankIndex, 'expandable', e.target.checked)}
                />
                Expandable
              </label>
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
      <div className="form-field">
        <label>Rules Page Title</label>
        <input
          type="text"
          value={config.rules.title}
          onChange={(e) => {
            const newConfig = { ...config };
            newConfig.rules.title = e.target.value;
          }}
        />
      </div>
      
      {config.rules.categories.map((category, catIndex) => (
        <div key={catIndex} className="rules-category-section">
          <h4>{category.title}</h4>
          <div className="form-grid">
            <div className="form-field">
              <label>Category Title</label>
              <input
                type="text"
                value={category.title}
                onChange={(e) => updateArrayItem('rules.categories', catIndex, 'title', e.target.value)}
              />
            </div>
            <div className="form-field">
              <label>Icon (crown, radio, target, alert-triangle)</label>
              <input
                type="text"
                value={category.icon}
                onChange={(e) => updateArrayItem('rules.categories', catIndex, 'icon', e.target.value)}
              />
            </div>
          </div>
          
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

// Join Requirements Tab Component
const JoinTab = ({ config, updateArrayItem, addArrayItem, removeArrayItem, updateConfig }) => (
  <div className="tab-content">
    <section className="admin-section">
      <h3>Join Page Settings</h3>
      <div className="form-grid">
        <div className="form-field">
          <label>Title</label>
          <input
            type="text"
            value={config.joinRequirements.title}
            onChange={(e) => updateConfig('joinRequirements.title', e.target.value)}
          />
        </div>
        <div className="form-field">
          <label>Subtitle</label>
          <input
            type="text"
            value={config.joinRequirements.subtitle}
            onChange={(e) => updateConfig('joinRequirements.subtitle', e.target.value)}
          />
        </div>
      </div>

      <h4>Requirements</h4>
      {config.joinRequirements.requirements.map((req, index) => (
        <div key={index} className="requirement-item">
          <div className="form-grid">
            <div className="form-field">
              <label>Requirement Title</label>
              <input
                type="text"
                value={req.title}
                onChange={(e) => updateArrayItem('joinRequirements.requirements', index, 'title', e.target.value)}
              />
            </div>
            <div className="form-field">
              <label>Description</label>
              <input
                type="text"
                value={req.description}
                onChange={(e) => updateArrayItem('joinRequirements.requirements', index, 'description', e.target.value)}
              />
            </div>
          </div>
          <button
            className="btn-remove"
            onClick={() => removeArrayItem('joinRequirements.requirements', index)}
          >
            Remove
          </button>
        </div>
      ))}
      <button
        className="btn btn-secondary"
        onClick={() => addArrayItem('joinRequirements.requirements', { title: '', description: '' })}
      >
        Add Requirement
      </button>

      <h4>Application Process</h4>
      {config.joinRequirements.applicationProcess.map((step, index) => (
        <div key={index} className="process-step-item">
          <div className="form-field">
            <label>Step {index + 1}</label>
            <input
              type="text"
              value={step}
              onChange={(e) => {
                const newProcess = [...config.joinRequirements.applicationProcess];
                newProcess[index] = e.target.value;
                updateConfig('joinRequirements.applicationProcess', newProcess);
              }}
            />
          </div>
          <button
            className="btn-remove"
            onClick={() => {
              const newProcess = config.joinRequirements.applicationProcess.filter((_, i) => i !== index);
              updateConfig('joinRequirements.applicationProcess', newProcess);
            }}
          >
            Remove
          </button>
        </div>
      ))}
      <button
        className="btn btn-secondary"
        onClick={() => {
          const newProcess = [...config.joinRequirements.applicationProcess, ''];
          updateConfig('joinRequirements.applicationProcess', newProcess);
        }}
      >
        Add Process Step
      </button>
    </section>
  </div>
);

// Images Tab Component
const ImagesTab = ({ config, updateConfig }) => (
  <div className="tab-content">
    <section className="admin-section">
      <h3>Image Paths</h3>
      <p className="section-note">Upload images to /app/frontend/public/ and enter the path here (e.g., /logo.png)</p>
      
      <h4>Main Images</h4>
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
        <div className="form-field">
          <label>About Banner</label>
          <input
            type="text"
            value={config.images.aboutBanner}
            onChange={(e) => updateConfig('images.aboutBanner', e.target.value)}
            placeholder="/about-banner.jpg"
          />
        </div>
        <div className="form-field">
          <label>Rules Banner</label>
          <input
            type="text"
            value={config.images.rulesBanner}
            onChange={(e) => updateConfig('images.rulesBanner', e.target.value)}
            placeholder="/rules-banner.jpg"
          />
        </div>
        <div className="form-field">
          <label>Roster Banner</label>
          <input
            type="text"
            value={config.images.rosterBanner}
            onChange={(e) => updateConfig('images.rosterBanner', e.target.value)}
            placeholder="/roster-banner.jpg"
          />
        </div>
        <div className="form-field">
          <label>Join Banner</label>
          <input
            type="text"
            value={config.images.joinBanner}
            onChange={(e) => updateConfig('images.joinBanner', e.target.value)}
            placeholder="/join-banner.jpg"
          />
        </div>
        <div className="form-field">
          <label>Contact Banner</label>
          <input
            type="text"
            value={config.images.contactBanner}
            onChange={(e) => updateConfig('images.contactBanner', e.target.value)}
            placeholder="/contact-banner.jpg"
          />
        </div>
      </div>

      <h4>Rank Icons</h4>
      <div className="form-grid">
        <div className="form-field">
          <label>Raven Regent Icon</label>
          <input
            type="text"
            value={config.images.rankIcons.ravenRegent}
            onChange={(e) => updateConfig('images.rankIcons.ravenRegent', e.target.value)}
            placeholder="/ranks/regent.png"
          />
        </div>
        <div className="form-field">
          <label>Black Talon Icon</label>
          <input
            type="text"
            value={config.images.rankIcons.blackTalon}
            onChange={(e) => updateConfig('images.rankIcons.blackTalon', e.target.value)}
            placeholder="/ranks/talon.png"
          />
        </div>
        <div className="form-field">
          <label>Nightborne Council Icon</label>
          <input
            type="text"
            value={config.images.rankIcons.nightborneCouncil}
            onChange={(e) => updateConfig('images.rankIcons.nightborneCouncil', e.target.value)}
            placeholder="/ranks/council.png"
          />
        </div>
        <div className="form-field">
          <label>Shadowhands Icon</label>
          <input
            type="text"
            value={config.images.rankIcons.shadowhands}
            onChange={(e) => updateConfig('images.rankIcons.shadowhands', e.target.value)}
            placeholder="/ranks/shadowhands.png"
          />
        </div>
        <div className="form-field">
          <label>Featherborn Icon</label>
          <input
            type="text"
            value={config.images.rankIcons.featherborn}
            onChange={(e) => updateConfig('images.rankIcons.featherborn', e.target.value)}
            placeholder="/ranks/featherborn.png"
          />
        </div>
      </div>
    </section>
  </div>
);

// Contact Tab Component
const ContactTab = ({ config, updateConfig, updateArrayItem, addArrayItem, removeArrayItem }) => (
  <div className="tab-content">
    <section className="admin-section">
      <h3>Contact Page Settings</h3>
      <div className="form-grid">
        <div className="form-field">
          <label>Title</label>
          <input
            type="text"
            value={config.contact.title}
            onChange={(e) => updateConfig('contact.title', e.target.value)}
          />
        </div>
        <div className="form-field">
          <label>Subtitle</label>
          <input
            type="text"
            value={config.contact.subtitle}
            onChange={(e) => updateConfig('contact.subtitle', e.target.value)}
          />
        </div>
      </div>
      
      <h4>Discord</h4>
      <div className="form-grid">
        <div className="form-field">
          <label>Discord Label</label>
          <input
            type="text"
            value={config.contact.discord.label}
            onChange={(e) => updateConfig('contact.discord.label', e.target.value)}
          />
        </div>
        <div className="form-field">
          <label>Discord Invite Link</label>
          <input
            type="url"
            value={config.contact.discord.link}
            onChange={(e) => updateConfig('contact.discord.link', e.target.value)}
            placeholder="https://discord.gg/yourlink"
          />
        </div>
      </div>

      <h4>Server Information</h4>
      <div className="form-grid">
        <div className="form-field">
          <label>Label</label>
          <input
            type="text"
            value={config.contact.serverInfo.label}
            onChange={(e) => updateConfig('contact.serverInfo.label', e.target.value)}
          />
        </div>
        <div className="form-field">
          <label>Server Name</label>
          <input
            type="text"
            value={config.contact.serverInfo.name}
            onChange={(e) => updateConfig('contact.serverInfo.name', e.target.value)}
          />
        </div>
        <div className="form-field">
          <label>Server IP</label>
          <input
            type="text"
            value={config.contact.serverInfo.ip}
            onChange={(e) => updateConfig('contact.serverInfo.ip', e.target.value)}
          />
        </div>
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
          <button
            className="btn-remove"
            onClick={() => removeArrayItem('contact.socials', index)}
          >
            Remove
          </button>
        </div>
      ))}
      <button
        className="btn btn-secondary"
        onClick={() => addArrayItem('contact.socials', { platform: '', link: '', username: '' })}
      >
        Add Social Media
      </button>

      <h4>Contact Form Fields</h4>
      {config.contact.formFields.map((field, index) => (
        <div key={index} className="form-field-item">
          <div className="form-grid">
            <div className="form-field">
              <label>Field Name (ID)</label>
              <input
                type="text"
                value={field.name}
                onChange={(e) => updateArrayItem('contact.formFields', index, 'name', e.target.value)}
              />
            </div>
            <div className="form-field">
              <label>Label</label>
              <input
                type="text"
                value={field.label}
                onChange={(e) => updateArrayItem('contact.formFields', index, 'label', e.target.value)}
              />
            </div>
            <div className="form-field">
              <label>Type</label>
              <select
                value={field.type}
                onChange={(e) => updateArrayItem('contact.formFields', index, 'type', e.target.value)}
              >
                <option value="text">Text</option>
                <option value="email">Email</option>
                <option value="number">Number</option>
                <option value="textarea">Textarea</option>
              </select>
            </div>
            <div className="form-field">
              <label>Placeholder</label>
              <input
                type="text"
                value={field.placeholder}
                onChange={(e) => updateArrayItem('contact.formFields', index, 'placeholder', e.target.value)}
              />
            </div>
            <div className="form-field">
              <label>
                <input
                  type="checkbox"
                  checked={field.required}
                  onChange={(e) => updateArrayItem('contact.formFields', index, 'required', e.target.checked)}
                />
                Required
              </label>
            </div>
          </div>
          <button
            className="btn-remove"
            onClick={() => removeArrayItem('contact.formFields', index)}
          >
            Remove
          </button>
        </div>
      ))}
      <button
        className="btn btn-secondary"
        onClick={() => addArrayItem('contact.formFields', { 
          name: '', 
          label: '', 
          type: 'text', 
          required: true, 
          placeholder: '' 
        })}
      >
        Add Form Field
      </button>
    </section>
  </div>
);

export default AdminDashboard;
