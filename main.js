// ============================================
// INSTANT TOOLS HUB - Shared JavaScript
// This file is used by ALL pages
// ============================================

// ---- COPY TO CLIPBOARD ---- //
// Call this to copy text. Shows a toast notification.
function copyText(text, btn) {
  navigator.clipboard.writeText(text).then(() => {
    showToast('✅ Copied!');
    if (btn) {
      const orig = btn.textContent;
      btn.textContent = '✅ Copied!';
      btn.classList.add('copied');
      setTimeout(() => {
        btn.textContent = orig;
        btn.classList.remove('copied');
      }, 2000);
    }
  }).catch(() => {
    // Fallback for older browsers
    const ta = document.createElement('textarea');
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    showToast('✅ Copied!');
  });
}

// ---- TOAST NOTIFICATION ---- //
function showToast(msg) {
  let toast = document.getElementById('global-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'global-toast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => toast.classList.remove('show'), 2000);
}

// ---- MOBILE NAV TOGGLE ---- //
function initNav() {
  const btn = document.querySelector('.nav-menu-btn');
  const links = document.querySelector('.nav-links');
  if (btn && links) {
    btn.addEventListener('click', () => links.classList.toggle('open'));
    // Close nav when a link is clicked
    links.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => links.classList.remove('open'));
    });
  }
}

// ---- MARK ACTIVE NAV LINK ---- //
function markActiveNav() {
  const path = window.location.pathname;
  document.querySelectorAll('.nav-links a').forEach(a => {
    if (a.getAttribute('href') && path.includes(a.getAttribute('href').replace('../', '').replace('./', ''))) {
      a.classList.add('active');
    }
  });
}

// ---- RUN ON PAGE LOAD ---- //
document.addEventListener('DOMContentLoaded', () => {
  initNav();
  markActiveNav();
});
