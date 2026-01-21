// Paradise Accessories - Background Animation System
// Floating labels and tags animation
// ==================================================

(function() {
    'use strict';

    // Configuration
    const config = {
        // Number of elements based on screen size
        mobile: 10,
        tablet: 15,
        desktop: 25,
        // Types of labels/tags
        labelTypes: [
            'label-rect',
            'tag-hang',
            'label-woven',
            'patch-leather'
        ],
        // Animation types
        animationTypes: [
            'anim-slow',
            'anim-medium',
            'anim-fast',
            'anim-vertical',
            'anim-spiral'
        ],
        // Size classes
        sizes: ['small', 'medium', 'large']
    };

    // Store resize handler reference to properly remove it
    let resizeHandler = null;
    let resizeTimeout = null;
    let animationContainer = null;

    /**
     * Get number of elements based on screen width
     */
    function getElementCount() {
        const width = window.innerWidth;
        if (width <= 768) return config.mobile;
        if (width <= 1024) return config.tablet;
        return config.desktop;
    }

    /**
     * Generate random number between min and max
     */
    function random(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    /**
     * Get random item from array
     */
    function randomItem(array) {
        return array[random(0, array.length - 1)];
    }

    /**
     * Create a floating label element
     */
    function createFloatingLabel(index) {
        const label = document.createElement('div');
        label.className = 'floating-label';
        
        // Add random type
        label.classList.add(randomItem(config.labelTypes));
        
        // Add random size
        label.classList.add(randomItem(config.sizes));
        
        // Add random animation
        label.classList.add(randomItem(config.animationTypes));
        
        // Random position
        const left = random(0, 95); // Keep within viewport
        const top = random(-10, 110); // Allow some to start off-screen
        
        // Random delay for staggered animation
        const delay = random(0, 5000);
        
        label.style.position = 'absolute';
        label.style.left = `${left}%`;
        label.style.top = `${top}%`;
        label.style.animationDelay = `${delay}ms`;
        label.style.display = 'block';
        label.style.visibility = 'visible';
        
        return label;
    }

    /**
     * Initialize background animation
     */
    function initBackgroundAnimation() {
        try {
            // Check for reduced motion preference
            const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            if (prefersReducedMotion) {
                // Create minimal static background
                createStaticBackground();
                return;
            }

            // Remove existing container if any
            if (animationContainer && animationContainer.parentNode) {
                animationContainer.remove();
            }

            // Remove old resize handler if exists
            if (resizeHandler) {
                window.removeEventListener('resize', resizeHandler);
                resizeHandler = null;
            }
            if (resizeTimeout) {
                clearTimeout(resizeTimeout);
                resizeTimeout = null;
            }

            // Create new container
            animationContainer = document.createElement('div');
            animationContainer.className = 'background-animation';
            animationContainer.id = 'backgroundAnimation';
            
            // Ensure container has correct styles
            animationContainer.style.position = 'fixed';
            animationContainer.style.top = '0';
            animationContainer.style.left = '0';
            animationContainer.style.width = '100vw';
            animationContainer.style.height = '100vh';
            animationContainer.style.zIndex = '-1';
            animationContainer.style.pointerEvents = 'none';
            animationContainer.style.overflow = 'hidden';
            animationContainer.style.background = 'transparent';
            animationContainer.style.display = 'block';
            
            // Add to body (before content)
            if (document.body) {
                document.body.insertBefore(animationContainer, document.body.firstChild);
            } else {
                console.error('Body element not found');
                return;
            }
            
            // Generate elements
            const count = getElementCount();
            for (let i = 0; i < count; i++) {
                const label = createFloatingLabel(i);
                animationContainer.appendChild(label);
            }
            
            // Debug: log creation
            console.log(`✅ Background animation initialized: ${count} elements created`);

            // Create resize handler
            resizeHandler = function() {
                if (resizeTimeout) {
                    clearTimeout(resizeTimeout);
                }
                resizeTimeout = setTimeout(function() {
                    if (!animationContainer) return;
                    
                    const newCount = getElementCount();
                    const currentCount = animationContainer.children.length;
                    
                    // Only recreate if count changed significantly
                    if (Math.abs(newCount - currentCount) > 3) {
                        animationContainer.innerHTML = '';
                        for (let i = 0; i < newCount; i++) {
                            const label = createFloatingLabel(i);
                            animationContainer.appendChild(label);
                        }
                        console.log(`🔄 Resized: ${newCount} elements`);
                    }
                }, 500);
            };
            
            // Add resize listener
            window.addEventListener('resize', resizeHandler);
        } catch (error) {
            console.error('Error initializing background animation:', error);
        }
    }

    /**
     * Create static background for reduced motion preference
     */
    function createStaticBackground() {
        try {
            if (animationContainer && animationContainer.parentNode) {
                animationContainer.remove();
            }

            animationContainer = document.createElement('div');
            animationContainer.className = 'background-animation';
            animationContainer.id = 'backgroundAnimation';
            animationContainer.style.position = 'fixed';
            animationContainer.style.top = '0';
            animationContainer.style.left = '0';
            animationContainer.style.width = '100%';
            animationContainer.style.height = '100%';
            animationContainer.style.zIndex = '0';
            animationContainer.style.pointerEvents = 'none';
            animationContainer.style.overflow = 'hidden';
            
            if (document.body) {
                document.body.insertBefore(animationContainer, document.body.firstChild);
            } else {
                console.error('Body element not found');
                return;
            }
            
            // Add a few static elements
            const count = Math.floor(getElementCount() / 2);
            for (let i = 0; i < count; i++) {
                const label = createFloatingLabel(i);
                label.style.animation = 'none';
                label.style.opacity = '0.05';
                animationContainer.appendChild(label);
            }
        } catch (error) {
            console.error('Error creating static background:', error);
        }
    }

    /**
     * Initialize when DOM is ready
     */
    function init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', function() {
                // Small delay to ensure all styles are loaded
                setTimeout(initBackgroundAnimation, 100);
            });
        } else {
            // DOM already ready, but wait a bit for styles
            setTimeout(initBackgroundAnimation, 100);
        }
    }

    // Start initialization
    init();

    // Export for manual control if needed
    window.backgroundAnimation = {
        init: initBackgroundAnimation,
        config: config,
        getContainer: function() {
            return animationContainer || document.getElementById('backgroundAnimation');
        }
    };

})();
