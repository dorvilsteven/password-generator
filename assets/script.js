// Assignment code here
// data constants
var LETTERS = "abcdefghijklmnopqrstuvwxyz";
var NUMBERS = "0123456789";
var SPECIALCHARACTERS = "!@#$%^&*()-+,./?<>";

// data tbt
var passwordLength;
var passwordUppercase;
var passwordLowercase;
var passwordNumbers;
var passwordSpecialCharacters;
// main pass word array
var passwordSet = [];
// function to add elements to main password array when certain requirements are chosen
function splitPush(sets) {
  var array = sets.split('');
  passwordSet.push(array);
}
// function to get each character from the passwordSet array
function getCharacters(set) {
  // set is an array of array whose lenth varies 
  // randomNum will be a number between 0 and the length of set 
  // which can be a max of 4. (0 to 3) (0 to 2) (0 to 1) or just (0)
  // after we get that number which will be randomNum, we'll use it to traverse
  // and access the different elements each of the arrays
  // lastly we will return a random element for that array
  var randomNum = Math.floor(Math.random()*(set.length));
  return (
    set[randomNum][Math.floor(Math.random()*(set[randomNum].length))]
    );
}

function setPasswordRequirements() {
  // prompts user for their password requirements
  // length is required and must be valid to continue
  // uppercase, lowercase, numbers, special characters
  passwordLength = window.prompt("How many characters?");
  // if password length is invalid value, then alert user and recursively call function
  if (passwordLength === NaN || passwordLength === null || passwordLength < 8 || passwordLength > 128) {
    alert(`passwordLength is invalid. \nYou have entered: ${passwordLength}. \nPlease enter a digit between 8 and 128.`);
    setPasswordRequirements();
  } else {
    // else prompt the user for the other requirements
    // for each requirement if true, add the corresponding characters to the passwordSet array 
    passwordUppercase = window.confirm("Would you like Uppercase Letters?");
    if (passwordUppercase) {
      var upper = LETTERS.toUpperCase().split('');
      passwordSet.push(upper);
    }
    passwordLowercase = window.confirm("Would you like Lowercase Letters?");
    if (passwordLowercase) {
      splitPush(LETTERS);
    }
    passwordNumbers = window.confirm("Would you like to include numbers");
    if (passwordNumbers) {
      splitPush(NUMBERS);
    }
    passwordSpecialCharacters = window.confirm("Would you like special Characters?");
    if (passwordSpecialCharacters) {
      splitPush(SPECIALCHARACTERS);
    }
    // if the user doesn't add any requirements, alert the user of this error and recursivel call function
    if (!passwordUppercase && !passwordLowercase && !passwordNumbers && !passwordSpecialCharacters) {
      alert(`Please select at lease one data type.`);
      setPasswordRequirements();
    }
  }
}

// Get references to the #generate element
var generateBtn = document.querySelector("#generate");

function generatePassword() {
  // set password requirements
  setPasswordRequirements();
  // create empty string
  var password = "";
  // loop until desired password length and during each loop
  // a new random character will be added to the password string
  for (var i=0;i<passwordLength;i++) {
    password += getCharacters(passwordSet);
  }
  // when the loop is finish return the password string
  return password;
}

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");
  passwordText.value = password;
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);