document.getElementById('loanRegistrationForm').addEventListener('submit', function (event) {
    event.preventDefault();
  
    if (!validateForm()) {
      return false;
    }
  
    this.submit();
  });
  
  function validateForm() {
    // Validate NIN
    const ninField = document.getElementById('nin');
    const ninPattern = /^(CM|CF)[0-9]{8}[^0-9]+$/;
    if (!ninPattern.test(ninField.value)) {
      alert('Invalid NIN format');
      return false;
    }
  
    // Validate Date of Birth
    const dobField = document.getElementById('dob');
    const dob = new Date(dobField.value);
    const today = new Date();
    const age = today.getFullYear() - dob.getFullYear();
    if (age < 18) {
      alert('You must be at least 18 years old.');
      return false;
    }
  
    return true;
  }

  // scripts.js

// Function to validate the form and apply color-coded alerts
function validateForm() {
  var form = document.getElementById("loanRegistrationForm");
  var validationAlert = document.getElementById("validationAlert");
  var isValid = true;

  // Reset previous validation alert and field borders
  validationAlert.textContent = "";
  var formFields = form.querySelectorAll("input, select");
  for (var i = 0; i < formFields.length; i++) {
      formFields[i].style.border = "";
  }

  // Validate each form field
  var ninPattern = /^(CM|CF)[0-9]{8}[^0-9]+$/;
  formFields.forEach(function (field) {
      if (field.checkValidity() === false) {
          isValid = false;
          field.style.border = "2px solid red";
      } else {
          field.style.border = "2px solid green";
      }

      // Custom validation for NIN
      if (field.id === "nin" && !ninPattern.test(field.value)) {
          isValid = false;
          field.style.border = "2px solid red";
      }
  });

  if (!isValid) {
    validationAlert.textContent = "Invalid field(s). Please correct the errors.";
    validationAlert.style.color = "red";
    validationAlert.style.backgroundColor = ""; // Clear any previous background color
  } else {
    validationAlert.textContent = "All fields are valid!";
    validationAlert.style.color = "green";
    validationAlert.style.backgroundColor = "lightgreen"; // Set green background color
  }
  return isValid; // Allow form submission if valid
}
