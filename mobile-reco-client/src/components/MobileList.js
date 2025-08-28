import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './MobileList.css';

const MobileList = () => {
  const [mobiles, setMobiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMobiles();
  }, []);

  const fetchMobiles = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/mobiles');
      const data = response.data;
      const items = Array.isArray(data) ? data : data.items || [];
      setMobiles(items);
    } catch (err) {
      const message = err.response?.data?.message || err.response?.data?.error || err.message || 'Failed to fetch mobile phones';
      setError(message);
      console.error('Error fetching mobiles:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="mobile-list-container">
        <div className="loading">Loading mobile phones...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mobile-list-container">
        <div className="error">{error}</div>
      </div>
    );
  }

  return (
    <div className="mobile-list-container">
      <h1 className="page-title">Mobile Phones</h1>
      <div className="mobile-grid">
        {mobiles.map((mobile) => (
          <div key={mobile._id} className="mobile-card">
            <div className="mobile-image">
              <span className="phone-emoji">📱</span>
            </div>
            <div className="mobile-info">
              <h3 className="mobile-name">{mobile.brand} {mobile.model || mobile.name}</h3>
              <p className="mobile-price">₹{mobile.price}</p>
              <div className="mobile-specs">
                <span className="spec">{mobile.storage}GB</span>
                <span className="spec">{mobile.ram}GB RAM</span>
                <span className="spec">{mobile.screenSize || 6}"</span>
              </div>
              <Link to={`/mobile/${mobile._id}`} className="view-details-btn">
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MobileList;
