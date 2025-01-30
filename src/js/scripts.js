document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('valentineForm');
    const steps = form.querySelectorAll('.form-step');
    let currentStep = 0;
    let selectedOption = '';
    let selectedTime = '';

    function showStep(step) {
        steps.forEach((stepElement, index) => {
            stepElement.style.display = index === step ? 'block' : 'none';
        });
    }

    window.nextStep = function(step, value) {
        if (step === 1) {
            currentStep = 1;
        } else if (step === 2) {
            selectedOption = value;
            currentStep = 2;
        } else if (step === 3) {
            selectedTime = value;
            currentStep = 3;
        }
        showStep(currentStep);
    };

    window.submitForm = function() {
        const name = document.getElementById('name').value;
        const data = {
            'form-name': 'valentineForm',
            name: name,
            option: selectedOption,
            time: selectedTime
        };

        fetch('/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams(data).toString()
        })
        .then(response => {
            document.getElementById('finalMessage').innerText = 'Form submitted successfully!';
            currentStep = 4;
            showStep(currentStep);
        })
        .catch(error => {
            document.getElementById('finalMessage').innerText = 'Error submitting form.';
            currentStep = 4;
            showStep(currentStep);
        });
    };

    window.moveButton = function() {
        const noButton = document.getElementById('noButton');
        const container = noButton.parentElement;
        const containerRect = container.getBoundingClientRect();
        const buttonRect = noButton.getBoundingClientRect();

        const maxX = (containerRect.width - buttonRect.width)/2;
        const maxY = (containerRect.height - buttonRect.height)/2;

        const newX = Math.floor(Math.random() * maxX);
        const newY = Math.floor(Math.random() * maxY);

        noButton.style.position = 'absolute';
        noButton.style.left = `${newX}px`;
        noButton.style.top = `${newY}px`;
    };

    window.restartForm = function() {
        currentStep = 0;
        selectedOption = '';
        selectedTime = '';
        form.reset();
        showStep(currentStep);
    };

    showStep(currentStep);
});