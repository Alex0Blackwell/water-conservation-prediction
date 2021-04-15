let ui = new UserInterface('2013-01-01', '2026-01-01', 'new york');

async function setUserInterface() {
  await ui.setGraph();
  ui.setStats();
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

function startDateSelected(value) {
  const newDate = ui.getNewDate(value)
  ui.setStartDate(newDate.toJSON().slice(0, 10))
  setUserInterface()
}

function endDateSelected(value) {
  const newDate = ui.getNewDate(value)
  ui.setEndDate(newDate.toJSON().slice(0, 10))
  setUserInterface()
}

onStart()
