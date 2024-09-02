
// Validate form fields
async function validateForm() {
    const fullName = document.getElementById('fullName').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();

    if (fullName === '' || email === '' || phone === '') {
        alert('Please fill in all the fields.');
        return false;
    }

    // Email format validation
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailPattern.test(email)) {
        alert('Please enter a valid email address.');
        return false;
    }

    // Phone number format validation (basic)
    const phonePattern = /^[0-9]{10,15}$/;
    if (!phonePattern.test(phone)) {
        alert('Please enter a valid phone number.');
        return false;
    }

    return true;
}

// Handle form submission and OTP modal
document.getElementById('getStartedButton').addEventListener('click', async function (e) {
    e.preventDefault();
    if (await validateForm()) {
        const fullName = document.getElementById('fullName').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();

        try {
            const response = await fetch('https://healthcare-backend-tdsu.onrender.com/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ fullName, email, phone }),
            });

            const data = await response.json();

            if (response.ok) {
                alert(data.message); // Show OTP sent message
                document.getElementById('otpModal').classList.remove('hidden');
            } else {
                alert(data.error); // Show error message from backend
            }
        } catch (error) {
            alert('An error occurred. Please try again.');
            console.error('Error during login:', error);
        }
    }
});

// Move to next input on typing
const pinInputs = document.querySelectorAll('.otpInput');
pinInputs.forEach((input, index) => {
    input.addEventListener('input', function () {
        if (input.value.length === 1) {
            if (index < pinInputs.length - 1) { pinInputs[index + 1].focus(); } else { input.blur(); }
        }
    });
    input.addEventListener('keydown', function (e) {
        if (e.key === 'Backspace' && input.value === '') {
            if (index > 0) {
                pinInputs[index - 1].focus();
            }
        }
    });
});

// Cancel Admin PIN modal
document.getElementById('cancelModalButton').addEventListener('click', function () {
    document.getElementById('otpModal').classList.add('hidden');
});

// Verify Admin PIN
document.getElementById('verifyPinButton').addEventListener('click', async function () {
    const pinValue = Array.from(pinInputs).map(input => input.value).join('');

    if (pinValue.length === 6 && /^[0-9]{6}$/.test(pinValue)) {
        try {
            const response = await fetch('https://healthcare-backend-tdsu.onrender.com/api/auth/verify-otp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ otp: pinValue, email: document.getElementById('email').value }),
            });

            const data = await response.json();

            if (response.ok) {
                alert('PIN verified! Proceeding...');
                window.location.href = "./src/approve.html"; // Navigate to dashboard
            } else {
                alert(data.error); // Show error message from backend
            }
        } catch (error) {
            alert('An error occurred. Please try again.');
            console.error('Error during OTP verification:', error);
        }
    } else {
        alert('Please enter a valid 6-digit PIN.');
    }
});
