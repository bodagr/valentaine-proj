document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('valentineForm');
    const steps = form.querySelectorAll('.form-step');
    let currentStep = 0;

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
        } else if (step === 4) {
            selectedFood = value;
            document.getElementById('finalMessage').innerText = `Great choice! Let's do ${selectedOption} for ${selectedTime}. Food - ${selectedFood}.`;
            currentStep = 4;
        }
        showStep(currentStep);
    };

    window.restartForm = function() {
        currentStep = 0;
        form.reset();
        showStep(currentStep);
    };

    showStep(currentStep);
});