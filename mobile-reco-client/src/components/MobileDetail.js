import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './MobileDetail.css';

const MobileDetail = () => {
  const { id } = useParams();
  const [mobile, setMobile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMobileDetail = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/mobiles/${id}`);
      setMobile(response.data);
    } catch (err) {
      setError(err.response?.data?.error || err.message || 'Failed to fetch mobile details');
      console.error('Error fetching mobile:', err);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchMobileDetail();
  }, [fetchMobileDetail]);

  if (loading) {
    return <div className="mobile-detail-container"><div className="loading">Loading...</div></div>;
  }

  if (error || !mobile) {
    return <div className="mobile-detail-container"><div className="error">{error || 'Mobile not found'}</div></div>;
  }

  return (
    <div className="mobile-detail-container">
      <div className="mobile-detail-card">
        <div className="mobile-detail-image">
          <span className="phone-emoji-large">📱</span>
        </div>
        <div className="mobile-detail-info">
          <h1 className="mobile-detail-name">{mobile.brand} {mobile.model || mobile.name}</h1>
          <p className="mobile-detail-price">₹{mobile.price}</p>
          
          <div className="specifications">
            <h3>Specifications</h3>
            <div className="spec-grid">
              <div className="spec-item">
                <span className="spec-label">Storage:</span>
                <span className="spec-value">{mobile.storage}GB</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">RAM:</span>
                <span className="spec-value">{mobile.ram}GB</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">Screen Size:</span>
                <span className="spec-value">{mobile.screenSize || 6}"</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">Battery:</span>
                <span className="spec-value">{mobile.battery}mAh</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">Camera:</span>
                <span className="spec-value">{mobile.camera}MP</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">Processor:</span>
                <span className="spec-value">{mobile.processor}</span>
              </div>
            </div>
          </div>
          
          <div className="mobile-actions">
            <button className="btn-primary">Add to Wishlist</button>
            <button className="btn-secondary">Compare</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileDetail;
