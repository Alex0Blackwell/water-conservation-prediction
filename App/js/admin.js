const api = new Api('http://127.0.0.1:5000/'); 
const auth = new Authentication();

const outputDisplay = document.getElementById("output-text");

/**
 * logs out and validates login to redirect.
 */
function logout(){
  auth.logout();
  auth.validateLogin();
}

/**
 * loaded on start of the admin page.
 * We must determine if the user may access this page.
 */
function onStart(){
    auth.validateLogin();
    enableDeleteCityUndoButton()
}

/**
 * Handle running the various queries
 */
const runQuery = () => {
  const boroughComparisonParameters = getInputValues("select[name='join']");
  const updateNameParameters = getInputValues("*[name='updateName']");
  const deleteCityParameters = getInputValues("#cityToDelete");

  // Compare Two Boroughs
  if (areParametersNotBlank(boroughComparisonParameters)) {
    api.getBoroughComparison(boroughComparisonParameters[0], boroughComparisonParameters[1])
      .then(res => displayOutput(res))
      .catch(err => displayOutput("Unable to do borough comparison"));

  // Update Borough Name
  } else if (areParametersNotBlank(updateNameParameters)) {
    api.updateBoroughName(updateNameParameters[0], updateNameParameters[1])
      .then(res => displayOutput(res))
      .catch(err => displayOutput("Unable to update borough name"));

  // Delete City
  } else if (areParametersNotBlank(deleteCityParameters)) {
    api.deleteCity(deleteCityParameters[0])
      .then(res => {
        displayOutput(res)
        enableDeleteCityUndoButton(false);
      })
      .catch(err => displayOutput("Unable to delete city"));
  } else {
      displayOutput("No parameters detected.");
  }
}

/**
 * Handle query for getting the city that all boroughs are in
 */
const getCityOfAllBoroughs = () => 
  api.getCityOfAllBoroughs()
    .then(res => displayOutput(res))
    .catch(err => displayOutput("Unable to get city of all boroughs"));

/**
 * Enable/disable undo button 
 * 
 * Enabled: When Vancouver is not in the list of cities
 * Disable: When Vancouver is in the list of cities
 * 
 * @param {boolean} enable override the check in the database by passing in true or false for enable or disable
 */
async function enableDeleteCityUndoButton(enable = null) {
  const undoBtn = document.querySelector("#undo");
  if (enable === true) {
    undoBtn.setAttribute("disabled", "true");
  } else if (enable === false) {
    undoBtn.removeAttribute("disabled");
  } else {
    const cities = await api.getCities();  
    if (cities.includes("vancouver")) {
      undoBtn.setAttribute("disabled", "true");
    } else {
      undoBtn.removeAttribute("disabled");
    }
  }
}

/**
 * Update the output display
 * 
 * @param {string} result text to show in the output display
 */
const displayOutput = (result) => outputDisplay.textContent = result;

/**
 * Select all elements specified and extract their values
 * 
 * @param {string} querySelector selector string
 * @returns array of values from the specified elements
 */
const getInputValues = (querySelector) => Array.from(document.querySelectorAll(querySelector)).map(e => e.value);

/**
 * Check if all parameters for a query are blank
 * 
 * @param {array} parameters array of values extracted from a list of elements 
 * @returns true if all values are not blank
 */
const areParametersNotBlank = (parameters) => parameters.every(p => p !== "");

/**
 * Handle undo button click
 * 
 * Inserts Vancouver back into the City table after delete operation
 */
const undoDeleteOperation = () => {
  api.insertCity("Vancouver")
    .then(res => {
      displayOutput("Successfully inserted");
      enableDeleteCityUndoButton(true);
    })
    .catch(err => displayOutput("Unable to undo deletion"));
}

/**
 * Clears all fields
 */
const clearAll = () => {
  document.querySelectorAll("*[id]").forEach(e => e.value = "");
  document.querySelector("#output-text").textContent = "Result displayed here...";
} 

onStart();
