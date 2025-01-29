// This file contains the JavaScript code that handles the form logic, including event listeners for the buttons, redirection based on user choices, and the functionality for the sad emoji page and refresh button.

document.addEventListener('DOMContentLoaded', function() {
    const nextButtons = document.querySelectorAll('.next-button');
    const backButtons = document.querySelectorAll('.back-button');
    const submitButton = document.getElementById('submit-button');
    const sadEmojiButton = document.getElementById('sad-emoji-button');
    const refreshButton = document.getElementById('refresh-button');
    const form = document.getElementById('valentineForm');
    const steps = form.querySelectorAll('.form-step');
    let currentStep = 0;


    nextButtons.forEach(button => {
        button.addEventListener('click', function() {
            const currentPage = this.closest('.form-page');
            const nextPage = currentPage.nextElementSibling;
            if (nextPage) {
                currentPage.style.display = 'none';
                nextPage.style.display = 'block';
            }
        });
    });

    backButtons.forEach(button => {
        button.addEventListener('click', function() {
            const currentPage = this.closest('.form-page');
            const previousPage = currentPage.previousElementSibling;
            if (previousPage) {
                currentPage.style.display = 'none';
                previousPage.style.display = 'block';
            }
        });
    });

    function showStep(step) {
        steps.forEach((stepElement, index) => {
            stepElement.style.display = index === step ? 'block' : 'none';
        });
    }

    window.nextStep = function(step) {
        if (step === 1) {
            const name = document.getElementById('name').value;
            if (name.trim() === '') {
                alert('Please enter your name.');
                return;
            }
        } else if (step === 2) {
            const response = document.getElementById('response').value;
            if (response === 'yes') {
                document.getElementById('finalMessage').innerText = 'Thank you for being my Valentine!';
            } else {
                document.getElementById('finalMessage').innerText = 'Oh no! Maybe next time.';
            }
        }
        currentStep = step;
        showStep(currentStep);
    };

    window.restartForm = function() {
        currentStep = 0;
        form.reset();
        showStep(currentStep);
    };

    submitButton.addEventListener('click', function() {
        alert('Thank you for your response! Happy Valentine\'s Day!');
        window.location.href = 'index.html';
    });

    sadEmojiButton.addEventListener('click', function() {
        alert('Sorry to hear that! Here\'s a sad emoji for you: 😢');
    });

    refreshButton.addEventListener('click', function() {
        location.reload();
    });

    showStep(currentStep);
});