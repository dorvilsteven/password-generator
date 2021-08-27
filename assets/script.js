// Assignment code here
var LETTERS = "abcdefghijklmnopqrstuvwxyz";
var NUMBERS = "0123456789";
var SPECIALCHARACTERS = "!@#$%^&*()-+,./?<>";

var passwordLength;
var passwordUppercase;
var passwordLowercase;
var passwordNumbers;
var passwordSpecialCharacters;
// main pass word array
var passwordSet = [];

function splitPush(sets) {
  var array = sets.split('');
  passwordSet.push(array);
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
    console.log(passwordSet);
  }
}

function getCharacters(set) {
  // set is an array of strings that is passed as a parameter 
  // randomNum will be a number between 0 and the length of set 
  // which can be a max of 4. (0 to 3) (0 to 2) (0 to 1) or just (0)
  // in order to choose randomly which string in the set array we
  // want to use, as well as to access the length of that string so 
  // we can access the individual characters.
  var randomNum = Math.floor(Math.random()*(set.length));
  return (set[randomNum].charAt(Math.floor(Math.random()*(set[randomNum].length))));
}

// random password function that takes in four boolean parameters
function randomPassword(uppercase, lowercase, numbers, specialCharacters) {
  // sets is an array of strings that will 
  // be dynamically updated
  var sets;
  // if all arguments are true  
  if (uppercase && lowercase && numbers && specialCharacters) {
    sets = [UPPERCASE, LOWERCASE, NUMBERS, SPECIALCHARACTERS];
    return getCharacters(sets);
  } 
  
  // only 2 out of the 4 arguments are true
  if (!uppercase && !lowercase && numbers && specialCharacters) {
    sets = [NUMBERS, SPECIALCHARACTERS];
    return getCharacters(sets);
  }  else if (uppercase && lowercase && !numbers && !specialCharacters) {
    sets = [UPPERCASE, LOWERCASE];
    return getCharacters(sets);
  } 
  if (!uppercase && lowercase && !numbers && specialCharacters) {
    sets = [LOWERCASE, SPECIALCHARACTERS];
    return getCharacters(sets);
  } else if (uppercase && !lowercase && numbers && !specialCharacters) {
    sets = [UPPERCASE, NUMBERS];
    return getCharacters(sets);
  }
  if (!uppercase && lowercase && numbers && !specialCharacters) {
    sets = [LOWERCASE, NUMBERS];
    return getCharacters(sets);
  } else if (uppercase && !lowercase && !numbers && specialCharacters) {
    sets = [UPPERCASE, SPECIALCHARACTERS];
    return getCharacters(sets);
  }
  // if only uppercase is false and the opposite
  if (!uppercase && lowercase && numbers && specialCharacters) {
    sets = [LOWERCASE, NUMBERS, SPECIALCHARACTERS];
    return getCharacters(sets);
  } else if (uppercase && !lowercase && !numbers && !specialCharacters) {
    sets = [UPPERCASE];
    return getCharacters(sets);
  }
  // if only lowercase is false and the opposite
  if (uppercase && !lowercase && numbers && specialCharacters) {
    sets = [UPPERCASE, NUMBERS, SPECIALCHARACTERS];
    return getCharacters(sets);
  } else if (!uppercase && lowercase && !numbers && !specialCharacters) {
    sets = [LOWERCASE];
    return getCharacters(sets);
  }
  // if only numbers is false and the opposite
  if (uppercase && lowercase && !numbers && specialCharacters) {
    sets = [UPPERCASE, LOWERCASE, SPECIALCHARACTERS];
    return getCharacters(sets);
  } else if (!uppercase && !lowercase && numbers && !specialCharacters) {
    sets = [NUMBERS];
    return getCharacters(sets);
  }
  // if only special characters is false and the opposite
  if (uppercase && lowercase && numbers && !specialCharacters) {
    sets = [UPPERCASE, LOWERCASE, NUMBERS];
    return getCharacters(sets);
  } else if (!uppercase && !lowercase && !numbers && specialCharacters) {
    sets = [SPECIALCHARACTERS];
    return getCharacters(sets);
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
  // a new character will be added to the password string
  for (var i=0;i<passwordLength;i++) {
    password += randomPassword(passwordUppercase, passwordLowercase, passwordNumbers, passwordSpecialCharacters);
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