let ui = new UserInterface('2013-01-01', '2020-01-01', 'new york');

async function setUserInterface() {
  await ui.setGraph();
  ui.setStats();
  ui.setStartDateDisplay(ui.startDate)
  ui.setEndDateDisplay(ui.endDate)
}

/**
 * Called when the website is navigated to.
 */
function onStart() {
  ui.setLocationDropdown();
  ui.setDoubleSlider();
  setUserInterface();
}

function regionSelected(region) {
  ui.setRegion(region.toLowerCase());
  setUserInterface();
}

function getNewDate(value) {
  const newDate = new Date('2013-01-01')
  newDate.setDate(newDate.getDate() + parseInt(value))
  return newDate
}

function startDateSelected(value) {
  const newDate = getNewDate(value)
  ui.setStartDate(newDate.toJSON().slice(0, 10))
  setUserInterface()
}

function endDateSelected(value) {
  const newDate = getNewDate(value)
  ui.setEndDate(newDate.toJSON().slice(0, 10))
  setUserInterface()
}

onStart()
