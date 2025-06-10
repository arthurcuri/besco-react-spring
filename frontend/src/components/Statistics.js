import React from 'react';
import { StatsIcon } from './Icons';
import './Statistics.css';

const Statistics = ({ stats }) => {
  return (
    <div className="statistics">
      <h3>
        <StatsIcon size={20} color="#ffffff" />
        <span>Estatísticas</span>
      </h3>
      <div className="stats-grid">
        <div className="stat-item">
          <span className="stat-number">{stats.total || 0}</span>
          <span className="stat-label">Total</span>
        </div>
        
        <div className="stat-item">
          <span className="stat-number">{stats.pending || 0}</span>
          <span className="stat-label">Pendentes</span>
        </div>
        
        <div className="stat-item">
          <span className="stat-number">{stats.inProgress || 0}</span>
          <span className="stat-label">Em Andamento</span>
        </div>
        
        <div className="stat-item">
          <span className="stat-number">{stats.completed || 0}</span>
          <span className="stat-label">Concluídas</span>
        </div>
      </div>
    </div>
  );
};

export default Statistics; 