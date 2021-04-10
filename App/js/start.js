let ui = new UserInterface('2013-01-01', '2020-01-01', 'new york');

/**
 * Called when the website is navigated to.
 */
async function onStart() {
  await ui.setGraph();
  await ui.setLocationDropdown();
}

async function regionSelected(region) {
  ui.setRegion(region.toLowerCase());
  await ui.setGraph();
}

onStart()
