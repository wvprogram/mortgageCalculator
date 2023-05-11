//  object to get all the number data from the html
let state = {
    price: getNumber(document.querySelectorAll('[name="price"]')[0].value),
    loan_years: document.querySelectorAll('[name="loan_years"]')[0].value,
    down_payment: document.querySelectorAll('[name="down_payment"]')[0].value,
    interest_rate: document.querySelectorAll('[name="interest_rate"]')[0].value,
    property_tax: document.querySelectorAll('[name="property_tax"]')[0].value,
    home_insurance: document.querySelectorAll('[name="home_insurance"]')[0].value,
    hoa: document.querySelectorAll('[name="hoa"]')[0].value,
}

//  variables
let totalLoan,
    totalMonths,
    monthlyInterest,
    monthlyPrincipalInterest,
    monthlyPropertyTaxes,
    monthlyHomeInsurance,
    monthlyHOA,
    labels = [
        'Principal & Interest',
        'Property Tax',
        'Home Insurance',
        'HOA'
    ],
    backgroundColor = [
        'rgb(255, 99, 132, 1)',
        'rgb(54, 162, 235, 1)',
        'rgb(255, 206, 86, 1)',
        'rgb(75, 192, 192, 1)',
        'rgb(153, 102, 255, 1)',
        'rgb(255, 159, 64, 1)',
    ],
    borderColor = [
        'rgb(255, 99, 132, 1)',
        'rgb(54, 162, 235, 1)',
        'rgb(255, 206, 86, 1)',
        'rgb(75, 192, 192, 1)',
        'rgb(153, 102, 255, 1)',
        'rgb(255, 159, 64, 1)',
    ]

//  function to turn the html number data to actual numbers
function getNumber(str) {
    return Number(str.replace(/[^0-9\.-]+/g, ""));
}

//  script to create the visual myChart
const ctx = document.getElementById('myChart');

new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [{
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3],
      borderWidth: 1
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});

console.log(state);