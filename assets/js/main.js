// NAV SCROLL
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
  if (nav) nav.classList.toggle('scrolled', window.scrollY > 50);
});

// HAMBURGER
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
if (hamburger) {
  hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
}

// ACTIVE NAV LINK
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentPage || (currentPage === '' && href === 'index.html')) {
    link.classList.add('active');
  }
});

// REVEAL ANIMATIONS
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-up, .fade-in, .reveal').forEach(el => revealObserver.observe(el));

// ACCORDION
document.querySelectorAll('.accordion-item').forEach(item => {
  const header = item.querySelector('.accordion-header');
  if (header) {
    header.addEventListener('click', () => {
      const isOpen = item.classList.contains('active');
      document.querySelectorAll('.accordion-item').forEach(i => i.classList.remove('active'));
      if (!isOpen) item.classList.add('active');
    });
  }
});

// TABS (about page)
document.querySelectorAll('.tab-item').forEach(item => {
  item.addEventListener('click', () => {
    const target = item.dataset.tab;
    document.querySelectorAll('.tab-item').forEach(i => i.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    item.classList.add('active');
    const el = document.getElementById(target);
    if (el) el.classList.add('active');
  });
});

// CONTACT FORM
const form = document.querySelector('.contact-form');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const msg = document.querySelector('.success-msg');
    if (msg) {
      msg.style.display = 'block';
      form.reset();
      setTimeout(() => { msg.style.display = 'none'; }, 4000);
    }
  });
}

// Close mobile nav on link click
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => navLinks?.classList.remove('open'));
});
