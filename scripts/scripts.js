function updateError(elementId, message = "") {
    const errorElement = document.getElementById(elementId);
    errorElement.textContent = message;
    errorElement.style.display = message ? 'block' : 'none';
}

// Phone Number Validation
document.getElementById('phone').addEventListener('blur', function() {
    const phoneRegex = /^\d{7}$/;
    updateError('phoneError', phoneRegex.test(this.value) ? "" : "Phone number must be exactly 7 digits.");
});

// Password Length Validation
document.getElementById('password').addEventListener('blur', function() {
    updateError('passwordError', this.value.length > 8 ? "" : "Password must be 9 characters or longer.");
});

// Postal Code Verification
document.getElementById('postal-code').addEventListener('blur', function() {
    const postalCodeRegex = /^[A-Za-z]\d[A-Za-z] \d[A-Za-z]\d$/;
    updateError('postalCodeError', postalCodeRegex.test(this.value) ? "" : "Postal code must be in the format A1A 2S3.");
});

// Date Validation
document.addEventListener("DOMContentLoaded", function() {
    const dobInput = document.getElementById('dob');
    dobInput.max = new Date(new Date().setFullYear(new Date().getFullYear() - 14)).toISOString().split("T")[0];
});

// Bank Selection Styling
document.addEventListener('DOMContentLoaded', function() {
    const bankOptions = document.querySelectorAll('.bank-option input[type="radio"]');
    bankOptions.forEach(option => option.addEventListener('change', function() {
        bankOptions.forEach(opt => opt.parentElement.style.borderColor = 'transparent');
        if (option.checked) option.parentElement.style.borderColor = '#33845B';
    }));
});

document.getElementById('additionalInfoForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission initially

    // Trigger validation events for fields
    ['dob', 'phone', 'password'].forEach(id => {
        const field = document.getElementById(id);
        if (field) field.dispatchEvent(new Event('blur'));
    });

    // Check for any errors
    const hasErrors = ['dobError', 'phoneError', 'passwordError'].some(id => {
        return document.getElementById(id)?.textContent;
    });

    // Bank selection validation
    const selectedBank = document.querySelector('.bank-option input[type="radio"]:checked');
    updateError('bankSelectionError', selectedBank ? "" : "Please select your bank.");

    // Only proceed if there are no errors and a bank is selected
    if (!hasErrors && selectedBank) {
        window.location.href = 'thank-you.html'; // Redirect to the thank-you page
    }
});
