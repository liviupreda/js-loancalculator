// Listen for submit - pressing the Calculate button
document
  .querySelector('#loan-form')
  .addEventListener('submit', calculateResults);

// Calculate results
function calculateResults(e) {
  console.log('calculating...');
  // UI Vars
  const uiLoanAmount = document.getElementById('amount');
  const uiInterest = document.getElementById('interest');
  const uiYearsToRepay = document.getElementById('years');
  const uiMonthlyPayment = document.getElementById('monthly-payment');
  const uiTotalPayment = document.getElementById('total-payment');
  const uiTotalInterest = document.getElementById('total-interest');

  // total amount, points to the input, we need the actual value (float)
  // parseFloat(string) function parses an argument and
  // returns a floating point number.
  const principal = parseFloat(uiLoanAmount.value);
  const calculatedInterest = parseFloat(uiInterest.value) / 100 / 12;
  const calculatedPayments = parseFloat(uiYearsToRepay.value) * 12;

  // Compute monthly payments
  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal * x * calculatedInterest) / (x - 1);

  // Check if monthly is a finite number
  // he isFinite function examines the number in its argument.
  // If the argument is NaN, positive infinity,
  // or negative infinity, this method returns false; otherwise, it returns true.
  if (isFinite(monthly)) {
    uiMonthlyPayment.value = monthly.toFixed(2); // toFixed(2) means 2 decimals
    uiTotalPayment.value = (monthly * calculatedPayments).toFixed(2);
    uiTotalInterest.value = (monthly * calculatedPayments - principal).toFixed(
      2
    );
  } else {
    showError('Please check the inputted numbers');
  }
  e.preventDefault();
}

// Show Error func
function showError(error) {
  // create a div showing the error
  const errorDiv = document.createElement('div');

  // We want to insert the error div into the card
  // Need to put it before the parent div
  // <div class="card card-body text-center mt-5">
  //    <h1 class="heading display-5 pb-3">Loan Calculator</h1>
  // Get Elements
  const card = document.querySelector('.card');
  const heading = document.querySelector('.heading');

  // Add class (BS4 - alert)
  errorDiv.className = 'alert alert-danger';

  // Create text node and append to div
  errorDiv.appendChild(document.createTextNode(error));

  // Insert error above heading <h1 class="heading display-5 pb-3">Loan Calculator</h1>
  // The Node.insertBefore() method inserts a node before
  // the reference node as a child of a specified parent node.
  card.insertBefore(errorDiv, heading);

  // Set timeout to clear error after 3 seconds
  setTimeout(clearError, 3000);
}

// Clear error
function clearError() {
  // remove the errorDiv, which has class .alert
  document.querySelector('.alert').remove();
}
