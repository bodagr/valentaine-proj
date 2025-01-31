document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('valentineForm');
    const steps = form.querySelectorAll('.form-step');
    let currentStep = 0;
    let selectedOption = '';
    let selectedTime = '';
    let selectedFood = '';

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
            document.getElementById('selectedOption').value = value;
            currentStep = 2;
        } else if (step === 3) {
            selectedTime = value;
            document.getElementById('selectedTime').value = value;
            currentStep = 3;
        } else if (step === 4) {
            selectedFood = value;
            document.getElementById('selectedFood').value = value;
            currentStep = 4;
            updateFinalMessage();
        } else if (step === 5) {
            currentStep = 5;
        } else if (step === 6) {
            currentStep = 6;
        }
        showStep(currentStep);
    };

    function updateFinalMessage() {
        const finalMessage = document.getElementById('finalMessage');
        finalMessage.innerHTML = `
            <p>Вот Ту Ду: ${selectedOption}</p>
            <p>Хав Лонг Ту Ду: ${selectedTime}</p>
            <p>Вот Ту Іт: ${selectedFood}</p>
        `;
    };

    window.selectDay = function(day) {
        if (day) {
            selectedDays = day;
            currentStep = 4;
            showStep(currentStep);
        }
    };

    window.submitForm = function() {
        const food2 = document.getElementById('selectedFood').value;
        const data = {
            food3: food2,
            'form-name': 'valentineForm',
            selectedOption: selectedOption,
            selectedTime: selectedTime,
            selectedFood: selectedFood
        };

        fetch('/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams(data).toString()
        })
        .then(response => {
            currentStep = 5;
            showStep(currentStep);
        })
        .catch(error => {
            document.getElementById('finalMessage').innerText = 'Error submitting form.';
            currentStep = 5;
            showStep(currentStep);
        });
    };

    window.moveButton = function() {
        const noButton = document.getElementById('noButton');
        const container = noButton.parentElement;
        const containerRect = container.getBoundingClientRect();
        const buttonRect = noButton.getBoundingClientRect();

        const maxX = (containerRect.width - buttonRect.width)/2.5;
        const maxY = (containerRect.height - buttonRect.height)/2.5;

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
        selectedFood = '';
        form.reset();
        showStep(currentStep);
    };

    showStep(currentStep);
});