/*****
  object to get and hold all the number input data from the html
*****/
let state = {
    price: getNumber(document.querySelectorAll('[name="price"]')[0].value),
    loan_years: document.querySelectorAll('[name="loan_years"]')[0].value,
    down_payment: document.querySelectorAll('[name="down_payment"]')[0].value,
    interest_rate: document.querySelectorAll('[name="interest_rate"]')[0].value,
    property_tax: document.querySelectorAll('[name="property_tax"]')[0].value,
    home_insurance: document.querySelectorAll('[name="home_insurance"]')[0].value,
    hoa: document.querySelectorAll('[name="hoa"]')[0].value,
}


/***** 
  variables 
*****/
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


/*****
  function to turn the html number input data to actual numbers 
*****/
function getNumber(str) {
    return Number(str.replace(/[^0-9\.-]+/g, ""));
}


/***** 
  script to create the visual myChart 
*****/
const ctx = document.getElementById('myChart');

let myChart = new Chart(ctx, {
  //  type of chart
  type: 'doughnut',

  //  data to display in chart
  data: {
    //  labels created above in variable
    labels: labels,
    datasets: [{
      label: '# of Votes',
      //  data taken from html input fields variables
      data: [
        monthlyPrincipalInterest,
        monthlyPropertyTaxes,
        monthlyHomeInsurance,
        monthlyHOA
      ],
      //  background color and bordercolor taken from variable colors
      backgroundColor: backgroundColor,
      borderColor: borderColor,
      borderWidth: 1
    }]
  }
});

//  turn off chart animation
myChart.options.animation = false;


/*****
  add event listener to html input fields
*****/
//  get all html form input fields so did not use array at the end
let inputTexts = document.getElementsByClassName('form-group__textInput');

//  loop to retrieve price and loan years input fields
for (let i = 0; i < inputTexts.length; i++) {
  //  this is NOT a click event listener but an input change event listener
  //  so changes in the input field triggers this loop to occur and
  //  triggers the updateInputsState function to capture the values put into the input fields
  inputTexts[i].addEventListener('input', updateInputsState);
}

//  function to target input fields and assign the name and the value typed to variables
function updateInputsState(event) {
  let name = event.target.name;
  let value = event.target.value;

  //  change html input fields to actual numbers
  if (name == 'price') {
    value = getNumber(value);
  }

  state = {
    //  grabs all values in the state object above and reassign it here
    ...state,
    [name]: value
  }
  console.log(state);
}
console.log(inputTexts);