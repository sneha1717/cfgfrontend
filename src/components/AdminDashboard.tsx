import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'donor' | 'volunteer';
  status: 'active' | 'inactive';
  joinDate: string;
}

interface HungerSpot {
  id: string;
  location: string;
  description: string;
  status: 'pending' | 'approved' | 'rejected' | 'resolved';
  reportedBy: string;
  reportedDate: string;
  assignedVolunteer?: string;
}

interface AdminInfo {
  name: string;
  email: string;
}

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'hunger-spots' | 'users'>('dashboard');
  const [vehicleAvailable, setVehicleAvailable] = useState(true);
  const [adminInfo, setAdminInfo] = useState<AdminInfo | null>(null);
  
  const [users, setUsers] = useState<User[]>([
    {
      id: '1',
      name: 'Sarah Johnson',
      email: 'sarah@example.com',
      role: 'donor',
      status: 'active',
      joinDate: '2024-01-01'
    },
    {
      id: '2',
      name: 'Mike Chen',
      email: 'mike@example.com',
      role: 'volunteer',
      status: 'active',
      joinDate: '2024-01-05'
    },
    {
      id: '3',
      name: 'Emma Davis',
      email: 'emma@example.com',
      role: 'donor',
      status: 'inactive',
      joinDate: '2024-01-10'
    }
  ]);

  const [hungerSpots, setHungerSpots] = useState<HungerSpot[]>([
    {
      id: '1',
      location: 'Downtown Area',
      description: 'Several homeless individuals need food assistance',
      status: 'pending',
      reportedBy: 'John Volunteer',
      reportedDate: '2024-01-15'
    },
    {
      id: '2',
      location: 'Central Park',
      description: 'Family with children struggling for food',
      status: 'approved',
      reportedBy: 'Sarah Donor',
      reportedDate: '2024-01-14',
      assignedVolunteer: 'Mike Chen'
    },
    {
      id: '3',
      location: 'Westside Mall',
      description: 'Elderly couple needs meal assistance',
      status: 'resolved',
      reportedBy: 'Emma Davis',
      reportedDate: '2024-01-13',
      assignedVolunteer: 'Mike Chen'
    }
  ]);

  useEffect(() => {
    // Check if admin is logged in
    const storedAdmin = localStorage.getItem('adminInfo');
    if (storedAdmin) {
      setAdminInfo(JSON.parse(storedAdmin));
    } else {
      // Redirect to login if not authenticated
      navigate('/admin-login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminInfo');
    navigate('/');
  };

  const handleVehicleToggle = () => {
    setVehicleAvailable(!vehicleAvailable);
  };

  const handleHungerSpotAction = (spotId: string, action: 'approve' | 'reject' | 'resolve') => {
    setHungerSpots(prev => prev.map(spot => {
      if (spot.id === spotId) {
        return {
          ...spot,
          status: action === 'approve' ? 'approved' : action === 'reject' ? 'rejected' : 'resolved'
        };
      }
      return spot;
    }));
  };

  const handleUserStatusToggle = (userId: string) => {
    setUsers(prev => prev.map(user => {
      if (user.id === userId) {
        return {
          ...user,
          status: user.status === 'active' ? 'inactive' : 'active'
        };
      }
      return user;
    }));
  };

  const handleDeleteUser = (userId: string) => {
    setUsers(prev => prev.filter(user => user.id !== userId));
  };

  const getMetrics = () => {
    const totalOrders = 156;
    const activeVolunteers = users.filter(u => u.role === 'volunteer' && u.status === 'active').length;
    const activeDonors = users.filter(u => u.role === 'donor' && u.status === 'active').length;
    const pendingSpots = hungerSpots.filter(s => s.status === 'pending').length;
    const resolvedSpots = hungerSpots.filter(s => s.status === 'resolved').length;

    return { totalOrders, activeVolunteers, activeDonors, pendingSpots, resolvedSpots };
  };

  const metrics = getMetrics();

  if (!adminInfo) {
    return <div>Loading...</div>;
  }

  return (
    <div className="admin-page">
      {/* Navbar */}
      <nav className="admin-navbar">
        <div className="nav-brand">
          <h2>🧑‍💼 Admin Dashboard</h2>
          <p>Welcome, {adminInfo.name}!</p>
        </div>
        <div className="nav-actions">
          <div className="vehicle-toggle">
            <span>Vehicle Available:</span>
            <button
              className={`toggle-btn ${vehicleAvailable ? 'active' : ''}`}
              onClick={handleVehicleToggle}
            >
              {vehicleAvailable ? '✅ Yes' : '❌ No'}
            </button>
          </div>
          <button className="nav-btn" onClick={() => navigate('/')}>
            Home
          </button>
          <button className="nav-btn logout" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </nav>

      <div className="admin-container">
        {/* Tab Navigation */}
        <div className="tab-navigation">
          <button
            className={`tab-btn ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            📊 Dashboard
          </button>
          <button
            className={`tab-btn ${activeTab === 'hunger-spots' ? 'active' : ''}`}
            onClick={() => setActiveTab('hunger-spots')}
          >
            📍 Hunger Spots
          </button>
          <button
            className={`tab-btn ${activeTab === 'users' ? 'active' : ''}`}
            onClick={() => setActiveTab('users')}
          >
            👥 Manage Users
          </button>
        </div>

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="dashboard-section">
            <h2>Overview Metrics</h2>
            <div className="metrics-grid">
              <div className="metric-card">
                <div className="metric-icon">📦</div>
                <div className="metric-content">
                  <h3>{metrics.totalOrders}</h3>
                  <p>Orders Placed</p>
                </div>
              </div>
              <div className="metric-card">
                <div className="metric-icon">🙋‍♂️</div>
                <div className="metric-content">
                  <h3>{metrics.activeVolunteers}</h3>
                  <p>Active Volunteers</p>
                </div>
              </div>
              <div className="metric-card">
                <div className="metric-icon">🍽️</div>
                <div className="metric-content">
                  <h3>{metrics.activeDonors}</h3>
                  <p>Active Donors</p>
                </div>
              </div>
              <div className="metric-card">
                <div className="metric-icon">📍</div>
                <div className="metric-content">
                  <h3>{metrics.pendingSpots}</h3>
                  <p>Pending Hunger Spots</p>
                </div>
              </div>
              <div className="metric-card">
                <div className="metric-icon">✅</div>
                <div className="metric-content">
                  <h3>{metrics.resolvedSpots}</h3>
                  <p>Resolved Hunger Spots</p>
                </div>
              </div>
              <div className="metric-card">
                <div className="metric-icon">🚚</div>
                <div className="metric-content">
                  <h3>{vehicleAvailable ? 'Available' : 'Unavailable'}</h3>
                  <p>Vehicle Status</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Hunger Spots Tab */}
        {activeTab === 'hunger-spots' && (
          <div className="hunger-spots-section">
            <h2>Hunger Spots Management</h2>
            <div className="spots-grid">
              {hungerSpots.map(spot => (
                <div key={spot.id} className={`spot-card ${spot.status}`}>
                  <div className="spot-header">
                    <h3>{spot.location}</h3>
                    <span className={`status-badge ${spot.status}`}>
                      {spot.status.charAt(0).toUpperCase() + spot.status.slice(1)}
                    </span>
                  </div>
                  <div className="spot-details">
                    <p><strong>Description:</strong> {spot.description}</p>
                    <p><strong>Reported by:</strong> {spot.reportedBy}</p>
                    <p><strong>Date:</strong> {new Date(spot.reportedDate).toLocaleDateString()}</p>
                    {spot.assignedVolunteer && (
                      <p><strong>Assigned to:</strong> {spot.assignedVolunteer}</p>
                    )}
                  </div>
                  <div className="spot-actions">
                    {spot.status === 'pending' && (
                      <>
                        <button
                          className="action-btn approve"
                          onClick={() => handleHungerSpotAction(spot.id, 'approve')}
                        >
                          ✅ Approve
                        </button>
                        <button
                          className="action-btn reject"
                          onClick={() => handleHungerSpotAction(spot.id, 'reject')}
                        >
                          ❌ Reject
                        </button>
                      </>
                    )}
                    {spot.status === 'approved' && (
                      <button
                        className="action-btn resolve"
                        onClick={() => handleHungerSpotAction(spot.id, 'resolve')}
                      >
                        ✅ Mark Resolved
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div className="users-section">
            <h2>Manage Donors & Volunteers</h2>
            <div className="users-table">
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th>Join Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(user => (
                    <tr key={user.id}>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>
                        <span className={`role-badge ${user.role}`}>
                          {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                        </span>
                      </td>
                      <td>
                        <span className={`status-badge ${user.status}`}>
                          {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                        </span>
                      </td>
                      <td>{new Date(user.joinDate).toLocaleDateString()}</td>
                      <td>
                        <div className="user-actions">
                          <button
                            className={`toggle-btn ${user.status === 'active' ? 'active' : ''}`}
                            onClick={() => handleUserStatusToggle(user.id)}
                          >
                            {user.status === 'active' ? 'Deactivate' : 'Activate'}
                          </button>
                          <button
                            className="delete-btn"
                            onClick={() => handleDeleteUser(user.id)}
                          >
                            🗑️ Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard; 