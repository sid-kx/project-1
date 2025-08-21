/* Mobile menu */
const menuBtn = document.querySelector('.menu-btn');
const nav = document.querySelector('[data-nav]');
if (menuBtn && nav){
  menuBtn.addEventListener('click', () => {
    // Toggle a class on the body so CSS can position the mobile menu beneath the header
    const isOpen = document.body.classList.toggle('nav-open');
    menuBtn.setAttribute('aria-expanded', String(isOpen));
  });
}

/* Active link by pathname */
const path = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.site-nav a').forEach(a => {
  const href = a.getAttribute('href');
  if (href === path) a.classList.add('active');
});

/* Year in footer */
const y = document.getElementById('year');
if (y) y.textContent = new Date().getFullYear();

/* Contact form -> mailto draft */
const form = document.getElementById('contactForm');
if (form){
  form.addEventListener('submit', e => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());
    const to = 'hello@project1tutoring.ca'; // TODO: change to your email
    const subject = encodeURIComponent(`Tutoring inquiry — Grade ${data.grade || ''}`);
    const body = encodeURIComponent(`Name: ${data.name}
Email: ${data.email}
Grade: ${data.grade}

Message:
${data.message}`);
    window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
  });
}


/* Reveal on scroll using IntersectionObserver */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

/* Reset mobile nav style on resize so desktop layout isn't stuck hidden */
const mq = window.matchMedia('(min-width: 641px)');
const resetNav = () => { if (mq.matches) document.body.classList.remove('nav-open'); };
mq.addEventListener ? mq.addEventListener('change', resetNav) : window.addEventListener('resize', resetNav);
resetNav();
