import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './VolunteerPage.css';

interface Order {
  id: string;
  donorName: string;
  productName: string;
  servings: number;
  time: string;
  location: string;
  status: 'pending' | 'accepted' | 'ignored';
}

interface HungerSpot {
  location: string;
  description: string;
  photo: File | null;
}

interface VolunteerInfo {
  name: string;
  email: string;
}

const VolunteerPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'orders' | 'hunger-spots'>('orders');
  const [volunteerInfo, setVolunteerInfo] = useState<VolunteerInfo | null>(null);
  
  const [orders, setOrders] = useState<Order[]>([
    {
      id: '1',
      donorName: 'Sarah Johnson',
      productName: 'Biryani',
      servings: 25,
      time: '2024-01-15T18:00',
      location: 'Downtown Area',
      status: 'pending'
    },
    {
      id: '2',
      donorName: 'Mike Chen',
      productName: 'Pizza',
      servings: 40,
      time: '2024-01-15T19:30',
      location: 'Westside Mall',
      status: 'pending'
    },
    {
      id: '3',
      donorName: 'Emma Davis',
      productName: 'Sandwiches',
      servings: 15,
      time: '2024-01-15T20:00',
      location: 'Central Park',
      status: 'pending'
    }
  ]);

  const [hungerSpot, setHungerSpot] = useState<HungerSpot>({
    location: '',
    description: '',
    photo: null
  });

  useEffect(() => {
    // Check if volunteer is logged in
    const storedVolunteer = localStorage.getItem('volunteerInfo');
    if (storedVolunteer) {
      setVolunteerInfo(JSON.parse(storedVolunteer));
    } else {
      // Redirect to login if not authenticated
      navigate('/volunteer-login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('volunteerInfo');
    navigate('/');
  };

  const handleOrderAction = (orderId: string, action: 'accept' | 'ignore') => {
    setOrders(prev => prev.map(order => 
      order.id === orderId 
        ? { ...order, status: action === 'accept' ? 'accepted' : 'ignored' }
        : order
    ));
  };

  const handleHungerSpotInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setHungerSpot(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setHungerSpot(prev => ({
        ...prev,
        photo: e.target.files![0]
      }));
    }
  };

  const handleHungerSpotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Hunger spot reported:', hungerSpot);
    alert('Hunger spot reported successfully!');
    setHungerSpot({
      location: '',
      description: '',
      photo: null
    });
  };

  const formatDateTime = (dateTime: string) => {
    return new Date(dateTime).toLocaleString();
  };

  if (!volunteerInfo) {
    return <div>Loading...</div>;
  }

  return (
    <div className="volunteer-page">
      {/* Navbar */}
      <nav className="volunteer-navbar">
        <div className="nav-brand">
          <h2>🙋‍♂️ Volunteer Dashboard</h2>
          <p>Welcome, {volunteerInfo.name}!</p>
        </div>
        <div className="nav-actions">
          <button className="nav-btn" onClick={() => navigate('/')}>
            Home
          </button>
          <button className="nav-btn logout" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </nav>

      <div className="volunteer-container">
        {/* Tab Navigation */}
        <div className="tab-navigation">
          <button
            className={`tab-btn ${activeTab === 'orders' ? 'active' : ''}`}
            onClick={() => setActiveTab('orders')}
          >
            📋 Order List
          </button>
          <button
            className={`tab-btn ${activeTab === 'hunger-spots' ? 'active' : ''}`}
            onClick={() => setActiveTab('hunger-spots')}
          >
            📍 Report Hunger Spot
          </button>
        </div>

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div className="orders-section">
            <h2>Available Orders</h2>
            <div className="orders-grid">
              {orders.filter(order => order.status === 'pending').map(order => (
                <div key={order.id} className="order-card">
                  <div className="order-header">
                    <h3>{order.productName}</h3>
                    <span className="servings-badge">{order.servings} servings</span>
                  </div>
                  <div className="order-details">
                    <p><strong>Donor:</strong> {order.donorName}</p>
                    <p><strong>Time:</strong> {formatDateTime(order.time)}</p>
                    <p><strong>Location:</strong> {order.location}</p>
                  </div>
                  <div className="order-actions">
                    <button
                      className="action-btn accept"
                      onClick={() => handleOrderAction(order.id, 'accept')}
                    >
                      ✅ Accept
                    </button>
                    <button
                      className="action-btn ignore"
                      onClick={() => handleOrderAction(order.id, 'ignore')}
                    >
                      ❌ Ignore
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Accepted Orders */}
            <h2>Accepted Orders</h2>
            <div className="orders-grid">
              {orders.filter(order => order.status === 'accepted').map(order => (
                <div key={order.id} className="order-card accepted">
                  <div className="order-header">
                    <h3>{order.productName}</h3>
                    <span className="status-badge accepted">Accepted</span>
                  </div>
                  <div className="order-details">
                    <p><strong>Donor:</strong> {order.donorName}</p>
                    <p><strong>Time:</strong> {formatDateTime(order.time)}</p>
                    <p><strong>Location:</strong> {order.location}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Hunger Spots Tab */}
        {activeTab === 'hunger-spots' && (
          <div className="hunger-spots-section">
            <h2>Report a Hunger Spot</h2>
            <form onSubmit={handleHungerSpotSubmit} className="hunger-spot-form">
              <div className="form-group">
                <label htmlFor="location">Location *</label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={hungerSpot.location}
                  onChange={handleHungerSpotInput}
                  required
                  placeholder="Enter the location or address"
                />
              </div>

              <div className="form-group">
                <label htmlFor="description">Description *</label>
                <textarea
                  id="description"
                  name="description"
                  value={hungerSpot.description}
                  onChange={handleHungerSpotInput}
                  required
                  placeholder="Describe the hunger situation and any specific details..."
                  rows={4}
                />
              </div>

              <div className="form-group">
                <label htmlFor="photo">Photo (Optional)</label>
                <input
                  type="file"
                  id="photo"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="file-input"
                />
                {hungerSpot.photo && (
                  <div className="photo-preview">
                    <img 
                      src={URL.createObjectURL(hungerSpot.photo)} 
                      alt="Preview" 
                      className="preview-img"
                    />
                  </div>
                )}
              </div>

              <div className="form-actions">
                <button type="submit" className="submit-btn">
                  Report Hunger Spot
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default VolunteerPage; 