const $urlInput = document.getElementById('url');
const $previewImage = document.querySelector('.new-entry-photo');
const $form = document.querySelector('form');
const $nameInput = document.getElementById('title');
const $notesInput = document.getElementById('notes');
const $entriesLink = document.querySelector('.entries-link');
const $entryForm = document.querySelector('.entry-form');
const $newButton = document.querySelector('.new-button');
const $submitButton = document.querySelector('.submit-button');
const $entriesList = document.querySelector('[data-view="entries"]');
const noEntriesText = document.getElementById('no-entries-text');

$urlInput.addEventListener('input', function () {
  $previewImage.setAttribute('src', $urlInput.value);
});

$newButton.addEventListener('click', function () {
  viewSwap('entry-form');
});

$submitButton.addEventListener('click', function () {
  viewSwap('entries');
});

$entriesLink.addEventListener('click', function () {
  viewSwap('entries');
});

$form.addEventListener('submit', function (event) {
  const newEntry = {
    entryId: data.nextEntryId,
    title: $nameInput.value,
    photoUrl: $urlInput.value,
    notes: $notesInput.value
  };

  data.nextEntryId++;
  data.entries.unshift(newEntry);
  $previewImage.setAttribute('src', 'images/placeholder-image-square.jpg');
  $form.reset();
  renderAllEntries();
  viewSwap('entries');
});

document.addEventListener('DOMContentLoaded', function () {
  viewSwap(data.view);
  renderAllEntries();
});

function renderEntry(entry) {
  const $journalEntry = document.getElementById('user-entries');
  const $listItem = document.createElement('li');
  const $image = document.createElement('img');
  const $title = document.createElement('h3');
  const $description = document.createElement('p');
  const $imageColumn = document.createElement('div');
  const $textColumn = document.createElement('div');

  $image.setAttribute('src', entry.photoUrl);
  $title.textContent = entry.title;
  $description.textContent = entry.notes;

  $listItem.classList.add('row');
  $imageColumn.classList.add('column-half');
  $textColumn.classList.add('column-half');

  $imageColumn.append($image);
  $textColumn.append($title);
  $textColumn.append($description);

  $journalEntry.appendChild($listItem);
  $listItem.appendChild($imageColumn);
  $listItem.appendChild($textColumn);

  return $journalEntry;
}

function renderAllEntries() {
  data.entries.forEach(function (entry) {
    const entryNode = renderEntry(entry);
    $entriesList.appendChild(entryNode);
  });

  toggleNoEntries();
}

function toggleNoEntries() {

  if ($entriesList.children.length === 0) {
    noEntriesText.classList.remove('hidden');
  } else {
    noEntriesText.classList.add('hidden');
  }
}

function viewSwap(viewName) {

  if (viewName === 'entries') {
    $entryForm.classList.add('hidden');
    $entriesList.classList.remove('hidden');
  } else if (viewName === 'entry-form') {
    $entryForm.classList.remove('hidden');
    $entriesList.classList.add('hidden');
  }
  data.view = viewName;

}

document.addEventListener('DOMContentLoaded', function () {

  viewSwap(data.view);
  toggleNoEntries();
});
