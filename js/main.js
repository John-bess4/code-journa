const $urlInput = document.getElementById('url');
const $previewImage = document.querySelector('.new-entry-photo');
const $form = document.querySelector('form');
const $nameInput = document.getElementById('title');
const $notesInput = document.getElementById('notes');

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
});
