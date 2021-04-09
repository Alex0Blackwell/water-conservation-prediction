/**
 * Called when the website is navigated to.
 */
async function onStart() {
  let ui = new UserInterface('2015-01-01', '2019-01-01', 'queens');
  await ui.setGraph();
}

onStart()
