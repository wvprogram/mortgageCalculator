/*****
 *  object to get and hold all the number input data from the html
 *****/
let state = {
  price: getNumber(document.querySelectorAll('[name="price"]')[0].value),
  loan_years: document.querySelectorAll('[name="loan_years"]')[0].value,
  down_payment: document.querySelectorAll('[name="down_payment"]')[0].value,
  interest_rate: document.querySelectorAll('[name="interest_rate"]')[0].value,
  property_tax: document.querySelectorAll('[name="property_tax"]')[0].value,
  home_insurance: document.querySelectorAll('[name="home_insurance"]')[0].value,
  hoa: document.querySelectorAll('[name="hoa"]')[0].value,
};

/*****
 *  variables
 *****/
let totalLoan,
  totalMonths,
  monthlyInterest,
  monthlyPrincipalInterest,
  monthlyPropertyTaxes,
  monthlyHomeInsurance,
  monthlyHOA,
  monthlyTotal,
  labels = ["Principal & Interest", "Property Tax", "Home Insurance", "HOA"],
  backgroundColor = [
    "rgb(255, 99, 132, 1)",
    "rgb(54, 162, 235, 1)",
    "rgb(255, 206, 86, 1)",
    "rgb(75, 192, 192, 1)",
    "rgb(153, 102, 255, 1)",
    "rgb(255, 159, 64, 1)",
  ],
  borderColor = [
    "rgb(255, 99, 132, 1)",
    "rgb(54, 162, 235, 1)",
    "rgb(255, 206, 86, 1)",
    "rgb(75, 192, 192, 1)",
    "rgb(153, 102, 255, 1)",
    "rgb(255, 159, 64, 1)",
  ];

/*****
 *  function to turn the html number input data to actual numbers
 *****/
function getNumber(str) {
  return Number(str.replace(/[^0-9\.-]+/g, ""));
}

/*****
 *  script to create the visual myChart
 *****/
const ctx = document.getElementById("myChart");

let myChart = new Chart(ctx, {
  //  type of chart
  type: "doughnut",

  //  data to display in chart
  data: {
    //  labels created above in variable
    labels: labels,
    datasets: [
      {
        label: "# of Votes",
        //  data taken from html input fields variables
        data: [
          monthlyPrincipalInterest,
          monthlyPropertyTaxes,
          monthlyHomeInsurance,
          monthlyHOA,
        ],
        //  background color and bordercolor taken from variable colors
        backgroundColor: backgroundColor,
        borderColor: borderColor,
        borderWidth: 1,
      },
    ],
  },
});

//  turn off chart animation
myChart.options.animation = false;

/*****
 *  add event listener to html input text fields
 *****/
//  get all html form input text fields so did not use array at the end
let inputTexts = document.getElementsByClassName("form-group__textInput");

//  loop to retrieve price and loan years input fields value
for (let i = 0; i < inputTexts.length; i++) {
  //  this is NOT a click event listener but an input change event listener
  //  so changes in the input field triggers this loop to occur and
  //  triggers the updateInputsState function to capture the values put into the input text fields
  inputTexts[i].addEventListener("input", updateInputsState);
}

/*****
 *  add event listener to html input slider fields
 *****/
//  get all html form input slider fields so did not use array at the end
let inputSlides = document.getElementsByClassName("form-group__range-slide");

//  loop to retrieve slider input fields value
for (let i = 0; i < inputSlides.length; i++) {
  //  this is NOT a click event listener but an input change event listener
  //  so changes in the input field triggers this loop to occur and
  //  triggers the updateInputsState function to capture the values put into the input slider fields
  inputSlides[i].addEventListener("input", updateInputsState);
}

/*****
 *  function to target input fields and assign the name and the value typed to variables
 *****/
function updateInputsState(event) {
  let name = event.target.name;
  let value = event.target.value;

  //  change html input fields to actual numbers
  if (name == "price") {
    value = getNumber(value);
  }

  //  changes slider output numbers based on the slider
  if (event.target.type == "range") {
    let total;
    //  check for matching name input fields
    if (name == "home_insurance" || name == "hoa") {
      //  if matching names above then output value without %
      total = document.getElementsByClassName(
        `total__${name}`
      )[0].innerHTML = `${value}`;
    } else {
      //  if does NOT matching names above then output value with %
      total = document.getElementsByClassName(
        `total__${name}`
      )[0].innerHTML = `${value}%`;
    }
  }

  state = {
    //  grabs all values in the state object above and reassign it here
    ...state,
    [name]: value,
  };

  // calculation occurs when user changes input and/or slider fields
  calculateData();
}

/*****
 *  Add click event listener to display results
 *****/
document.getElementsByTagName("form")[0].addEventListener("submit", (event) => {
  //  prevent form from reloading webpage after clicking enter or the result button
  event.preventDefault();

  //  add new class to right column to show results after enter or result button is clicked
  document
    .getElementsByClassName("mg-page__right")[0]
    .classList.add("mg-page__right--animate");

  //  calculation occurs when user clicks on enter or result button
  calculateData();
});

/**
 *  function to calculate total results and display in results page
 */
function calculateData() {
  totalLoan = state.price - state.price * (state.down_payment / 100);
  totalMonths = state.loan_years * 12;
  monthlyInterest = state.interest_rate / 100 / 12;
  monthlyPrincipalInterest = (
    totalLoan *
    ((monthlyInterest * (1 + monthlyInterest) ** totalMonths) /
      ((1 + monthlyInterest) ** totalMonths - 1))
  ).toFixed(2);
  monthlyPropertyTaxes = (
    (state.price * (state.property_tax / 100)) /
    12
  ).toFixed(2);
  monthlyHomeInsurance = state.home_insurance / 12;
  monthlyHOA = state.hoa / 12;
  monthlyTotal =
    //  convert string of monthly principal interest back to number datatype
    parseFloat(monthlyPrincipalInterest) +
    parseFloat(monthlyPropertyTaxes) +
    parseFloat(monthlyHomeInsurance) +
    parseFloat(monthlyHOA);

    //  displaying the calculated values in results
    document.getElementsByClassName('info__numbers--principal')[0].innerHTML = '$' + parseFloat(monthlyPrincipalInterest).toFixed(2);
    document.getElementsByClassName('info__numbers--property_taxes')[0].innerHTML = '$' + parseFloat(monthlyPropertyTaxes).toFixed(2);
    document.getElementsByClassName('info__numbers--home_insurance')[0].innerHTML = '$' + parseFloat(monthlyHomeInsurance).toFixed(2);
    document.getElementsByClassName('info__numbers--hoa')[0].innerHTML = '$' + parseFloat(monthlyHOA).toFixed(2);
    document.getElementsByClassName('info__numbers--total')[0].innerHTML = '$' + monthlyTotal.toFixed(2);

    //  display data in chart form through updateChart function
    updateChart(myChart, labels, backgroundColor);
}


/*****
 *  function to update chart to display results
 *****/
function updateChart(chart, label, color) {
  //  remove default results
  chart.data.datasets.pop();
  
  //  add our calculated results into chart
  chart.data.datasets.push({
    label: label,
    backgroundColor: color,
    data: [
      monthlyPrincipalInterest,
      monthlyPropertyTaxes,
      monthlyHomeInsurance,
      monthlyHOA
    ]
  });

  //  remove animations
  chart.options.transitions.active.animation.duration = 0;

  //  update chart
  chart.update();
}

//  default calculation started at beginning of webpage load with default numbers
calculateData();
