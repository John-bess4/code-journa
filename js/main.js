
function renderEntry(entry) {
  const $listItem = document.createElement('li');
  const $image = document.createElement('img');
  const $title = document.createElement('h3');
  const $description = document.createElement('p');

  $image.setAttribute('src', entry.image);
  $title.textContent = entry.title;
  $description.textContent = entry.description;

  $listItem.appendChild($image);
  $listItem.appendChild($title);
  $listItem.appendChild($description);

  return $listItem;
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
  const navLinks = document.querySelectorAll('.navbar-row');

  views.forEach(function (view) {
    if (view.getAttribute('data-view') === viewName) {
      view.classList.add('hidden');
    } else {
      view.classList.remove('hidden');
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

  entriesList.innerHTML = '';

  viewSwap('entries');
  toggleNoEntries();

  form.reset();
}

document.addEventListener('DOMContentLoaded', function () {
  const entriesLink = document.querySelector('.navbar-row a[data-view="entries"]');
  entriesLink.addEventListener('click', function (event) {
    event.preventDefault();
    viewSwap('entries');
  });

  const newEntryLink = document.querySelector('[data-view="entries"] a[data-view="entry-form"]');
  if (newEntryLink) {
    newEntryLink.addEventListener('click', function (event) {
      event.preventDefault();
      viewSwap('entry-form');
    });
  }

  const form = document.querySelector('form');
  form.addEventListener('submit', handleSubmit);

  const entriesList = document.querySelector('[data-view="entries"] ul');

  data.entries.forEach(function (entry) {
    const entryNode = renderEntry(entry);
    entriesList.appendChild(entryNode);
  });

  viewSwap(data.view);
  toggleNoEntries();
});
