// // Initialize EmailJS
// (function() {
//     emailjs.init("UGNxgZtksw4KMYJ3k");
// })();

// // Form submission function
// function submitForm(event) {
//     event.preventDefault();
    
//     const submitButton = document.querySelector('.submit-btn');
//     const originalText = submitButton.innerHTML;
//     submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
//     submitButton.disabled = true;

//     const templateParams = {
//         to_name: 'Kalavathi S',
//         from_name: document.getElementById('name').value,
//         from_email: document.getElementById('email').value,
//         message: document.getElementById('message').value,
//     };

//     emailjs.send('service_hpebmua', 'template_9trwunv', templateParams)
//         .then(function(response) {
//             if (response.status === 200) {
//                 alert('Thank you for your message! I will get back to you soon.');
//                 document.querySelector('form').reset();
//             } else {
//                 throw new Error('Failed to send message');
//             }
//         })
//         .catch(function(error) {
//             console.error('FAILED...', error);
//             alert('Oops! Something went wrong. Please try again later.');
//         })
//         .finally(function() {
//             submitButton.innerHTML = originalText;
//             submitButton.disabled = false;
//         });
// }



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


// Add this to ensure the theme is set correctly on page load
document.addEventListener('DOMContentLoaded', function() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (prefersDark) {
        document.body.setAttribute('data-theme', 'dark');
        document.querySelector('.theme-toggle i').classList.replace('fa-sun', 'fa-moon');
    }
});

// Array of professional programming quotes
const quotes = [
    {
        text: "First, solve the problem. Then, write the code.",
        author: "John Johnson"
    },
    {
        text: "Clean code always looks like it was written by someone who cares.",
        author: "Robert C. Martin"
    },
    {
        text: "Programming isn't about what you know; it's about what you can figure out.",
        author: "Chris Pine"
    },
    {
        text: "The best way to predict the future is to implement it.",
        author: "David Heinemeier Hansson"
    },
    {
        text: "Make it work, make it right, make it fast.",
        author: "Kent Beck"
    },
    {
        text: "Simplicity is the soul of efficiency.",
        author: "Austin Freeman"
    },
    {
        text: "Every great developer you know got there by solving problems they were unqualified to solve until they actually did it.",
        author: "Patrick McKenzie"
    }
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
        // Add fade-out effect
        quoteElement.style.opacity = '0';
        
        setTimeout(() => {
            const quote = getRandomQuote();
            quoteElement.innerHTML = `
                "${quote.text}"
                <footer>- ${quote.author}</footer>
            `;
            // Add fade-in effect
            quoteElement.style.opacity = '1';
        }, 500); // Wait for fade out to complete
    }
}

// Initialize quote when page loads
document.addEventListener('DOMContentLoaded', () => {
    updateQuote();
    // Change quote every 3 seconds
    setInterval(updateQuote, 3000);
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

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', updateProjectDots);
const projectsContainer = document.querySelector('.projects-container');
const dots = document.querySelectorAll('.dot');

projectsContainer.addEventListener('scroll', () => {
    const scrollPosition = projectsContainer.scrollLeft;
    const cardWidth = projectsContainer.querySelector('.project-card').offsetWidth;
    const activeIndex = Math.round(scrollPosition / (cardWidth + 32)); // 32 is the gap

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

// DOM Content Loaded Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    // Theme initialization
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (prefersDark) {
        document.body.setAttribute('data-theme', 'dark');
        document.querySelector('.theme-toggle i').classList.replace('fa-sun', 'fa-moon');
    }

    // Initialize quotes
    updateQuote();
    setInterval(updateQuote, 3000);

    // Initialize project dots
    updateProjectDots();
});