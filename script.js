// Form Elements
const form = document.getElementById('contactForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');
const submitButton = form.querySelector('.cta-button');
const successMessage = document.getElementById('successMessage');

// Error Messages
const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const messageError = document.getElementById('messageError');

// Character count
const charCount = document.getElementById('charCount');
const charCountContainer = document.querySelector('.char-count');

// Validation Rules
const validators = {
    name: (value) => {
        if (!value.trim()) return 'Name is required';
        if (value.trim().length < 2) return 'Name must be at least 2 characters';
        return '';
    },
    email: (value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value.trim()) return 'Email is required';
        if (!emailRegex.test(value)) return 'Please enter a valid email';
        return '';
    },
    message: (value) => {
        if (!value.trim()) return 'Message is required';
        if (value.trim().length < 10) return 'Message must be at least 10 characters';
        if (value.length > 500) return 'Message cannot exceed 500 characters';
        return '';
    }
};

// Validate individual field
function validateField(field, value) {
    const errorMessage = validators[field](value);
    const errorElement = document.getElementById(`${field}Error`);
    const input = document.getElementById(field);

    if (errorMessage) {
        errorElement.textContent = errorMessage;
        errorElement.classList.add('show');
        input.classList.add('error');
        input.classList.remove('success');
        return false;
    } else {
        errorElement.textContent = '';
        errorElement.classList.remove('show');
        input.classList.remove('error');
        input.classList.add('success');
        return true;
    }
}

// Real-time validation on input
nameInput.addEventListener('blur', () => {
    validateField('name', nameInput.value);
});

emailInput.addEventListener('blur', () => {
    validateField('email', emailInput.value);
});

messageInput.addEventListener('blur', () => {
    validateField('message', messageInput.value);
});

// Character count for message
messageInput.addEventListener('input', () => {
    const length = messageInput.value.length;
    charCount.textContent = length;

    if (length > 400) {
        charCountContainer.classList.add('warning');
    } else {
        charCountContainer.classList.remove('warning');
    }
});

// Interactive feedback on input
nameInput.addEventListener('input', function() {
    if (this.value.trim().length > 0) {
        this.classList.remove('error');
        this.classList.add('success');
        nameError.classList.remove('show');
    }
});

emailInput.addEventListener('input', function() {
    if (this.value.length > 0) {
        const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.value);
        if (isValid) {
            this.classList.remove('error');
            this.classList.add('success');
            emailError.classList.remove('show');
        } else {
            this.classList.add('error');
            this.classList.remove('success');
        }
    }
});

messageInput.addEventListener('input', function() {
    if (this.value.trim().length >= 10 && this.value.length <= 500) {
        this.classList.remove('error');
        this.classList.add('success');
        messageError.classList.remove('show');
    }
});

// Form submission
form.addEventListener('submit', function(e) {
    e.preventDefault();

    // Validate all fields
    const isNameValid = validateField('name', nameInput.value);
    const isEmailValid = validateField('email', emailInput.value);
    const isMessageValid = validateField('message', messageInput.value);

    if (isNameValid && isEmailValid && isMessageValid) {
        // Show loading state
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;

        // Simulate API call
        setTimeout(() => {
            // Reset form
            form.reset();
            nameInput.classList.remove('success');
            emailInput.classList.remove('success');
            messageInput.classList.remove('success');
            charCount.textContent = '0';

            // Show success message
            successMessage.classList.add('show');
            submitButton.textContent = 'Send Message';
            submitButton.disabled = false;

            // Hide success message after 5 seconds
            setTimeout(() => {
                successMessage.classList.remove('show');
            }, 5000);
        }, 1500);
    }
});

// File upload handling
const fileInput = document.getElementById('fileUpload');
if (fileInput) {
    fileInput.addEventListener('change', function() {
        if (this.files.length > 0) {
            const fileName = this.files[0].name;
            const fileSize = (this.files[0].size / 1024).toFixed(2);
            console.log(`File selected: ${fileName} (${fileSize} KB)`);
        }
    });
}

// Add focus animation
[nameInput, emailInput, messageInput].forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.style.transform = 'scale(1.02)';
    });

    input.addEventListener('blur', function() {
        this.parentElement.style.transform = 'scale(1)';
    });
});
