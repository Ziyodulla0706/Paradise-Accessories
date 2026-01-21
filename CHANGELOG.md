# Changelog

All notable changes to the Paradise Accessories website will be documented in this file.

## [Release] - 2026-01-12

### Added
- ✨ **Background Animations**: Added floating labels and tags animations throughout all pages
  - Animated rectangular labels
  - Floating hang tags
  - Woven label patterns
  - Leather patch elements
  - Responsive animation count based on screen size
  - Reduced motion support for accessibility

- 🔌 **API Integration**: 
  - Integrated contact form with Django backend API
  - Added API configuration system (`config.js`)
  - Error handling for API requests
  - Analytics event tracking integration

- 📦 **Production Ready**:
  - Created deployment documentation
  - Added API configuration file
  - Enhanced error handling
  - Improved form validation

### Changed
- 🔄 Form submission now sends data to `/api/contact/submit/` endpoint
- 🎨 Background animations adapt to screen size (mobile: 8, tablet: 12, desktop: 20 elements)
- 📱 Improved mobile performance by reducing animation complexity

### Fixed
- ✅ Form validation improved
- ✅ Better error messages for API failures
- ✅ Mobile menu interactions

### Technical Details
- CSS animations for background elements
- JavaScript background animation system
- API configuration with automatic baseURL detection
- Production deployment guide

## Previous Releases

See git history for previous changes.
