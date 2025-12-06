import React, { useState } from 'react';
import { ChevronDown, Users } from 'lucide-react';
import { siteConfig } from '../config';
import './Roster.css';

const Roster = () => {
  const [expandedRanks, setExpandedRanks] = useState([]);

  const toggleRank = (rankId) => {
    setExpandedRanks((prev) =>
      prev.includes(rankId) ? prev.filter((id) => id !== rankId) : [...prev, rankId]
    );
  };

  return (
    <div className="roster-page">
      <div className="roster-hero">
        <div className="container">
          <h1 className="section-title animate-fade-in">{siteConfig.roster.title}</h1>
          <p className="roster-subtitle">{siteConfig.roster.subtitle}</p>
        </div>
      </div>

      <div className="roster-content">
        <div className="container">
          <div className="ranks-list">
            {siteConfig.roster.ranks.map((rank, index) => {
              const isExpanded = expandedRanks.includes(rank.id);
              const memberCount = rank.members.length;

              return (
                <div
                  key={rank.id}
                  className="rank-card"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div
                    className={`rank-header ${rank.expandable ? 'expandable' : 'non-expandable'}`}
                    onClick={() => rank.expandable && toggleRank(rank.id)}
                  >
                    <div className="rank-info">
                      <div className="rank-badge">Rank {rank.rank}</div>
                      <h3 className="rank-name">{rank.name}</h3>
                      <p className="rank-description">{rank.description}</p>
                    </div>
                    <div className="rank-meta">
                      <div className="rank-count">
                        <Users size={18} />
                        <span>{memberCount} {memberCount === 1 ? 'Member' : 'Members'}</span>
                      </div>
                      {rank.expandable && (
                        <ChevronDown
                          className={`rank-arrow ${isExpanded ? 'expanded' : ''}`}
                          size={24}
                        />
                      )}
                    </div>
                  </div>

                  {rank.expandable && (
                    <div className={`rank-members ${isExpanded ? 'expanded' : ''}`}>
                      <div className="members-grid">
                        {rank.members.map((member, memberIndex) => (
                          <div key={memberIndex} className="member-card">
                            <div className="member-name">{member.name}</div>
                            <div className="member-since">Since {member.since}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {!rank.expandable && rank.members.length > 0 && (
                    <div className="rank-members-static">
                      {rank.members.map((member, memberIndex) => (
                        <div key={memberIndex} className="static-member">
                          <span className="static-member-name">{member.name}</span>
                          <span className="static-member-since">Since {member.since}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Roster;
