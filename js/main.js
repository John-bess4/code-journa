const $urlInput = document.getElementById('url');
const $previewImage = document.querySelector('.new-entry-photo');
const $form = document.querySelector('form');
const $nameInput = document.getElementById('title');
const $notesInput = document.getElementById('notes');
const $entriesLink = document.querySelector('.navbar-row a[data-view="entries"]');
const $newEntryLink = document.querySelector('[data-view="entries"] a[data-view="entry-form"]');
const $newButton = document.getElementsByClassName('new-button')[0];
const $entryFormButton = document.querySelector('.entry-form-button');

$urlInput.addEventListener('input', function () {
  $previewImage.setAttribute('src', $urlInput.value);
});

$form.addEventListener('submit', function (event) {
  event.preventDefault();
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
  renderAllEntries();
});

function renderEntry(entry) {
  const $listItem = document.createElement('li');
  const $row = document.createElement('div');
  const $imageColumn = document.createElement('div');
  const $contentColumn = document.createElement('div');
  const $image = document.createElement('img');
  const $title = document.createElement('h3');
  const $description = document.createElement('p');

  $image.setAttribute('src', entry.photoUrl);
  $title.textContent = entry.title;
  $description.textContent = entry.notes;

  $imageColumn.classList.add('column-half');
  $contentColumn.classList.add('column-half');

  $imageColumn.appendChild($image);
  $contentColumn.appendChild($title);
  $contentColumn.appendChild($description);

  $row.classList.add('row');
  $row.appendChild($imageColumn);
  $row.appendChild($contentColumn);

  $listItem.appendChild($row);

  return $listItem;
}

function renderAllEntries() {
  const entriesList = document.querySelector('[data-view="entries"] ul');
  entriesList.textContent = '';

  data.entries.forEach(function (entry) {
    const entryNode = renderEntry(entry);
    entriesList.appendChild(entryNode);
  });

  toggleNoEntries();
}

function toggleNoEntries() {
  const noEntriesText = document.getElementById('no-entries-text');
  const entriesList = document.querySelector('[data-view="entries"] ul');

  if (entriesList.children.length === 0) {
    noEntriesText.classList.remove('hidden');
  } else {
    noEntriesText.classList.add('hidden');
  }
}

function viewSwap(viewName) {
  const views = document.querySelectorAll('[data-view]');
  const navLinks = document.querySelectorAll('.navbar-row a');

  views.forEach(function (view) {
    if (view.getAttribute('data-view') === viewName) {
      view.classList.remove('hidden');
    } else {
      view.classList.add('hidden');
    }
  });

  navLinks.forEach(function (link) {
    if (link.getAttribute('data-view') === viewName) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  data.view = viewName;
}

function handleSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const entriesList = document.querySelector('[data-view="entries"] ul');
  entriesList.textContent = '';
  viewSwap('entries');
  toggleNoEntries();
  form.reset();
}

document.addEventListener('DOMContentLoaded', function () {
  $entriesLink.addEventListener('click', function (event) {
    event.preventDefault();
    viewSwap('entries');
  });

  if ($newEntryLink) {
    $newEntryLink.addEventListener('click', function (event) {
      event.preventDefault();
      viewSwap('entry-form');
    });
  }

  $newButton.addEventListener('click', function (event) {
    event.preventDefault();
    viewSwap('entry-form');
  });

  $entryFormButton.addEventListener('click', function (event) {
    event.preventDefault();
    viewSwap('entries');
  });

  $form.addEventListener('submit', handleSubmit);

  viewSwap(data.view);
  toggleNoEntries();
});
