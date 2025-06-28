import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './DonorPage.css';

interface DonationForm {
  productName: string;
  category: string;
  servingSize: string;
  image: File | null;
  selfVolunteer: boolean;
  name: string;
  contactNumber: string;
  availableTime: string;
  address: string;
}

const DonorPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<DonationForm>({
    productName: '',
    category: '',
    servingSize: '',
    image: null,
    selfVolunteer: false,
    name: '',
    contactNumber: '',
    availableTime: '',
    address: ''
  });
  const [showSelfVolunteerForm, setShowSelfVolunteerForm] = useState(false);
  const [showLargeDonationForm, setShowLargeDonationForm] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({
        ...prev,
        image: e.target.files![0]
      }));
    }
  };

  const handleServingSizeSelect = (size: string) => {
    setFormData(prev => ({
      ...prev,
      servingSize: size
    }));

    if (size === '< 50') {
      setShowLargeDonationForm(false);
    } else {
      setShowLargeDonationForm(true);
      setShowSelfVolunteerForm(false);
    }
  };

  const handleSelfVolunteerChoice = (choice: boolean) => {
    setFormData(prev => ({
      ...prev,
      selfVolunteer: choice
    }));
    setShowSelfVolunteerForm(choice);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.image) {
      alert('Please upload an image of the food item');
      return;
    }
    
    if (!formData.name || !formData.contactNumber || !formData.address) {
      alert('Please fill in all required personal information fields');
      return;
    }
    
    // Here you would typically send the data to your backend
    console.log('Donation submitted:', formData);
    alert('Thank you for your donation! We will contact you soon.');
    navigate('/');
  };

  return (
    <div className="donor-page">
      {/* Navbar */}
      <nav className="donor-navbar">
        <div className="nav-brand">
          <h2>🍽️ Donor Dashboard</h2>
        </div>
        <div className="nav-actions">
          <button className="nav-btn" onClick={() => navigate('/')}>
            Home
          </button>
          <button className="nav-btn primary" onClick={handleSubmit}>
            Submit Donation
          </button>
        </div>
      </nav>

      <div className="donor-container">
        <div className="donation-form">
          <h1>Donate Food</h1>
          <p>Help fight hunger by donating surplus food</p>

          <form onSubmit={handleSubmit}>
            {/* Personal Information */}
            <div className="form-section">
              <h3>Personal Information</h3>
              
              <div className="form-group">
                <label htmlFor="name">Full Name *</label>
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
                <label htmlFor="contactNumber">Mobile Number *</label>
                <input
                  type="tel"
                  id="contactNumber"
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter your mobile number"
                />
              </div>

              <div className="form-group">
                <label htmlFor="address">Address *</label>
                <textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter your complete address"
                  rows={3}
                />
              </div>
            </div>

            {/* Product Information */}
            <div className="form-section">
              <h3>Product Information</h3>
              
              <div className="form-group">
                <label htmlFor="productName">Product Name *</label>
                <input
                  type="text"
                  id="productName"
                  name="productName"
                  value={formData.productName}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g., Biryani, Pizza, Sandwiches"
                />
              </div>

              <div className="form-group">
                <label htmlFor="image">Upload Image *</label>
                <input
                  type="file"
                  id="image"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="file-input"
                  required
                />
                {formData.image && (
                  <div className="image-preview">
                    <img 
                      src={URL.createObjectURL(formData.image)} 
                      alt="Preview" 
                      className="preview-img"
                    />
                  </div>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="category">Category *</label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Category</option>
                  <option value="breakfast">Breakfast</option>
                  <option value="lunch">Lunch</option>
                  <option value="dinner">Dinner</option>
                </select>
              </div>
            </div>

            {/* Serving Size Selection */}
            <div className="form-section">
              <h3>Serving Size</h3>
              <div className="serving-buttons">
                <button
                  type="button"
                  className={`serving-btn ${formData.servingSize === '< 50' ? 'active' : ''}`}
                  onClick={() => handleServingSizeSelect('< 50')}
                >
                  &lt; 50 servings
                </button>
                <button
                  type="button"
                  className={`serving-btn ${formData.servingSize === '>= 50' ? 'active' : ''}`}
                  onClick={() => handleServingSizeSelect('>= 50')}
                >
                  ≥ 50 servings
                </button>
              </div>
            </div>

            {/* Conditional Forms */}
            {formData.servingSize === '< 50' && (
              <div className="form-section">
                <h3>Delivery Option</h3>
                <p>Will you self-volunteer to deliver?</p>
                <div className="volunteer-choice">
                  <button
                    type="button"
                    className={`choice-btn ${formData.selfVolunteer ? 'active' : ''}`}
                    onClick={() => handleSelfVolunteerChoice(true)}
                  >
                    Yes, I'll deliver
                  </button>
                  <button
                    type="button"
                    className={`choice-btn ${!formData.selfVolunteer && formData.servingSize === '< 50' ? 'active' : ''}`}
                    onClick={() => handleSelfVolunteerChoice(false)}
                  >
                    Need Volunteer
                  </button>
                </div>

                {showSelfVolunteerForm && (
                  <div className="self-volunteer-form">
                    <h4>Self-Volunteering Details</h4>
                    <div className="form-group">
                      <label htmlFor="availableTime">Available Time for Delivery *</label>
                      <input
                        type="datetime-local"
                        id="availableTime"
                        name="availableTime"
                        value={formData.availableTime}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                )}
              </div>
            )}

            {showLargeDonationForm && (
              <div className="form-section">
                <h3>Large Donation Details</h3>
                <div className="form-group">
                  <label htmlFor="availableTime">Available Time for Pickup *</label>
                  <input
                    type="datetime-local"
                    id="availableTime"
                    name="availableTime"
                    value={formData.availableTime}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
            )}

            <div className="form-actions">
              <button type="submit" className="submit-btn">
                Submit Donation
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DonorPage; 