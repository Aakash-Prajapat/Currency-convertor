//Declaring constrtuctor
function Main(){

}

//object creation
var main = new Main();

//function to setting dropdown  
Main.prototype.setValuesOfDropdown = async function () {
  let currencies = await main.getCurrencies();
 
  let option, option1;
  
  let fromCurrencyDropdown = document.getElementById('from-currency-dropdown');

  //creating element for first dropdown
  let defaultOption = document.createElement('option');
  //setting the default text
  defaultOption.text = 'Currency';

  //adding element to dropdown
  fromCurrencyDropdown.add(defaultOption);
  //By default select index for first dropdown
  fromCurrencyDropdown.selectedIndex = 0;

  let toCurrencyDropdown = document.getElementById('to-currency-dropdown');

  //creating element for first dropdown
  let defaultOption1 = document.createElement('option');
  //setting the default text
  defaultOption1.text = 'Currency';

  toCurrencyDropdown.add(defaultOption1);
  //By default select index for first dropdown
  toCurrencyDropdown.selectedIndex = 0;

  //loop over key to find the value and put it into option
  for (let i = 0; i < currencies.length; i++) {
    //setting the data for first dropdown
    option = document.createElement('option');
    //Currency code
    option.value = currencies[i][0];
    //Name of Currency
    option.text = currencies[i][1];
    //now adding to the dropdown
    fromCurrencyDropdown.add(option);

    //setting the data for second dropdown 
    option1 = document.createElement('option');
    //Currency code
    option1.value = currencies[i][0];
    //Name of Currency
    option1.text = currencies[i][1];
    //now adding to the dropdown
    toCurrencyDropdown.add(option1);
  }
}

//function to get the all currency
Main.prototype.getCurrencies = async function () {
  Logger.info("Getting Currency");
  try{
    return new Promise((resolve, reject) => {

    //url to get the all supported currency
    const url = 'https://openexchangerates.org/api/currencies.json';
    //creating object
    const request = new XMLHttpRequest();
    //opening connection and making GET request
    request.open('GET', url, true);  
    //loading the data
    request.onload = function () {
      //if response is OK then proceed further
      if (request.status === 200) {
        //parsing the data
        const data = JSON.parse(request.responseText);
        resolve(Object.entries(data));
      }
      else {
        //Logging the exception if any
        Logger.error(request);
        alert('Error occurred!')
        resolve([]);
      }
    }

    //sending the data
    request.send();
  })
}catch (exception) {
    //Logging the exception if any
    Logger.error(exception);
    alert("Not able to process your request! Try after sometime.");
  }
}

Main.prototype.validation = function (amount, fromCurrency, toCurrency) {
  //validation to check amount 
  if (amount === '' || amount < 0) {
    Logger.log("Invalid amount value");
    alert("Invalid amount value");
    return false;
  } else if (fromCurrency == 0) { //checking if user has selected source currency or not
    Logger.log("Source Currency is not selected");
    alert("Please select a source currency");
    return false;
  } else if (toCurrency == 0) { //checking if user has selected destination currency or not
    Logger.log("destination Currency is not selected");
    alert("Please select a destination currency");
    return false;
  } else {
    return true;
  }
}

//function to convert the currency
Main.prototype.toGetCurrency = async function (amount, sourceCurrency, destinationCurrency) {
  Logger.info("Currency conversion");
  try {
  return new Promise((resolve, reject) => {
    //apikey to get the data
    const apikey = 'd3111f7a966f446996c0110ec22667cc';
    let convertedAmount = 0;
    //api end point to get the all corrency conversion rate 
    const url = 'https://openexchangerates.org/api/latest.json?app_id=' + apikey;
    //creating object
    const request = new XMLHttpRequest();
    //opening connection and making GET request
    request.open('GET', url, true);

    //loading the data
    request.onload = function () {
      //if response is OK then proceed further
      if (request.status === 200) {
        //parsing the data
        const data = JSON.parse(request.responseText);
        //formula to convert the currency 
        convertedAmount = amount * (data.rates[destinationCurrency] / data.rates[sourceCurrency]);

        //return the converted currency
        resolve(convertedAmount);
      } else {
        //Logging the exception if any
        Logger.error(request);
        alert('Not able to process your request!');
        resolve(0);
      }
    }
    //sending the data
    request.send();
  })
}catch (exception) {
    //Logging the exception if any
    Logger.error(exception);
    alert("Not able to process your request! Try after sometime.");
  }
}

//initializing the Logger
Logger.useDefaults();

//setting the dropdown value
main.setValuesOfDropdown();
//onclick change for convertor button 
window.addEventListener('load', function load(event) {
  
  document.getElementById("btn").addEventListener("click", async function () {
  //getting the amount from textbox
  let amount = document.getElementById('from-currency-value').value;
  //getting the source currency
  let fromCurrency = document.getElementById('from-currency-dropdown');
  //getting the destination currency
  let toCurrency = document.getElementById('to-currency-dropdown');

  let isValidated = main.validation(amount, fromCurrency.selectedIndex, toCurrency.selectedIndex);

  if (isValidated === true) {
    //Getting the source currency code 
    let fromCurrencyKey = fromCurrency.options[fromCurrency.selectedIndex].value;
    //Getting the destination currency code
    let toCurrencyKey = fromCurrency.options[toCurrency.selectedIndex].value;
    //calling function to get the converted currency
    const convertedAmount = await main.toGetCurrency(amount, fromCurrencyKey, toCurrencyKey);
    //setting the converted currency to textbox
    document.getElementById("to-currency-value").value = convertedAmount;
  }
});
});