import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './FundraiserPage.css';

interface Donation {
  id: string;
  amount: number;
  donorName: string;
  date: string;
  message?: string;
}

const FundraiserPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'home' | 'payment' | 'achievements'>('home');
  const [donationAmount, setDonationAmount] = useState('');
  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [donorMessage, setDonorMessage] = useState('');
  const [donations, setDonations] = useState<Donation[]>([
    {
      id: '1',
      amount: 100,
      donorName: 'Anonymous',
      date: '2024-01-15',
      message: 'Keep up the great work!'
    },
    {
      id: '2',
      amount: 250,
      donorName: 'Sarah Johnson',
      date: '2024-01-14'
    },
    {
      id: '3',
      amount: 75,
      donorName: 'Mike Chen',
      date: '2024-01-13',
      message: 'Every little bit helps!'
    }
  ]);

  const totalFundsRaised = donations.reduce((sum, donation) => sum + donation.amount, 0);
  const totalDonors = donations.length;
  const mealsProvided = Math.floor(totalFundsRaised / 5); // Assuming $5 per meal

  const handleDonationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!donationAmount || !donorName || !donorEmail) {
      alert('Please fill in all required fields');
      return;
    }

    const newDonation: Donation = {
      id: Date.now().toString(),
      amount: parseFloat(donationAmount),
      donorName,
      date: new Date().toISOString().split('T')[0],
      message: donorMessage || undefined
    };

    setDonations(prev => [newDonation, ...prev]);
    
    // Simulate payment processing
    alert('Thank you for your donation! Payment processed successfully.');
    
    // Reset form
    setDonationAmount('');
    setDonorName('');
    setDonorEmail('');
    setDonorMessage('');
  };

  const handleCustomAmount = (amount: string) => {
    setDonationAmount(amount);
  };

  return (
    <div className="fundraiser-page">
      {/* Navbar */}
      <nav className="fundraiser-navbar">
        <div className="nav-brand">
          <h2>💰 Fundraiser Dashboard</h2>
        </div>
        <div className="nav-menu">
          <button
            className={`nav-btn ${activeTab === 'home' ? 'active' : ''}`}
            onClick={() => setActiveTab('home')}
          >
            🏠 Home
          </button>
          <button
            className={`nav-btn ${activeTab === 'payment' ? 'active' : ''}`}
            onClick={() => setActiveTab('payment')}
          >
            💳 Payment Gateway
          </button>
          <button
            className={`nav-btn ${activeTab === 'achievements' ? 'active' : ''}`}
            onClick={() => setActiveTab('achievements')}
          >
            🏆 Achievements
          </button>
          <button className="nav-btn" onClick={() => navigate('/')}>
            Home
          </button>
        </div>
      </nav>

      <div className="fundraiser-container">
        {/* Home Tab */}
        {activeTab === 'home' && (
          <div className="home-section">
            <div className="hero-content">
              <h1>Help Us Fight Hunger</h1>
              <p>Your donations help us provide meals to those in need and support our mission to eliminate food insecurity.</p>
              
              <div className="impact-stats">
                <div className="stat-card">
                  <div className="stat-number">${totalFundsRaised.toLocaleString()}</div>
                  <div className="stat-label">Total Funds Raised</div>
                </div>
                <div className="stat-card">
                  <div className="stat-number">{totalDonors}</div>
                  <div className="stat-label">Donors</div>
                </div>
                <div className="stat-card">
                  <div className="stat-number">{mealsProvided}</div>
                  <div className="stat-label">Meals Provided</div>
                </div>
              </div>

              <button 
                className="cta-btn"
                onClick={() => setActiveTab('payment')}
              >
                Donate Now
              </button>
            </div>
          </div>
        )}

        {/* Payment Gateway Tab */}
        {activeTab === 'payment' && (
          <div className="payment-section">
            <h2>Make a Donation</h2>
            <div className="payment-container">
              <div className="donation-form">
                <h3>Choose Your Donation Amount</h3>
                
                <div className="amount-buttons">
                  <button
                    className="amount-btn"
                    onClick={() => handleCustomAmount('10')}
                  >
                    $10
                  </button>
                  <button
                    className="amount-btn"
                    onClick={() => handleCustomAmount('25')}
                  >
                    $25
                  </button>
                  <button
                    className="amount-btn"
                    onClick={() => handleCustomAmount('50')}
                  >
                    $50
                  </button>
                  <button
                    className="amount-btn"
                    onClick={() => handleCustomAmount('100')}
                  >
                    $100
                  </button>
                </div>

                <form onSubmit={handleDonationSubmit}>
                  <div className="form-group">
                    <label htmlFor="amount">Custom Amount ($)</label>
                    <input
                      type="number"
                      id="amount"
                      value={donationAmount}
                      onChange={(e) => setDonationAmount(e.target.value)}
                      placeholder="Enter amount"
                      min="1"
                      step="0.01"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="donorName">Your Name *</label>
                    <input
                      type="text"
                      id="donorName"
                      value={donorName}
                      onChange={(e) => setDonorName(e.target.value)}
                      placeholder="Enter your name"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="donorEmail">Email Address *</label>
                    <input
                      type="email"
                      id="donorEmail"
                      value={donorEmail}
                      onChange={(e) => setDonorEmail(e.target.value)}
                      placeholder="Enter your email"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="message">Message (Optional)</label>
                    <textarea
                      id="message"
                      value={donorMessage}
                      onChange={(e) => setDonorMessage(e.target.value)}
                      placeholder="Leave a message of support..."
                      rows={3}
                    />
                  </div>

                  <div className="payment-methods">
                    <h4>Payment Method</h4>
                    <div className="payment-options">
                      <label className="payment-option">
                        <input type="radio" name="payment" value="card" defaultChecked />
                        <span>Credit/Debit Card</span>
                      </label>
                      <label className="payment-option">
                        <input type="radio" name="payment" value="paypal" />
                        <span>PayPal</span>
                      </label>
                    </div>
                  </div>

                  <button type="submit" className="donate-btn">
                    💳 Donate ${donationAmount || '0'}
                  </button>
                </form>
              </div>

              <div className="donation-info">
                <h3>How Your Donation Helps</h3>
                <div className="impact-breakdown">
                  <div className="impact-item">
                    <div className="impact-icon">🍽️</div>
                    <div className="impact-text">
                      <strong>$5</strong> provides one meal
                    </div>
                  </div>
                  <div className="impact-item">
                    <div className="impact-icon">🚚</div>
                    <div className="impact-text">
                      <strong>$25</strong> covers delivery costs
                    </div>
                  </div>
                  <div className="impact-item">
                    <div className="impact-icon">🏠</div>
                    <div className="impact-text">
                      <strong>$100</strong> supports a family for a week
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Achievements Tab */}
        {activeTab === 'achievements' && (
          <div className="achievements-section">
            <h2>Our Achievements</h2>
            
            <div className="achievements-grid">
              <div className="achievement-card">
                <div className="achievement-icon">🏆</div>
                <h3>Fundraising Goal</h3>
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ width: `${Math.min((totalFundsRaised / 10000) * 100, 100)}%` }}
                  ></div>
                </div>
                <p>${totalFundsRaised.toLocaleString()} / $10,000</p>
              </div>

              <div className="achievement-card">
                <div className="achievement-icon">👥</div>
                <h3>Community Support</h3>
                <p className="achievement-number">{totalDonors}</p>
                <p>Generous donors</p>
              </div>

              <div className="achievement-card">
                <div className="achievement-icon">🍽️</div>
                <h3>Meals Provided</h3>
                <p className="achievement-number">{mealsProvided}</p>
                <p>People fed</p>
              </div>

              <div className="achievement-card">
                <div className="achievement-icon">📈</div>
                <h3>Growth</h3>
                <p className="achievement-number">+{Math.floor((totalFundsRaised / 1000) * 10)}%</p>
                <p>Monthly increase</p>
              </div>
            </div>

            <div className="recent-donations">
              <h3>Recent Donations</h3>
              <div className="donations-list">
                {donations.slice(0, 5).map(donation => (
                  <div key={donation.id} className="donation-item">
                    <div className="donation-info">
                      <strong>{donation.donorName}</strong>
                      <span className="donation-date">{new Date(donation.date).toLocaleDateString()}</span>
                    </div>
                    <div className="donation-amount">${donation.amount}</div>
                    {donation.message && (
                      <div className="donation-message">"{donation.message}"</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FundraiserPage; 