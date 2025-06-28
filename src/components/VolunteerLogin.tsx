import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './VolunteerLogin.css';

const VolunteerLogin: React.FC = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');

  // Static volunteer credentials
  const staticVolunteers = [
    { email: 'volunteer@example.com', password: 'volunteer123', name: 'John Volunteer' },
    { email: 'mike@example.com', password: 'mike123', name: 'Mike Chen' },
    { email: 'sarah@example.com', password: 'sarah123', name: 'Sarah Johnson' }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    const volunteer = staticVolunteers.find(v => 
      v.email === formData.email && v.password === formData.password
    );

    if (volunteer) {
      // Store volunteer info in localStorage (in real app, you'd use proper auth)
      localStorage.setItem('volunteerInfo', JSON.stringify(volunteer));
      navigate('/volunteer');
    } else {
      setError('Invalid email or password. Try: volunteer@example.com / volunteer123');
    }
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    // In a real app, you'd send this to your backend
    alert('Account created successfully! You can now login.');
    setIsLogin(true);
    setFormData({
      email: '',
      password: '',
      name: '',
      confirmPassword: ''
    });
  };

  return (
    <div className="volunteer-login-page">
      <div className="login-container">
        <div className="login-header">
          <h1>🙋‍♂️ Volunteer Portal</h1>
          <p>{isLogin ? 'Welcome back! Please login to continue.' : 'Create your volunteer account'}</p>
        </div>

        <div className="login-tabs">
          <button
            className={`tab-btn ${isLogin ? 'active' : ''}`}
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
          <button
            className={`tab-btn ${!isLogin ? 'active' : ''}`}
            onClick={() => setIsLogin(false)}
          >
            Sign Up
          </button>
        </div>

        {error && <div className="error-message">{error}</div>}

        {isLogin ? (
          <form onSubmit={handleLogin} className="login-form">
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                placeholder="Enter your email"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                placeholder="Enter your password"
              />
            </div>

            <button type="submit" className="submit-btn">
              Login
            </button>

            <div className="demo-credentials">
              <h4>Demo Credentials:</h4>
              <p><strong>Email:</strong> volunteer@example.com</p>
              <p><strong>Password:</strong> volunteer123</p>
            </div>
          </form>
        ) : (
          <form onSubmit={handleSignup} className="signup-form">
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                placeholder="Enter your full name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                placeholder="Enter your email"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                placeholder="Create a password (min 6 characters)"
                minLength={6}
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
                placeholder="Confirm your password"
              />
            </div>

            <button type="submit" className="submit-btn">
              Create Account
            </button>
          </form>
        )}

        <div className="back-link">
          <button onClick={() => navigate('/')} className="back-btn">
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default VolunteerLogin; 