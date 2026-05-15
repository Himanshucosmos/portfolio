// ─── Theme toggle ───
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;
const savedTheme = localStorage.getItem('theme') || 'dark';
html.setAttribute('data-theme', savedTheme);

themeToggle.addEventListener('click', () => {
  const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
});

// ─── Random Avatar ───
const avatars = [
  ' -2.jpg', ' -3.jpg', ' -4.jpg', ' -5.jpg', ' .jpg',
  '#GGHimSELF #GG _^^_.jpeg', '231497.jpg', '@Theplugisshogun.jpg',
  'Canute-2.jpg', 'Canute.jpg', 'Roy Mustang #126.jpg', '𝙅𝙞𝙣.jpg'
];
const avatarImg = themeToggle.querySelector('img');
if (avatarImg) {
  const randomAvatar = avatars[Math.floor(Math.random() * avatars.length)];
  avatarImg.src = encodeURIComponent(randomAvatar);
}

// ─── Music toggle ───
const musicBtn = document.getElementById('musicToggle');
const bgMusic = document.getElementById('bgMusic');

const playlist = [
  'music1.mp3',
  'music2.mp3'
];
let currentSongIndex = 0;

function loadSong(index) {
  if (!bgMusic) return;
  bgMusic.src = playlist[index];
  bgMusic.load();
}

if (bgMusic) {
  // Set initial src so it's ready on first click
  loadSong(currentSongIndex);
  
  bgMusic.addEventListener('ended', () => {
    currentSongIndex = (currentSongIndex + 1) % playlist.length;
    loadSong(currentSongIndex);
    bgMusic.play().catch(() => {});
  });
}

if (musicBtn) {
  let musicOn = false;
  musicBtn.addEventListener('click', () => {
    musicOn = !musicOn;
    if (musicOn) {
      musicBtn.textContent = 'good taste right :)';
      if (bgMusic) {
        bgMusic.play().catch(() => {
          // Retry loading if play failed (common on mobile)
          loadSong(currentSongIndex);
          bgMusic.play().catch(() => {
            musicBtn.textContent = 'music?';
            musicOn = false;
          });
        });
      }
    } else {
      musicBtn.textContent = 'music?';
      if (bgMusic) bgMusic.pause();
    }
  });
}



// ─── PJAX Router (Continuous Music) ───

function updateMusicFooterVisibility(url) {
  const musicSection = document.querySelector('.music-section');
  if (!musicSection) return;

  let show = false;
  try {
    const parsedUrl = new URL(url);
    show = parsedUrl.pathname.endsWith('index.html') || parsedUrl.pathname === '/' || parsedUrl.pathname.endsWith('projects.html');
  } catch (e) {
    show = url.endsWith('index.html') || url.endsWith('/') || url.endsWith('projects.html');
  }

  if (show) {
    musicSection.style.opacity = '1';
    musicSection.style.pointerEvents = 'auto';
    musicSection.style.height = '';
    musicSection.style.overflow = '';
  } else {
    musicSection.style.opacity = '0';
    musicSection.style.pointerEvents = 'none';
    musicSection.style.height = '0';
    musicSection.style.overflow = 'hidden';
  }
}

async function loadPage(url) {
  try {
    const response = await fetch(url);
    const htmlText = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlText, 'text/html');

    // Swap <main> content
    const newMain = doc.querySelector('main');
    const currentMain = document.querySelector('main');
    if (newMain && currentMain) {
      currentMain.innerHTML = newMain.innerHTML;
    }

    // Swap <nav> content to update active states
    const newNav = doc.querySelector('nav');
    const currentNav = document.querySelector('nav');
    if (newNav && currentNav) {
      currentNav.innerHTML = newNav.innerHTML;
    }

    // Update Title
    document.title = doc.title;

    // Re-run data.js rendering and hover bindings
    if (window.initPageData) window.initPageData();

    // Hide or show music footer based on URL
    updateMusicFooterVisibility(url);

    window.scrollTo(0, 0);
  } catch (error) {
    console.error('PJAX Error:', error);
    window.location.href = url; // Fallback to hard load
  }
}

document.body.addEventListener('click', (e) => {
  const link = e.target.closest('a');
  if (!link) return;

  // Only intercept same-origin, non-blank links, and only if NOT on file://
  if (link.hostname === window.location.hostname && 
      !link.getAttribute('href').startsWith('#') &&
      !link.getAttribute('href').startsWith('mailto:') &&
      link.target !== '_blank' &&
      window.location.protocol !== 'file:') {
    
    e.preventDefault();
    const url = link.href;

    if (url === window.location.href) return;

    try {
      window.history.pushState({ url: url }, '', url);
    } catch(e) {
      window.location.href = url;
      return;
    }
    loadPage(url);
  }
});

window.addEventListener('popstate', (e) => {
  if (e.state && e.state.url) {
    loadPage(e.state.url);
  } else {
    loadPage(window.location.href);
  }
});

// Save initial state for back button
try {
  window.history.replaceState({ url: window.location.href }, '', window.location.href);
} catch(e) {}

// Run once on initial load
updateMusicFooterVisibility(window.location.href);

// ─── Fullscreen Toggle ───
(function() {
  const btn = document.createElement('button');
  btn.id = 'fullscreenBtn';
  btn.title = 'Toggle fullscreen';
  btn.innerHTML = `<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1 5V1H5M9 1H13V5M13 9V13H9M5 13H1V9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`;
  document.body.appendChild(btn);

  btn.addEventListener('click', () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  });

  document.addEventListener('fullscreenchange', () => {
    if (document.fullscreenElement) {
      btn.innerHTML = `<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5 1V5H1M9 5V1H13M9 13V9H13M1 9H5V13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>`;
    } else {
      btn.innerHTML = `<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1 5V1H5M9 1H13V5M13 9V13H9M5 13H1V9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>`;
    }
  });
})();
