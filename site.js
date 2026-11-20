const video = document.querySelector('.video-frame video');
const playButton = document.querySelector('.video-play');

if (video && playButton) {
  playButton.hidden = false;

  playButton.addEventListener('click', async () => {
    try {
      const moveFocus = document.activeElement === playButton;
      await video.play();
      if (moveFocus) video.focus({ preventScroll: true });
    } catch {
      playButton.hidden = true;
      video.focus({ preventScroll: true });
    }
  });

  video.addEventListener('play', () => {
    playButton.hidden = true;
  });
  video.addEventListener('ended', () => {
    playButton.hidden = false;
  });
  video.addEventListener('error', () => {
    playButton.hidden = true;
  });
}

const lightbox = document.querySelector('.lightbox');
const photos = [...document.querySelectorAll('.photo-link')];

if (lightbox?.showModal && photos.length) {
  const enlargedPhoto = lightbox.querySelector('.lightbox-photo');
  const caption = lightbox.querySelector('.lightbox-caption');
  let current = 0;

  function showPhoto(index) {
    current = (index + photos.length) % photos.length;
    const photo = photos[current];
    enlargedPhoto.src = photo.href;
    enlargedPhoto.alt = photo.querySelector('img').alt;
    caption.textContent = photo.closest('figure').querySelector('figcaption').textContent;
  }

  photos.forEach((photo, index) => {
    photo.addEventListener('click', (event) => {
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      showPhoto(index);
      lightbox.showModal();
    });
  });

  lightbox.querySelectorAll('[data-step]').forEach((button) => {
    button.addEventListener('click', () => showPhoto(current + Number(button.dataset.step)));
  });

  lightbox.addEventListener('keydown', (event) => {
    const step = { ArrowLeft: -1, ArrowRight: 1 }[event.key];
    if (step) {
      event.preventDefault();
      showPhoto(current + step);
    }
  });

  lightbox.addEventListener('click', (event) => {
    if (event.target === lightbox) lightbox.close();
  });
}
