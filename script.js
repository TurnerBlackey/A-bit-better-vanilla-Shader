document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for anchor links
    document.querySelectorAll('.scroll-link').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Image comparison slider functionality
    const slider = document.querySelector('.comparison-slider');
    const sliderOverlay = document.querySelector('.slider-overlay');
    const sliderHandle = document.querySelector('.slider-handle');
    
    let isDragging = false;
    
    // Initialize the slider position
    function setSliderPosition(position) {
        const sliderRect = slider.getBoundingClientRect();
        const x = Math.max(0, Math.min(position, sliderRect.width));
        const percentage = (x / sliderRect.width) * 100;
        
        sliderOverlay.style.width = `${percentage}%`;
        sliderHandle.style.left = `${percentage}%`;
    }
    
    // Event handlers for mouse and touch interactions
    function startDrag(e) {
        isDragging = true;
        slider.classList.add('active');
        updateSliderPosition(e);
    }
    
    function endDrag() {
        isDragging = false;
        slider.classList.remove('active');
    }
    
    function updateSliderPosition(e) {
        if (!isDragging) return;
        
        const sliderRect = slider.getBoundingClientRect();
        let clientX;
        
        if (e.type === 'touchmove') {
            clientX = e.touches[0].clientX;
        } else {
            clientX = e.clientX;
        }
        
        const position = clientX - sliderRect.left;
        setSliderPosition(position);
    }
    
    // Mouse events
    slider.addEventListener('mousedown', startDrag);
    window.addEventListener('mouseup', endDrag);
    window.addEventListener('mousemove', updateSliderPosition);
    
    // Touch events
    slider.addEventListener('touchstart', startDrag);
    window.addEventListener('touchend', endDrag);
    window.addEventListener('touchcancel', endDrag);
    window.addEventListener('touchmove', updateSliderPosition);
    
    // Set initial position (50%)
    setSliderPosition(slider.getBoundingClientRect().width / 2);
    
    // Download button animation
    const downloadButton = document.querySelector('.download-button');
    
    downloadButton.addEventListener('click', function() {
        this.classList.add('pulse');
        setTimeout(() => {
            this.classList.remove('pulse');
        }, 300);
    });
    
    // Feature hover animations
    const features = document.querySelectorAll('.feature');
    
    features.forEach(feature => {
        feature.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.feature-icon');
            icon.style.transform = 'scale(1.1) rotate(5deg)';
            setTimeout(() => {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }, 300);
        });
    });
});