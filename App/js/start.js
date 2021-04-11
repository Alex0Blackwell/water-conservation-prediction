let ui = new UserInterface('2013-01-01', '2020-01-01', 'new york');

async function setUserInterface() {
  await ui.setGraph();
  ui.setStats();
}

/**
 * Called when the website is navigated to.
 */
function onStart() {
  ui.setLocationDropdown();
  setUserInterface();
}

function regionSelected(region) {
  ui.setRegion(region.toLowerCase());
  setUserInterface();
}

onStart()
