// Initialize EmailJS
(function() {
    emailjs.init(config.emailjs.publicKey);
})();

// Form submission function
function submitForm(event) {
    event.preventDefault();
    
    const submitButton = document.querySelector('.submit-btn');
    const originalText = submitButton.innerHTML;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitButton.disabled = true;

    const templateParams = {
        to_name: 'Kalavathi S',
        from_name: document.getElementById('name').value,
        from_email: document.getElementById('email').value,
        message: document.getElementById('message').value,
    };

    emailjs.send(config.emailjs.serviceId, config.emailjs.templateId, templateParams)
        .then(function(response) {
            if (response.status === 200) {
                alert('Thank you for your message! I will get back to you soon.');
                document.querySelector('form').reset();
            } else {
                throw new Error('Failed to send message');
            }
        })
        .catch(function(error) {
            console.error('FAILED...', error);
            alert('Oops! Something went wrong. Please try again later.');
        })
        .finally(function() {
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
        });
}

// Attach submitForm to form submit event
document.querySelector('form').addEventListener('submit', submitForm);

// Array of professional programming quotes
const quotes = [
    { text: "First, solve the problem. Then, write the code.", author: "John Johnson" },
    { text: "Clean code always looks like it was written by someone who cares.", author: "Robert C. Martin" },
    { text: "Programming isn't about what you know; it's about what you can figure out.", author: "Chris Pine" },
    { text: "The best way to predict the future is to implement it.", author: "David Heinemeier Hansson" },
    { text: "Make it work, make it right, make it fast.", author: "Kent Beck" },
    { text: "Simplicity is the soul of efficiency.", author: "Austin Freeman" },
    { text: "Every great developer you know got there by solving problems they were unqualified to solve until they actually did it.", author: "Patrick McKenzie" }
];

// Function to get a random quote
function getRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
}

// Function to update quote with fade effect
function updateQuote() {
    const quoteElement = document.querySelector('.quote-section blockquote');
    if (quoteElement) {
        // Fade out
        quoteElement.style.opacity = '0';
        
        setTimeout(() => {
            const quote = getRandomQuote();
            quoteElement.innerHTML = `
                "${quote.text}"
                <footer>- ${quote.author}</footer>
            `;
            // Fade in
            quoteElement.style.opacity = '1';
        }, 500); // Wait for fade-out to complete
    }
}

// Initialize quote when page loads
document.addEventListener('DOMContentLoaded', () => {
    updateQuote();
    // Change quote every 5 seconds for better readability
    setInterval(updateQuote, 5000);
});


// Add this to your existing script.js or in a script tag
function updateProjectDots() {
    const projectsContainer = document.querySelector('.projects-container');
    const dots = document.querySelectorAll('.dot');
    const cards = document.querySelectorAll('.project-card');
    const containerWidth = projectsContainer.offsetWidth;
    
    // Update on scroll
    projectsContainer.addEventListener('scroll', () => {
        const scrollPosition = projectsContainer.scrollLeft;
        const cardWidth = cards[0].offsetWidth + 32; // 32 is the gap
        const visibleIndex = Math.round(scrollPosition / cardWidth);
        
        // Update dots
        dots.forEach((dot, index) => {
            if (index === visibleIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    });

    // Click on dots to scroll
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            const cardWidth = cards[0].offsetWidth + 32; // 32 is the gap
            projectsContainer.scrollTo({
                left: index * cardWidth,
                behavior: 'smooth'
            });
        });
    });

    // Intersection Observer to handle visibility
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const index = Array.from(cards).indexOf(entry.target);
            if (entry.isIntersecting) {
                dots[index].classList.add('active');
            } else {
                dots[index].classList.remove('active');
            }
        });
    }, {
        root: projectsContainer,
        threshold: 0.5
    });

    // Observe each card
    cards.forEach(card => observer.observe(card));
}

// Add theme toggle function
function toggleTheme() {
    const body = document.body;
    const themeIcon = document.querySelector('.theme-toggle i');
    
    console.log('Toggle clicked');
    
    // Simple toggle
    if (body.getAttribute('data-theme') === 'dark') {
        // Switch to light theme
        body.removeAttribute('data-theme');
        themeIcon.className = 'fas fa-sun';
    } else {
        // Switch to dark theme
        body.setAttribute('data-theme', 'dark');
        themeIcon.className = 'fas fa-moon';
    }
    
    // Log the current state
    console.log('Current theme:', body.getAttribute('data-theme'));
    console.log('Current icon:', themeIcon.className);
}

// Single consolidated DOMContentLoaded event listener
document.addEventListener('DOMContentLoaded', function() {
    // Remove onclick attribute if it exists
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        themeToggle.removeAttribute('onclick');
        themeToggle.addEventListener('click', toggleTheme);
        console.log('Theme toggle initialized');
    } else {
        console.error('Theme toggle button not found');
    }

    // Initialize quotes
    updateQuote();
    setInterval(updateQuote, 3000);

    // Initialize project dots
    updateProjectDots();

    // Initialize project container scroll behavior
    const projectsContainer = document.querySelector('.projects-container');
    const dots = document.querySelectorAll('.dot');

    projectsContainer.addEventListener('scroll', () => {
        const scrollPosition = projectsContainer.scrollLeft;
        const cardWidth = projectsContainer.querySelector('.project-card').offsetWidth;
        const activeIndex = Math.round(scrollPosition / (cardWidth + 32));

        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === activeIndex);
        });
    });

    // Add click handling for the dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            const cardWidth = projectsContainer.querySelector('.project-card').offsetWidth;
            projectsContainer.scrollTo({
                left: index * (cardWidth + 32),
                behavior: 'smooth'
            });
        });
    });
});