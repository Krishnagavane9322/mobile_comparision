import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import Dashboard from './Dashboard';

const Home = () => {
  return (
    <div className="home">
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Find Your Perfect Mobile Phone
          </h1>
          <p className="hero-subtitle">
            Discover the best mobile phones with personalized recommendations based on your preferences and needs.
          </p>
          <div className="hero-buttons">
            <Link to="/mobiles" className="btn btn-primary">
              Browse Mobiles
            </Link>
            <Link to="/register" className="btn btn-secondary">
              Get Started
            </Link>
          </div>
        </div>
        <div className="hero-image">
          <div className="phone-mockup">
            📱
          </div>
        </div>
      </div>

      <div className="home-dashboard-section">
        <Dashboard />
      </div>

      <div className="features-section">
        <h2 className="section-title">Why Choose MobileReco?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🔍</div>
            <h3>Smart Recommendations</h3>
            <p>Get personalized mobile recommendations based on your usage patterns and preferences.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Detailed Comparisons</h3>
            <p>Compare specifications, prices, and reviews to make informed decisions.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💰</div>
            <h3>Best Prices</h3>
            <p>Find the best deals and prices from multiple retailers in one place.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">⭐</div>
            <h3>User Reviews</h3>
            <p>Read authentic reviews from real users to understand real-world performance.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

