/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

window.addEventListener('beforeunload', function () {
  const jsonData = JSON.stringify(data);
  localStorage.setItem('dataModel', jsonData);
});

if (localStorage.getItem('dataModel')) {
  const storedData = JSON.parse(localStorage.getItem('dataModel'));
  data = storedData;
}
