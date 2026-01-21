// Paradise Accessories - API Configuration
// ==================================================

// API Configuration
// Update these URLs according to your deployment
window.API_CONFIG = {
    // Backend API base URL
    // For development: http://localhost:8000
    // For production: https://api.paradise-acc.uz
    baseURL: window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' 
        ? 'http://localhost:8000' 
        : '', // Empty string means same origin
    
    // API endpoints
    contactEndpoint: '/api/contact/submit/',
    analyticsEndpoint: '/api/analytics/track/',
    
    // Full API URLs (will be constructed automatically if baseURL is set)
    get contactURL() {
        return this.baseURL ? `${this.baseURL}${this.contactEndpoint}` : this.contactEndpoint;
    },
    
    get analyticsURL() {
        return this.baseURL ? `${this.baseURL}${this.analyticsEndpoint}` : this.analyticsEndpoint;
    }
};

// Google Analytics ID (if configured)
window.GA_MEASUREMENT_ID = 'GA_MEASUREMENT_ID'; // Replace with your actual GA ID
